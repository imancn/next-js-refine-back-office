#!/bin/bash

# Database management script for PostgreSQL

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to check if container is running
check_container() {
    if ! docker ps | grep -q "local-postgres"; then
        print_warning "PostgreSQL container is not running."
        return 1
    fi
    return 0
}

# Function to start the database
start_db() {
    print_status "Starting PostgreSQL database..."
    docker-compose up -d postgres
    
    # Wait for database to be ready
    print_status "Waiting for database to be ready..."
    sleep 10
    
    if check_container; then
        print_status "PostgreSQL is running on localhost:5432"
        print_status "Database: iman"
        print_status "Username: iman"
        print_status "Password: iman"
    else
        print_error "Failed to start PostgreSQL container"
        exit 1
    fi
}

# Function to stop the database
stop_db() {
    print_status "Stopping PostgreSQL database..."
    docker-compose stop postgres
    print_status "PostgreSQL stopped"
}

# Function to restart the database
restart_db() {
    print_status "Restarting PostgreSQL database..."
    docker-compose restart postgres
    sleep 5
    print_status "PostgreSQL restarted"
}

# Function to reset the database
reset_db() {
    print_warning "This will delete all data in the database. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_status "Stopping PostgreSQL..."
        docker-compose stop postgres
        
        print_status "Removing PostgreSQL data..."
        sudo rm -rf ./pgdata
        
        print_status "Starting PostgreSQL with fresh data..."
        start_db
        
        print_status "Database reset complete"
    else
        print_status "Database reset cancelled"
    fi
}

# Function to show database status
status_db() {
    if check_container; then
        print_status "PostgreSQL is running"
        docker ps | grep "local-postgres"
        
        # Show database connection info
        echo ""
        print_status "Connection details:"
        echo "  Host: localhost"
        echo "  Port: 5432"
        echo "  Database: iman"
        echo "  Username: iman"
        echo "  Password: iman"
    else
        print_warning "PostgreSQL is not running"
    fi
}

# Function to connect to database
connect_db() {
    if check_container; then
        print_status "Connecting to PostgreSQL database..."
        docker exec -it local-postgres psql -U iman -d iman
    else
        print_error "PostgreSQL is not running. Start it first with: $0 start"
        exit 1
    fi
}

# Function to show logs
logs_db() {
    if check_container; then
        docker-compose logs -f postgres
    else
        print_error "PostgreSQL is not running. Start it first with: $0 start"
        exit 1
    fi
}

# Function to backup database
backup_db() {
    if check_container; then
        local timestamp=$(date +%Y%m%d_%H%M%S)
        local backup_file="backup_iman_${timestamp}.sql"
        
        print_status "Creating backup: $backup_file"
        docker exec local-postgres pg_dump -U iman -d iman > "$backup_file"
        
        if [ $? -eq 0 ]; then
            print_status "Backup created successfully: $backup_file"
        else
            print_error "Backup failed"
            exit 1
        fi
    else
        print_error "PostgreSQL is not running. Start it first with: $0 start"
        exit 1
    fi
}

# Function to restore database
restore_db() {
    if [ -z "$1" ]; then
        print_error "Please specify a backup file to restore from"
        echo "Usage: $0 restore <backup_file>"
        exit 1
    fi
    
    local backup_file="$1"
    
    if [ ! -f "$backup_file" ]; then
        print_error "Backup file not found: $backup_file"
        exit 1
    fi
    
    if check_container; then
        print_warning "This will overwrite the current database. Are you sure? (y/N)"
        read -r response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            print_status "Restoring database from: $backup_file"
            docker exec -i local-postgres psql -U iman -d iman < "$backup_file"
            
            if [ $? -eq 0 ]; then
                print_status "Database restored successfully"
            else
                print_error "Database restore failed"
                exit 1
            fi
        else
            print_status "Database restore cancelled"
        fi
    else
        print_error "PostgreSQL is not running. Start it first with: $0 start"
        exit 1
    fi
}

# Function to show help
show_help() {
    echo "PostgreSQL Database Management Script"
    echo ""
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  start     Start the PostgreSQL database"
    echo "  stop      Stop the PostgreSQL database"
    echo "  restart   Restart the PostgreSQL database"
    echo "  status    Show database status"
    echo "  connect   Connect to the database (interactive)"
    echo "  logs      Show database logs"
    echo "  backup    Create a database backup"
    echo "  restore   Restore database from backup"
    echo "  reset     Reset the database (delete all data)"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start"
    echo "  $0 backup"
    echo "  $0 restore backup_iman_20231201_143022.sql"
}

# Main script logic
case "${1:-}" in
    start)
        check_docker
        start_db
        ;;
    stop)
        check_docker
        stop_db
        ;;
    restart)
        check_docker
        restart_db
        ;;
    status)
        check_docker
        status_db
        ;;
    connect)
        check_docker
        connect_db
        ;;
    logs)
        check_docker
        logs_db
        ;;
    backup)
        check_docker
        backup_db
        ;;
    restore)
        check_docker
        restore_db "$2"
        ;;
    reset)
        check_docker
        reset_db
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac