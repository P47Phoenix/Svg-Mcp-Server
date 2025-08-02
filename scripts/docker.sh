#!/bin/bash

# SVG MCP Server Docker Management Script
# Provides convenient commands for Docker operations

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
IMAGE_NAME="svg-mcp-server"
CONTAINER_NAME="svg-mcp-server"

# Help function
show_help() {
    echo -e "${BLUE}SVG MCP Server Docker Management${NC}"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build       Build production Docker image"
    echo "  build-dev   Build development Docker image"
    echo "  run         Run production container"
    echo "  run-dev     Run development container"
    echo "  test        Run tests in container"
    echo "  shell       Open shell in running container"
    echo "  logs        View container logs"
    echo "  stop        Stop running container"
    echo "  clean       Remove containers and images"
    echo "  health      Check container health"
    echo "  stats       Show container resource usage"
    echo "  help        Show this help message"
    echo ""
}

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        log_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Build production image
build_image() {
    log_info "Building production Docker image..."
    cd "$PROJECT_ROOT"
    
    docker build \
        --file docker/Dockerfile \
        --tag "${IMAGE_NAME}:latest" \
        --tag "${IMAGE_NAME}:$(date +%Y%m%d-%H%M%S)" \
        --target production \
        .
    
    log_success "Production image built successfully"
}

# Build development image
build_dev_image() {
    log_info "Building development Docker image..."
    cd "$PROJECT_ROOT"
    
    docker build \
        --file docker/Dockerfile \
        --tag "${IMAGE_NAME}:dev" \
        --target builder \
        .
    
    log_success "Development image built successfully"
}

# Run production container
run_container() {
    log_info "Starting production container..."
    
    # Stop existing container if running
    docker stop "$CONTAINER_NAME" >/dev/null 2>&1 || true
    docker rm "$CONTAINER_NAME" >/dev/null 2>&1 || true
    
    docker run \
        --name "$CONTAINER_NAME" \
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
        "${IMAGE_NAME}:latest"
    
    log_success "Production container started: $CONTAINER_NAME"
}

# Run development container
run_dev_container() {
    log_info "Starting development container..."
    cd "$PROJECT_ROOT"
    
    docker-compose \
        --file docker/docker-compose.yml \
        --profile dev \
        up --detach svg-mcp-server-dev
    
    log_success "Development container started"
}

# Run tests in container
run_tests() {
    log_info "Running tests in container..."
    cd "$PROJECT_ROOT"
    
    docker-compose \
        --file docker/docker-compose.yml \
        --profile test \
        run --rm svg-mcp-server-test
    
    log_success "Tests completed"
}

# Open shell in container
open_shell() {
    log_info "Opening shell in container..."
    
    if docker ps --format "table {{.Names}}" | grep -q "^$CONTAINER_NAME$"; then
        docker exec -it "$CONTAINER_NAME" /bin/sh
    else
        log_error "Container '$CONTAINER_NAME' is not running"
        exit 1
    fi
}

# View container logs
view_logs() {
    log_info "Viewing container logs..."
    
    if docker ps --format "table {{.Names}}" | grep -q "^$CONTAINER_NAME$"; then
        docker logs -f "$CONTAINER_NAME"
    else
        log_error "Container '$CONTAINER_NAME' is not running"
        exit 1
    fi
}

# Stop container
stop_container() {
    log_info "Stopping container..."
    
    docker stop "$CONTAINER_NAME" >/dev/null 2>&1 || true
    docker rm "$CONTAINER_NAME" >/dev/null 2>&1 || true
    
    log_success "Container stopped and removed"
}

# Clean up containers and images
clean_up() {
    log_warning "This will remove all containers and images for $IMAGE_NAME"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Cleaning up containers and images..."
        
        # Stop and remove containers
        docker stop "$CONTAINER_NAME" >/dev/null 2>&1 || true
        docker rm "$CONTAINER_NAME" >/dev/null 2>&1 || true
        
        # Remove images
        docker rmi "${IMAGE_NAME}:latest" >/dev/null 2>&1 || true
        docker rmi "${IMAGE_NAME}:dev" >/dev/null 2>&1 || true
        docker images "${IMAGE_NAME}" --format "table {{.Repository}}:{{.Tag}}" | tail -n +2 | xargs -r docker rmi >/dev/null 2>&1 || true
        
        # Clean up Docker system
        docker system prune -f >/dev/null 2>&1 || true
        
        log_success "Cleanup completed"
    else
        log_info "Cleanup cancelled"
    fi
}

# Check container health
check_health() {
    log_info "Checking container health..."
    
    if docker ps --format "table {{.Names}}" | grep -q "^$CONTAINER_NAME$"; then
        docker inspect --format='{{.State.Health.Status}}' "$CONTAINER_NAME" 2>/dev/null || log_warning "Health check not available"
        docker exec "$CONTAINER_NAME" node -e "console.log('Container is responsive')" 2>/dev/null && log_success "Container is healthy"
    else
        log_error "Container '$CONTAINER_NAME' is not running"
        exit 1
    fi
}

# Show container stats
show_stats() {
    log_info "Container resource usage:"
    
    if docker ps --format "table {{.Names}}" | grep -q "^$CONTAINER_NAME$"; then
        docker stats --no-stream "$CONTAINER_NAME"
    else
        log_error "Container '$CONTAINER_NAME' is not running"
        exit 1
    fi
}

# Main command handling
main() {
    check_docker
    
    case "${1:-help}" in
        build)
            build_image
            ;;
        build-dev)
            build_dev_image
            ;;
        run)
            run_container
            ;;
        run-dev)
            run_dev_container
            ;;
        test)
            run_tests
            ;;
        shell)
            open_shell
            ;;
        logs)
            view_logs
            ;;
        stop)
            stop_container
            ;;
        clean)
            clean_up
            ;;
        health)
            check_health
            ;;
        stats)
            show_stats
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            log_error "Unknown command: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
