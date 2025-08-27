#!/bin/bash

# Environment check script for PostgreSQL setup

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

echo "=========================================="
echo "    PostgreSQL Environment Check"
echo "=========================================="
echo ""

# Check Docker
echo "Checking Docker installation..."
if command -v docker &> /dev/null; then
    print_status "Docker is installed"
    if docker info &> /dev/null; then
        print_status "Docker daemon is running"
        DOCKER_VERSION=$(docker --version)
        print_info "Docker version: $DOCKER_VERSION"
    else
        print_error "Docker daemon is not running"
        echo ""
        print_info "To start Docker:"
        echo "  - On Linux: sudo systemctl start docker"
        echo "  - On macOS: open -a Docker"
        echo "  - On Windows: Start Docker Desktop"
    fi
else
    print_error "Docker is not installed"
    echo ""
    print_info "Install Docker:"
    echo "  - Visit: https://docs.docker.com/get-docker/"
    echo "  - Or use package manager:"
    echo "    Ubuntu/Debian: sudo apt-get install docker.io docker-compose"
    echo "    CentOS/RHEL: sudo yum install docker docker-compose"
    echo "    macOS: brew install --cask docker"
fi

echo ""

# Check Docker Compose
echo "Checking Docker Compose..."
if command -v docker-compose &> /dev/null; then
    COMPOSE_VERSION=$(docker-compose --version)
    print_status "Docker Compose is installed: $COMPOSE_VERSION"
elif docker compose version &> /dev/null; then
    COMPOSE_VERSION=$(docker compose version)
    print_status "Docker Compose (plugin) is available: $COMPOSE_VERSION"
else
    print_error "Docker Compose is not installed"
    echo ""
    print_info "Install Docker Compose:"
    echo "  - Visit: https://docs.docker.com/compose/install/"
    echo "  - Or use package manager:"
    echo "    Ubuntu/Debian: sudo apt-get install docker-compose"
    echo "    CentOS/RHEL: sudo yum install docker-compose"
fi

echo ""

# Check PostgreSQL client tools
echo "Checking PostgreSQL client tools..."
if command -v psql &> /dev/null; then
    PSQL_VERSION=$(psql --version)
    print_status "PostgreSQL client is installed: $PSQL_VERSION"
else
    print_warning "PostgreSQL client is not installed (optional)"
    echo ""
    print_info "Install PostgreSQL client:"
    echo "  Ubuntu/Debian: sudo apt-get install postgresql-client"
    echo "  CentOS/RHEL: sudo yum install postgresql"
    echo "  macOS: brew install postgresql"
fi

echo ""

# Check Node.js and npm
echo "Checking Node.js environment..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status "Node.js is installed: $NODE_VERSION"
else
    print_error "Node.js is not installed"
    echo ""
    print_info "Install Node.js:"
    echo "  - Visit: https://nodejs.org/"
    echo "  - Or use package manager:"
    echo "    Ubuntu/Debian: sudo apt-get install nodejs npm"
    echo "    CentOS/RHEL: sudo yum install nodejs npm"
    echo "    macOS: brew install node"
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_status "npm is installed: $NPM_VERSION"
else
    print_error "npm is not installed"
fi

echo ""

# Check Prisma
echo "Checking Prisma..."
if [ -f "node_modules/.bin/prisma" ]; then
    print_status "Prisma CLI is available in node_modules"
elif command -v npx &> /dev/null; then
    print_status "npx is available (can run Prisma commands)"
else
    print_warning "Prisma CLI not found"
    echo ""
    print_info "Install Prisma:"
    echo "  npm install -g prisma"
    echo "  Or use npx: npx prisma --help"
fi

echo ""

# Check port availability
echo "Checking port 5432 availability..."
if command -v netstat &> /dev/null; then
    if netstat -tuln 2>/dev/null | grep -q ":5432 "; then
        print_warning "Port 5432 is already in use"
        echo ""
        print_info "Check what's using the port:"
        echo "  sudo lsof -i :5432"
        echo "  Or change port in docker-compose.yml"
    else
        print_status "Port 5432 is available"
    fi
elif command -v ss &> /dev/null; then
    if ss -tuln 2>/dev/null | grep -q ":5432 "; then
        print_warning "Port 5432 is already in use"
    else
        print_status "Port 5432 is available"
    fi
else
    print_warning "Cannot check port availability (netstat/ss not available)"
fi

echo ""

# Check disk space
echo "Checking disk space..."
if command -v df &> /dev/null; then
    AVAILABLE_SPACE=$(df -h . | awk 'NR==2 {print $4}')
    print_info "Available disk space: $AVAILABLE_SPACE"
    
    # Check if we have at least 2GB
    AVAILABLE_KB=$(df . | awk 'NR==2 {print $4}')
    if [ "$AVAILABLE_KB" -gt 2000000 ]; then
        print_status "Sufficient disk space for PostgreSQL"
    else
        print_warning "Low disk space. PostgreSQL needs at least 2GB"
    fi
else
    print_warning "Cannot check disk space (df not available)"
fi

echo ""

# Summary and next steps
echo "=========================================="
echo "              Summary"
echo "=========================================="

if command -v docker &> /dev/null && docker info &> /dev/null; then
    if command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
        print_status "Environment is ready for PostgreSQL setup!"
        echo ""
        print_info "Next steps:"
        echo "  1. Start the database: ./scripts/db.sh start"
        echo "  2. Check status: ./scripts/db.sh status"
        echo "  3. Run Prisma migrations: npx prisma migrate dev"
        echo "  4. Start your application: npm run dev"
    else
        print_error "Docker Compose is missing"
        echo ""
        print_info "Install Docker Compose to continue"
    fi
else
    print_error "Docker is not available"
    echo ""
    print_info "Install Docker to continue with containerized PostgreSQL"
    echo ""
    print_info "Alternative: Install PostgreSQL directly on your system"
    echo "  Ubuntu/Debian: sudo apt-get install postgresql postgresql-contrib"
    echo "  CentOS/RHEL: sudo yum install postgresql postgresql-server"
    echo "  macOS: brew install postgresql"
fi

echo ""
echo "For more information, see: DATABASE_README.md"