#!/bin/bash

# Docker validation script for SVG MCP Server
# Validates Docker configuration and build process

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
TEST_CONTAINER="svg-mcp-test"

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

# Test results tracking
TESTS_PASSED=0
TESTS_FAILED=0

# Run test and track results
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    log_info "Running test: $test_name"
    
    if eval "$test_command"; then
        log_success "PASS: $test_name"
        ((TESTS_PASSED++))
        return 0
    else
        log_error "FAIL: $test_name"
        ((TESTS_FAILED++))
        return 1
    fi
}

# Check if Docker is available
check_docker_available() {
    docker --version >/dev/null 2>&1
}

# Check if Docker daemon is running
check_docker_daemon() {
    docker info >/dev/null 2>&1
}

# Validate Dockerfile syntax
validate_dockerfile() {
    docker build --file "$PROJECT_ROOT/docker/Dockerfile" --target production --dry-run . >/dev/null 2>&1
}

# Check if required files exist
check_files_exist() {
    local files=(
        "$PROJECT_ROOT/docker/Dockerfile"
        "$PROJECT_ROOT/docker/docker-compose.yml"
        "$PROJECT_ROOT/docker/.dockerignore"
        "$PROJECT_ROOT/scripts/docker.sh"
        "$PROJECT_ROOT/scripts/docker.ps1"
    )
    
    for file in "${files[@]}"; do
        if [[ ! -f "$file" ]]; then
            log_error "Required file missing: $file"
            return 1
        fi
    done
    
    return 0
}

# Validate Docker Compose configuration
validate_compose() {
    cd "$PROJECT_ROOT"
    docker-compose --file docker/docker-compose.yml config >/dev/null 2>&1
}

# Test Docker build (if Docker is available)
test_docker_build() {
    cd "$PROJECT_ROOT"
    
    # Test production build
    docker build \
        --file docker/Dockerfile \
        --tag "${IMAGE_NAME}:test" \
        --target production \
        . >/dev/null 2>&1
    
    # Test development build
    docker build \
        --file docker/Dockerfile \
        --tag "${IMAGE_NAME}:test-dev" \
        --target builder \
        . >/dev/null 2>&1
}

# Test container run (if Docker is available)
test_container_run() {
    # Clean up any existing test container
    docker stop "$TEST_CONTAINER" >/dev/null 2>&1 || true
    docker rm "$TEST_CONTAINER" >/dev/null 2>&1 || true
    
    # Start test container
    docker run \
        --name "$TEST_CONTAINER" \
        --detach \
        --env NODE_ENV=production \
        "${IMAGE_NAME}:test" >/dev/null 2>&1
    
    # Wait for container to start
    sleep 5
    
    # Check if container is running
    docker ps --filter "name=$TEST_CONTAINER" --format "{{.Names}}" | grep -q "$TEST_CONTAINER"
    local container_running=$?
    
    # Check container health
    local health_check=1
    if docker exec "$TEST_CONTAINER" node -e "console.log('Health check')" >/dev/null 2>&1; then
        health_check=0
    fi
    
    # Clean up test container
    docker stop "$TEST_CONTAINER" >/dev/null 2>&1 || true
    docker rm "$TEST_CONTAINER" >/dev/null 2>&1 || true
    
    return $((container_running + health_check))
}

# Clean up test images
cleanup_test_images() {
    docker rmi "${IMAGE_NAME}:test" >/dev/null 2>&1 || true
    docker rmi "${IMAGE_NAME}:test-dev" >/dev/null 2>&1 || true
}

# Main validation function
main() {
    log_info "Starting Docker validation for SVG MCP Server"
    echo ""
    
    # Always run basic file checks
    run_test "Required files exist" "check_files_exist"
    
    # Check if Docker is available
    if ! check_docker_available; then
        log_warning "Docker is not installed or not in PATH"
        log_info "Skipping Docker-dependent tests"
    elif ! check_docker_daemon; then
        log_warning "Docker daemon is not running"
        log_info "Skipping Docker-dependent tests"
    else
        log_info "Docker is available and running"
        
        # Run Docker-dependent tests
        run_test "Dockerfile syntax validation" "validate_dockerfile"
        run_test "Docker Compose configuration" "validate_compose"
        run_test "Production Docker build" "test_docker_build"
        run_test "Container startup and health" "test_container_run"
        
        # Clean up after tests
        cleanup_test_images
    fi
    
    # Display results
    echo ""
    log_info "Validation Results:"
    echo "  Tests passed: $TESTS_PASSED"
    echo "  Tests failed: $TESTS_FAILED"
    
    if [[ $TESTS_FAILED -eq 0 ]]; then
        log_success "All Docker validation tests passed!"
        exit 0
    else
        log_error "Some Docker validation tests failed"
        exit 1
    fi
}

# Run main function
main "$@"
