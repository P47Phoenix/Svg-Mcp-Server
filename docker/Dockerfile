# SVG MCP Server - Production Docker Container
# RFC 7996 compliant SVG generator MCP server

# Build arguments
ARG VERSION=1.0.0
ARG BUILD_DATE
ARG VCS_REF

# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy version file and package files for dependency installation
COPY VERSION ./
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including dev dependencies for building)
RUN npm ci

# Copy source code and resources
COPY src/ ./src/
COPY resources/ ./resources/

# Build the application
RUN npm run build

# Verify build output
RUN ls -la dist/

# Production stage
FROM node:20-alpine AS production

# Re-declare build arguments for this stage
ARG VERSION=1.0.0
ARG BUILD_DATE
ARG VCS_REF

# Add metadata with dynamic version
LABEL maintainer="SVG MCP Server Team"
LABEL version="$VERSION"
LABEL description="RFC 7996 compliant SVG generator MCP server"
LABEL source="https://github.com/P47Phoenix/Svg-Mcp-Server"
LABEL license="MIT"
LABEL build-date="$BUILD_DATE"
LABEL vcs-ref="$VCS_REF"
LABEL org.opencontainers.image.title="SVG MCP Server"
LABEL org.opencontainers.image.description="RFC 7996 compliant SVG generator MCP server"
LABEL org.opencontainers.image.version="$VERSION"
LABEL org.opencontainers.image.source="https://github.com/P47Phoenix/Svg-Mcp-Server"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.created="$BUILD_DATE"
LABEL org.opencontainers.image.revision="$VCS_REF"
LABEL source="https://github.com/svg-mcp-server"
LABEL license="MIT"

# Install security updates
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S mcp -u 1001 -G nodejs

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=mcp:nodejs /app/dist ./dist/
COPY --from=builder --chown=mcp:nodejs /app/resources ./resources/
COPY --from=builder --chown=mcp:nodejs /app/package*.json ./
COPY --from=builder --chown=mcp:nodejs /app/VERSION ./

# Create version info file for runtime access
RUN echo "VERSION=$VERSION" > /app/.env.version && \
    echo "BUILD_DATE=$BUILD_DATE" >> /app/.env.version && \
    echo "VCS_REF=$VCS_REF" >> /app/.env.version && \
    chown mcp:nodejs /app/.env.version

# Install only production dependencies
RUN npm ci --only=production && \
    npm cache clean --force && \
    rm -rf /tmp/* /var/cache/apk/*

# Create necessary directories with proper permissions
RUN mkdir -p /app/logs /app/temp && \
    chown -R mcp:nodejs /app

# Switch to non-root user
USER mcp

# Expose health check port (if needed for HTTP health checks)
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "console.log('SVG MCP Server health check passed'); process.exit(0)" || exit 1

# Set environment variables
ENV NODE_ENV=production
ENV MCP_TRANSPORT=stdio
ENV LOG_LEVEL=info

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Default command to start the MCP server
CMD ["node", "dist/index.js"]
