# Docker Container Documentation

## Overview

The SVG MCP Server Docker container provides a production-ready deployment option for the RFC 7996 compliant SVG generator. The container is optimized for security, performance, and minimal footprint.

## Container Features

### Security
- **Non-root user**: Runs as dedicated `mcp` user (UID 1001)
- **Read-only filesystem**: Container filesystem is read-only except for `/tmp`
- **No new privileges**: Security option prevents privilege escalation
- **Minimal attack surface**: Alpine Linux base with minimal packages

### Performance
- **Multi-stage build**: Optimized build process with separate builder stage
- **Production dependencies only**: Final image contains only runtime dependencies
- **Resource limits**: Configurable memory and CPU limits
- **Health checks**: Built-in health monitoring

### Monitoring
- **Health checks**: Automatic health status monitoring
- **Logging**: Structured logging with configurable levels
- **Metrics**: Resource usage monitoring capabilities

## Quick Start

### Build the Image

```bash
# Production build
docker build --file docker/Dockerfile --tag svg-mcp-server:latest --target production .

# Development build
docker build --file docker/Dockerfile --tag svg-mcp-server:dev --target builder .
```

### Run the Container

```bash
# Basic run
docker run --name svg-mcp-server --detach svg-mcp-server:latest

# Production run with resource limits
docker run \
  --name svg-mcp-server \
  --detach \
  --restart unless-stopped \
  --memory 512m \
  --cpus 1.0 \
  --read-only \
  --tmpfs /tmp:rw,size=100M \
  --security-opt no-new-privileges:true \
  --env NODE_ENV=production \
  --env MCP_TRANSPORT=stdio \
  --env LOG_LEVEL=info \
  svg-mcp-server:latest
```

### Using Docker Compose

```bash
# Production deployment
docker-compose up -d

# Development environment
docker-compose --profile dev up -d

# Run tests
docker-compose --profile test run --rm svg-mcp-server-test
```

## Management Scripts

### Windows (PowerShell)
```powershell
# Build and run
.\scripts\docker.ps1 build
.\scripts\docker.ps1 run

# Monitor
.\scripts\docker.ps1 health
.\scripts\docker.ps1 logs
.\scripts\docker.ps1 stats
```

### Linux/macOS (Bash)
```bash
# Build and run
./scripts/docker.sh build
./scripts/docker.sh run

# Monitor
./scripts/docker.sh health
./scripts/docker.sh logs
./scripts/docker.sh stats
```

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Runtime environment |
| `MCP_TRANSPORT` | `stdio` | MCP transport method |
| `LOG_LEVEL` | `info` | Logging level |
| `MCP_SERVER_NAME` | `svg-rfc-mcp-server` | Server name |
| `MCP_SERVER_VERSION` | `1.0.0` | Server version |

### Resource Limits

| Resource | Default | Recommended |
|----------|---------|-------------|
| Memory | 512M | 256M-1G |
| CPU | 1.0 | 0.5-2.0 |
| Disk | 100M tmp | 50M-200M |

### Health Check

The container includes a health check that:
- Runs every 30 seconds
- Has a 5-second timeout
- Allows 3 retries
- Has a 10-second start period

## Troubleshooting

### Common Issues

1. **Container fails to start**
   - Check Docker daemon is running
   - Verify image was built successfully
   - Check resource limits are appropriate

2. **Health check failures**
   - Ensure Node.js application starts correctly
   - Check logs for startup errors
   - Verify all dependencies are available

3. **Permission errors**
   - Ensure volumes have correct permissions
   - Check that non-root user has access to mounted directories

### Debugging Commands

```bash
# View container logs
docker logs svg-mcp-server

# Execute shell in container
docker exec -it svg-mcp-server /bin/sh

# Check resource usage
docker stats svg-mcp-server

# Inspect container configuration
docker inspect svg-mcp-server
```

## Security Considerations

### Container Security
- Container runs as non-root user
- Read-only filesystem prevents tampering
- No new privileges prevents escalation
- Minimal base image reduces attack surface

### Network Security
- No exposed ports by default (MCP uses stdio)
- Can be configured for network transport if needed
- Consider using container networks for isolation

### Volume Security
- Temporary files use tmpfs for security
- Persistent volumes should have restricted permissions
- Consider using secrets management for sensitive configuration

## Deployment Patterns

### Single Container
```bash
docker run --name svg-mcp-server -d svg-mcp-server:latest
```

### Container Orchestration
```yaml
# Kubernetes deployment example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: svg-mcp-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: svg-mcp-server
  template:
    metadata:
      labels:
        app: svg-mcp-server
    spec:
      containers:
      - name: svg-mcp-server
        image: svg-mcp-server:latest
        resources:
          limits:
            memory: 512Mi
            cpu: 1000m
          requests:
            memory: 256Mi
            cpu: 500m
```

### Docker Swarm
```bash
docker service create \
  --name svg-mcp-server \
  --replicas 3 \
  --limit-memory 512m \
  --limit-cpu 1 \
  svg-mcp-server:latest
```

## Monitoring and Maintenance

### Health Monitoring
- Use built-in health checks
- Monitor container logs
- Track resource usage
- Set up alerting for failures

### Updates
```bash
# Pull new image
docker pull svg-mcp-server:latest

# Rolling update
docker stop svg-mcp-server
docker rm svg-mcp-server
docker run --name svg-mcp-server -d svg-mcp-server:latest
```

### Backup
- Configuration files
- Log files (if persistent)
- Any custom templates or resources

This Docker container provides a robust, secure, and scalable deployment option for the SVG MCP Server, suitable for both development and production environments.
