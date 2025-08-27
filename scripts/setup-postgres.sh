#!/bin/bash

# PostgreSQL Setup Script
# Supports both Docker and native PostgreSQL installations

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[i]${NC} $1"
}

# Configuration
DB_NAME="iman"
DB_USER="iman"
DB_PASSWORD="iman"
DB_HOST="localhost"
DB_PORT="5432"

# Function to check if Docker is available
check_docker() {
    if command -v docker &> /dev/null && docker info &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to check if native PostgreSQL is available
check_native_postgres() {
    if command -v psql &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to setup Docker PostgreSQL
setup_docker_postgres() {
    print_status "Setting up PostgreSQL with Docker..."
    
    # Check if docker-compose is available
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not available"
        print_info "Install Docker Compose first:"
        echo "  - Visit: https://docs.docker.com/compose/install/"
        return 1
    fi
    
    # Create pgdata directory if it doesn't exist
    mkdir -p pgdata
    
    # Start PostgreSQL container
    print_info "Starting PostgreSQL container..."
    if command -v docker-compose &> /dev/null; then
        docker-compose up -d postgres
    else
        docker compose up -d postgres
    fi
    
    # Wait for database to be ready
    print_info "Waiting for database to be ready..."
    sleep 15
    
    # Check if container is running
    if docker ps | grep -q "local-postgres"; then
        print_status "PostgreSQL container is running"
        return 0
    else
        print_error "Failed to start PostgreSQL container"
        return 1
    fi
}

# Function to setup native PostgreSQL
setup_native_postgres() {
    print_status "Setting up native PostgreSQL..."
    
    # Check if PostgreSQL service is running
    if systemctl is-active --quiet postgresql 2>/dev/null; then
        print_status "PostgreSQL service is running"
    else
        print_warning "PostgreSQL service is not running"
        print_info "Start PostgreSQL service:"
        echo "  sudo systemctl start postgresql"
        echo "  sudo systemctl enable postgresql"
        return 1
    fi
    
    # Create database and user
    print_info "Creating database and user..."
    
    # Switch to postgres user to create database
    if sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1; then
        print_status "Database '$DB_NAME' already exists"
    else
        print_info "Creating database '$DB_NAME'..."
        sudo -u postgres createdb "$DB_NAME"
    fi
    
    # Create user if it doesn't exist
    if sudo -u postgres psql -c "SELECT 1 FROM pg_user WHERE usename = '$DB_USER'" | grep -q 1; then
        print_status "User '$DB_USER' already exists"
    else
        print_info "Creating user '$DB_USER'..."
        sudo -u postgres createuser --interactive --pwprompt "$DB_USER" <<< "$DB_PASSWORD\n$DB_PASSWORD\ny\ny\ny\ny"
    fi
    
    # Grant privileges
    print_info "Granting privileges..."
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON SCHEMA public TO $DB_USER;"
    
    # Update pg_hba.conf to allow local connections with password
    print_info "Updating PostgreSQL configuration..."
    sudo -u postgres psql -c "ALTER USER $DB_USER PASSWORD '$DB_PASSWORD';"
    
    print_status "Native PostgreSQL setup complete"
    return 0
}

# Function to test database connection
test_connection() {
    print_info "Testing database connection..."
    
    if check_docker; then
        # Test Docker connection
        if docker exec local-postgres psql -U "$DB_USER" -d "$DB_NAME" -c "SELECT version();" &> /dev/null; then
            print_status "Docker PostgreSQL connection successful"
            return 0
        else
            print_error "Docker PostgreSQL connection failed"
            return 1
        fi
    else
        # Test native connection
        if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT version();" &> /dev/null; then
            print_status "Native PostgreSQL connection successful"
            return 0
        else
            print_error "Native PostgreSQL connection failed"
            return 1
        fi
    fi
}

# Function to setup Prisma
setup_prisma() {
    print_info "Setting up Prisma..."
    
    # Generate Prisma client
    if npx prisma generate; then
        print_status "Prisma client generated successfully"
    else
        print_error "Failed to generate Prisma client"
        return 1
    fi
    
    # Run migrations
    if npx prisma migrate dev; then
        print_status "Database migrations completed successfully"
    else
        print_error "Database migrations failed"
        return 1
    fi
    
    # Seed database if seed script exists
    if [ -f "prisma/seed.ts" ]; then
        print_info "Seeding database..."
        if npx prisma db seed; then
            print_status "Database seeded successfully"
        else
            print_warning "Database seeding failed (this is optional)"
        fi
    fi
    
    return 0
}

# Function to show connection details
show_connection_details() {
    echo ""
    echo "=========================================="
    echo "        Connection Details"
    echo "=========================================="
    echo "Host: $DB_HOST"
    echo "Port: $DB_PORT"
    echo "Database: $DB_NAME"
    echo "Username: $DB_USER"
    echo "Password: $DB_PASSWORD"
    echo ""
    echo "Connection String:"
    echo "postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
    echo ""
    echo "Environment Variable:"
    echo "DATABASE_URL=\"postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME\""
    echo ""
}

# Function to show next steps
show_next_steps() {
    echo "=========================================="
    echo "              Next Steps"
    echo "=========================================="
    echo ""
    echo "1. Your PostgreSQL database is now running!"
    echo ""
    echo "2. To manage the database:"
    if check_docker; then
        echo "   - Start/Stop: ./scripts/db.sh start|stop"
        echo "   - Status: ./scripts/db.sh status"
        echo "   - Logs: ./scripts/db.sh logs"
    else
        echo "   - Start/Stop: sudo systemctl start|stop postgresql"
        echo "   - Status: sudo systemctl status postgresql"
        echo "   - Logs: sudo journalctl -u postgresql -f"
    fi
    echo ""
    echo "3. To work with Prisma:"
    echo "   - Generate client: npx prisma generate"
    echo "   - Run migrations: npx prisma migrate dev"
    echo "   - Open Studio: npx prisma studio"
    echo ""
    echo "4. Start your application:"
    echo "   npm run dev"
    echo ""
    echo "5. For more information, see: DATABASE_README.md"
    echo ""
}

# Main setup function
main() {
    echo "=========================================="
    echo "      PostgreSQL Setup Script"
    echo "=========================================="
    echo ""
    
    # Check environment
    if check_docker; then
        print_status "Docker is available - using containerized PostgreSQL"
        if setup_docker_postgres; then
            print_status "Docker PostgreSQL setup completed successfully"
        else
            print_error "Docker PostgreSQL setup failed"
            exit 1
        fi
    elif check_native_postgres; then
        print_status "Native PostgreSQL is available - using system PostgreSQL"
        if setup_native_postgres; then
            print_status "Native PostgreSQL setup completed successfully"
        else
            print_error "Native PostgreSQL setup failed"
            exit 1
        fi
    else
        print_error "Neither Docker nor native PostgreSQL is available"
        echo ""
        print_info "Please install one of the following:"
        echo "  - Docker: https://docs.docker.com/get-docker/"
        echo "  - PostgreSQL: Use your system's package manager"
        exit 1
    fi
    
    # Test connection
    if test_connection; then
        print_status "Database connection test passed"
    else
        print_error "Database connection test failed"
        exit 1
    fi
    
    # Setup Prisma
    if setup_prisma; then
        print_status "Prisma setup completed successfully"
    else
        print_error "Prisma setup failed"
        exit 1
    fi
    
    # Show results
    show_connection_details
    show_next_steps
    
    print_status "PostgreSQL setup completed successfully!"
}

# Check if script is run with arguments
case "${1:-}" in
    --help|-h|help)
        echo "PostgreSQL Setup Script"
        echo ""
        echo "Usage: $0 [options]"
        echo ""
        echo "Options:"
        echo "  --help, -h, help    Show this help message"
        echo ""
        echo "This script will:"
        echo "  1. Detect available PostgreSQL installation (Docker or native)"
        echo "  2. Setup the database and user"
        echo "  3. Configure Prisma"
        echo "  4. Test the connection"
        echo ""
        echo "Prerequisites:"
        echo "  - Docker (recommended) or native PostgreSQL"
        echo "  - Node.js and npm"
        echo "  - Prisma CLI (will be installed if needed)"
        ;;
    *)
        main
        ;;
esac