# Docker Installation Guide

This guide will help you install Docker and Docker Compose on your system to run the PostgreSQL database.

## Prerequisites

- Administrative access to your system
- Internet connection for downloading Docker

## Installation by Operating System

### Ubuntu/Debian

1. **Update package index:**
   ```bash
   sudo apt-get update
   ```

2. **Install required packages:**
   ```bash
   sudo apt-get install \
       apt-transport-https \
       ca-certificates \
       curl \
       gnupg \
       lsb-release
   ```

3. **Add Docker's official GPG key:**
   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

4. **Set up the stable repository:**
   ```bash
   echo \
     "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
     $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

5. **Install Docker Engine:**
   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

6. **Start and enable Docker:**
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

7. **Add your user to the docker group:**
   ```bash
   sudo usermod -aG docker $USER
   ```

8. **Log out and back in for group changes to take effect**

### CentOS/RHEL

1. **Install required packages:**
   ```bash
   sudo yum install -y yum-utils
   ```

2. **Set up the repository:**
   ```bash
   sudo yum-config-manager \
       --add-repo \
       https://download.docker.com/linux/centos/docker-ce.repo
   ```

3. **Install Docker Engine:**
   ```bash
   sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

4. **Start and enable Docker:**
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

5. **Add your user to the docker group:**
   ```bash
   sudo usermod -aG docker $USER
   ```

6. **Log out and back in for group changes to take effect**

### macOS

1. **Download Docker Desktop:**
   - Visit [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
   - Download the appropriate version for your Mac (Intel or Apple Silicon)

2. **Install Docker Desktop:**
   - Double-click the downloaded `.dmg` file
   - Drag Docker to Applications folder
   - Start Docker Desktop from Applications

3. **Docker Compose is included with Docker Desktop**

### Windows

1. **Download Docker Desktop:**
   - Visit [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
   - Download the appropriate version

2. **Install Docker Desktop:**
   - Run the installer
   - Follow the installation wizard
   - Restart your computer if prompted

3. **Docker Compose is included with Docker Desktop**

## Verify Installation

After installation, verify that Docker is working:

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker-compose --version
# or
docker compose version

# Test Docker
docker run hello-world
```

## Post-Installation Steps

1. **Start Docker service (Linux):**
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

2. **Add user to docker group (Linux):**
   ```bash
   sudo usermod -aG docker $USER
   # Log out and back in
   ```

3. **Test without sudo:**
   ```bash
   docker run hello-world
   ```

## Troubleshooting

### Permission Denied Error

If you get a permission denied error:

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and back in, or run:
newgrp docker
```

### Service Not Found

If Docker service is not found:

```bash
# Install Docker service
sudo apt-get install docker.io
# or
sudo yum install docker

# Start service
sudo systemctl start docker
sudo systemctl enable docker
```

### Port Already in Use

If port 5432 is already in use:

```bash
# Check what's using the port
sudo lsof -i :5432

# Stop conflicting service or change port in docker-compose.yml
```

## Alternative: Install via Package Manager

### Ubuntu/Debian (Simpler method)

```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

### CentOS/RHEL (Simpler method)

```bash
sudo yum install docker docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

## Next Steps

After installing Docker:

1. **Verify installation:**
   ```bash
   ./scripts/check-env.sh
   ```

2. **Setup PostgreSQL:**
   ```bash
   ./scripts/setup-postgres.sh
   ```

3. **Start development:**
   ```bash
   ./scripts/db.sh start
   npx prisma migrate dev
   npm run dev
   ```

## Resources

- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
- [Installation Troubleshooting](https://docs.docker.com/desktop/troubleshoot/overview/)