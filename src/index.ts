#!/usr/bin/env node

/**
 * SVG RFC MCP Server Entry Point
 * 
 * This is the main entry point for the SVG MCP server that provides
 * RFC 7996 compliant SVG generation capabilities through the Model Context Protocol.
 */

import { SvgMcpServer } from './server/SvgMcpServer.js';
import { logger } from './utils/logger.js';

async function main(): Promise<void> {
  try {
    logger.info('Starting SVG MCP Server...');
    
    const server = new SvgMcpServer({
      name: 'svg-rfc-mcp-server',
      version: '1.0.0',
      description: 'RFC 7996 compliant SVG generator MCP server',
    });

    // Start the server
    await server.start();
    
    logger.info('SVG MCP Server started successfully');
    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('Received SIGINT, shutting down gracefully...');
      await server.stop();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('Received SIGTERM, shutting down gracefully...');
      await server.stop();
      process.exit(0);
    });

  } catch (error) {
    logger.error('Failed to start SVG MCP Server:', error);
    process.exit(1);
  }
}

// Only run main if this file is being executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    logger.error('Unhandled error in main:', error);
    process.exit(1);
  });
}
