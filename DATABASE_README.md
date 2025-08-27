# PostgreSQL Database Setup

This document describes how to set up and manage the PostgreSQL database for the BackOffice application.

## Overview

The application uses PostgreSQL 16 as the primary database, running in a Docker container for easy development and deployment.

## Prerequisites

- Docker and Docker Compose installed
- At least 2GB of available disk space
- Port 5432 available on your system

## Quick Start

1. **Start the database:**
   ```bash
   ./scripts/db.sh start
   ```

2. **Check status:**
   ```bash
   ./scripts/db.sh status
   ```

3. **Stop the database:**
   ```bash
   ./scripts/db.sh stop
   ```

## Configuration

### Environment Variables

The database connection is configured through the `.env` file:

```env
DATABASE_URL="postgresql://iman:iman@localhost:5432/iman"
```

### Docker Compose Configuration

The `docker-compose.yml` file contains the PostgreSQL service configuration:

- **Image:** PostgreSQL 16
- **Container Name:** local-postgres
- **Port:** 5432 (host) → 5432 (container)
- **Database:** iman
- **Username:** iman
- **Password:** iman
- **Data Volume:** `./pgdata` (persistent storage)
- **Init Scripts:** `./init-scripts` (database initialization)

## Database Management

### Using the Management Script

The `scripts/db.sh` script provides easy database management:

```bash
# Start database
./scripts/db.sh start

# Stop database
./scripts/db.sh stop

# Restart database
./scripts/db.sh restart

# Check status
./scripts/db.sh status

# View logs
./scripts/db.sh logs

# Connect to database (interactive)
./scripts/db.sh connect

# Create backup
./scripts/db.sh backup

# Restore from backup
./scripts/db.sh restore backup_file.sql

# Reset database (delete all data)
./scripts/db.sh reset

# Show help
./scripts/db.sh help
```

### Manual Docker Commands

If you prefer to use Docker commands directly:

```bash
# Start the service
docker-compose up -d postgres

# Stop the service
docker-compose stop postgres

# View logs
docker-compose logs -f postgres

# Connect to database
docker exec -it local-postgres psql -U iman -d iman

# Create backup
docker exec local-postgres pg_dump -U iman -d iman > backup.sql

# Restore from backup
docker exec -i local-postgres psql -U iman -d iman < backup.sql
```

## Database Initialization

When the container starts for the first time, it automatically runs initialization scripts from the `init-scripts/` directory:

- **01-init.sql:** Enables extensions, sets timezone, creates utility functions

## Prisma Integration

The application uses Prisma as the ORM. After starting the database:

1. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

2. **Run migrations:**
   ```bash
   npx prisma migrate dev
   ```

3. **Seed the database:**
   ```bash
   npx prisma db seed
   ```

4. **Open Prisma Studio:**
   ```bash
   npx prisma studio
   ```

## Connection Details

- **Host:** localhost
- **Port:** 5432
- **Database:** iman
- **Username:** iman
- **Password:** iman
- **Connection String:** `postgresql://iman:iman@localhost:5432/iman`

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using port 5432
   sudo lsof -i :5432
   
   # Stop conflicting service or change port in docker-compose.yml
   ```

2. **Permission denied on pgdata:**
   ```bash
   # Fix permissions
   sudo chown -R 999:999 pgdata
   ```

3. **Database connection failed:**
   - Ensure Docker is running
   - Check if container is running: `docker ps`
   - Verify environment variables in `.env`
   - Check container logs: `./scripts/db.sh logs`

4. **Container won't start:**
   ```bash
   # Remove existing container and data
   docker-compose down
   sudo rm -rf pgdata
   ./scripts/db.sh start
   ```

### Health Checks

The container includes health checks to ensure the database is ready:

```bash
# Check container health
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Health}}"

# View health check logs
docker inspect local-postgres | grep -A 10 "Health"
```

## Backup and Recovery

### Creating Backups

```bash
# Create timestamped backup
./scripts/db.sh backup

# Manual backup with custom name
docker exec local-postgres pg_dump -U iman -d iman > my_backup.sql
```

### Restoring Backups

```bash
# Restore from backup
./scripts/db.sh restore backup_file.sql

# Manual restore
docker exec -i local-postgres psql -U iman -d iman < backup_file.sql
```

## Security Considerations

- **Development Only:** This setup is for development purposes
- **Production:** Use proper secrets management and network security
- **Passwords:** Change default passwords in production
- **Network:** Restrict access to database port in production

## Performance Tuning

For better performance, you can adjust PostgreSQL settings in the `init-scripts/`:

```sql
-- Example performance settings
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = 100;
```

## Monitoring

### Basic Monitoring

```bash
# Check database size
docker exec local-postgres psql -U iman -d iman -c "
SELECT pg_size_pretty(pg_database_size('iman'));
"

# Check active connections
docker exec local-postgres psql -U iman -d iman -c "
SELECT count(*) FROM pg_stat_activity WHERE state = 'active';
"
```

### Log Analysis

```bash
# View recent logs
./scripts/db.sh logs

# Search for errors
docker-compose logs postgres | grep -i error
```

## Development Workflow

1. **Start development:**
   ```bash
   ./scripts/db.sh start
   npx prisma migrate dev
   npm run dev
   ```

2. **Make schema changes:**
   ```bash
   # Edit prisma/schema.prisma
   npx prisma migrate dev --name description_of_changes
   ```

3. **Reset for testing:**
   ```bash
   ./scripts/db.sh reset
   npx prisma migrate dev
   npx prisma db seed
   ```

4. **Stop development:**
   ```bash
   ./scripts/db.sh stop
   ```

## Support

For database-related issues:

1. Check the troubleshooting section above
2. Review container logs: `./scripts/db.sh logs`
3. Verify Docker and Docker Compose versions
4. Check system resources (disk space, memory)

## References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker PostgreSQL Image](https://hub.docker.com/_/postgres)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)