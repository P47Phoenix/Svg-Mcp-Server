#!/bin/bash

# CI/CD Pipeline Validation Script
# Validates GitHub Actions workflow files and CI/CD configuration

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

# Test results tracking
TESTS_PASSED=0
TESTS_FAILED=0

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

# Check if required workflow files exist
check_workflow_files() {
    local workflows=(
        "$PROJECT_ROOT/.github/workflows/ci.yml"
        "$PROJECT_ROOT/.github/workflows/release.yml"
        "$PROJECT_ROOT/.github/workflows/dependencies.yml"
        "$PROJECT_ROOT/.github/workflows/code-quality.yml"
    )
    
    for workflow in "${workflows[@]}"; do
        if [[ ! -f "$workflow" ]]; then
            log_error "Required workflow file missing: $workflow"
            return 1
        fi
    done
    
    return 0
}

# Validate YAML syntax of workflow files
validate_yaml_syntax() {
    local workflows_dir="$PROJECT_ROOT/.github/workflows"
    
    if ! command -v yq >/dev/null 2>&1; then
        log_warning "yq not available, skipping YAML syntax validation"
        return 0
    fi
    
    for workflow in "$workflows_dir"/*.yml; do
        if [[ -f "$workflow" ]]; then
            if ! yq eval '.' "$workflow" >/dev/null 2>&1; then
                log_error "Invalid YAML syntax in $(basename "$workflow")"
                return 1
            fi
        fi
    done
    
    return 0
}

# Check if package.json has required scripts
check_npm_scripts() {
    local package_json="$PROJECT_ROOT/package.json"
    
    if [[ ! -f "$package_json" ]]; then
        log_error "package.json not found"
        return 1
    fi
    
    local required_scripts=(
        "build"
        "test"
        "test:unit"
        "test:integration"
        "test:performance"
        "test:security"
        "test:compliance"
        "test:coverage"
        "lint"
        "type-check"
    )
    
    for script in "${required_scripts[@]}"; do
        if ! jq -e ".scripts.\"$script\"" "$package_json" >/dev/null 2>&1; then
            log_error "Required npm script missing: $script"
            return 1
        fi
    done
    
    return 0
}

# Check SonarCloud configuration
check_sonarcloud_config() {
    local sonar_config="$PROJECT_ROOT/sonar-project.properties"
    
    if [[ ! -f "$sonar_config" ]]; then
        log_warning "SonarCloud configuration not found: $sonar_config"
        return 0
    fi
    
    # Check required properties
    local required_props=(
        "sonar.projectKey"
        "sonar.organization"
        "sonar.sources"
        "sonar.tests"
    )
    
    for prop in "${required_props[@]}"; do
        if ! grep -q "^$prop=" "$sonar_config"; then
            log_error "Required SonarCloud property missing: $prop"
            return 1
        fi
    done
    
    return 0
}

# Validate workflow triggers
validate_workflow_triggers() {
    local ci_workflow="$PROJECT_ROOT/.github/workflows/ci.yml"
    
    if [[ ! -f "$ci_workflow" ]]; then
        return 1
    fi
    
    # Check if CI workflow has proper triggers
    if ! grep -q "push:" "$ci_workflow"; then
        log_error "CI workflow missing push trigger"
        return 1
    fi
    
    if ! grep -q "pull_request:" "$ci_workflow"; then
        log_error "CI workflow missing pull_request trigger"
        return 1
    fi
    
    return 0
}

# Check environment configuration
check_environment_config() {
    local workflows_dir="$PROJECT_ROOT/.github/workflows"
    
    # Check if NODE_VERSION is defined in workflows
    if ! grep -q "NODE_VERSION:" "$workflows_dir"/*.yml; then
        log_warning "NODE_VERSION not defined in workflows"
    fi
    
    # Check for security considerations
    if grep -q "secrets\." "$workflows_dir"/*.yml; then
        log_info "Workflows use GitHub secrets (good practice)"
    fi
    
    return 0
}

# Check for Docker integration
check_docker_integration() {
    local ci_workflow="$PROJECT_ROOT/.github/workflows/ci.yml"
    
    if [[ ! -f "$ci_workflow" ]]; then
        return 1
    fi
    
    if grep -q "docker" "$ci_workflow"; then
        log_info "CI workflow includes Docker integration"
        return 0
    else
        log_warning "CI workflow does not include Docker integration"
        return 0
    fi
}

# Main validation function
main() {
    log_info "Starting CI/CD pipeline validation for SVG MCP Server"
    echo ""
    
    # Run validation tests
    run_test "Required workflow files exist" "check_workflow_files"
    run_test "YAML syntax validation" "validate_yaml_syntax"
    run_test "NPM scripts validation" "check_npm_scripts"
    run_test "SonarCloud configuration" "check_sonarcloud_config"
    run_test "Workflow triggers validation" "validate_workflow_triggers"
    run_test "Environment configuration" "check_environment_config"
    run_test "Docker integration check" "check_docker_integration"
    
    # Display results
    echo ""
    log_info "Validation Results:"
    echo "  Tests passed: $TESTS_PASSED"
    echo "  Tests failed: $TESTS_FAILED"
    
    if [[ $TESTS_FAILED -eq 0 ]]; then
        log_success "All CI/CD validation tests passed!"
        exit 0
    else
        log_error "Some CI/CD validation tests failed"
        exit 1
    fi
}

# Run main function
main "$@"
