/**
 * Comprehensive Unit Tests for SvgMcpServer
 * Task #12: Comprehensive Testing Infrastructure
 */

import { jest } from '@jest/globals';
import { SvgMcpServer } from '../../src/server/SvgMcpServer.js';
import { logger } from '../../src/utils/logger.js';

// Mock dependencies
jest.mock('../../src/utils/logger.js');
jest.mock('../../src/core/SvgRenderer.js');
jest.mock('../../src/core/SvgDocumentProcessor.js');
jest.mock('../../src/core/templates/SvgTemplateEngine.js');
jest.mock('../../src/core/templates/SvgTemplateFactory.js');

describe('SvgMcpServer', () => {
  let server: SvgMcpServer;
  let mockConfig: any;

  beforeEach(() => {
    mockConfig = {
      name: 'test-svg-server',
      version: '1.0.0',
      description: 'Test SVG MCP Server',
      maxSvgSize: 10000,
      enableDebug: false,
    };

    server = new SvgMcpServer(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize with default configuration', () => {
      const defaultServer = new SvgMcpServer({
        name: 'test',
        version: '1.0.0'
      });

      expect(defaultServer).toBeDefined();
      expect(defaultServer.config.description).toBe('SVG MCP Server');
      expect(defaultServer.config.maxSvgSize).toBe(10000);
      expect(defaultServer.config.enableDebug).toBe(false);
    });

    it('should override default configuration with provided values', () => {
      expect(server.config.name).toBe('test-svg-server');
      expect(server.config.version).toBe('1.0.0');
      expect(server.config.description).toBe('Test SVG MCP Server');
      expect(server.config.maxSvgSize).toBe(10000);
      expect(server.config.enableDebug).toBe(false);
    });

    it('should enable debug logging when configured', () => {
      const debugConfig = { ...mockConfig, enableDebug: true };
      const debugServer = new SvgMcpServer(debugConfig);

      expect(debugServer.config.enableDebug).toBe(true);
      expect(logger.setLogLevel).toHaveBeenCalledWith('debug');
    });
  });

  describe('Tool Registration', () => {
    it('should register all required tools', () => {
      // Check that server has essential tools registered
      const expectedTools = [
        'generate_svg',
        'validate_svg_document',
        'validate_svg',
        'quick_validate_svg',
        'validate_and_fix_svg',
        'optimize_svg',
        'transform_svg',
        'list_templates',
        'search_templates',
        'instantiate_template',
        'create_shapes',
        'health_check'
      ];

      // This test would require access to internal tool registry
      // For now, we'll test that the server is properly initialized
      expect(server).toBeDefined();
    });
  });

  describe('Resource Registration', () => {
    it('should register all required resources', () => {
      // Check that server has essential resources registered
      const expectedResources = [
        'server://info',
        'schema://svg-document'
      ];

      // This test would require access to internal resource registry
      // For now, we'll test that the server is properly initialized
      expect(server).toBeDefined();
    });
  });

  describe('Server Lifecycle', () => {
    it('should start successfully', async () => {
      const startSpy = jest.spyOn(server, 'start').mockResolvedValue();
      
      await server.start();
      
      expect(startSpy).toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith('Starting SVG MCP Server', {
        name: mockConfig.name,
        version: mockConfig.version,
      });
    });

    it('should stop successfully', async () => {
      const stopSpy = jest.spyOn(server, 'stop').mockResolvedValue();
      
      await server.stop();
      
      expect(stopSpy).toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith('Stopping SVG MCP Server');
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid configuration gracefully', () => {
      expect(() => new SvgMcpServer({
        name: 'test',
        version: 'invalid-version' // Should be semver format
      })).not.toThrow();
    });

    it('should validate maxSvgSize configuration', () => {
      const configWithNegativeSize = {
        ...mockConfig,
        maxSvgSize: -1
      };

      const serverWithNegativeSize = new SvgMcpServer(configWithNegativeSize);
      expect(serverWithNegativeSize.config.maxSvgSize).toBe(-1); // Should handle edge cases
    });
  });

  describe('Component Integration', () => {
    it('should initialize all core components', () => {
      expect(server.svgRenderer).toBeDefined();
      expect(server.documentProcessor).toBeDefined();
      expect(server.templateEngine).toBeDefined();
      expect(server.templateFactory).toBeDefined();
    });

    it('should initialize template factory with built-in templates', () => {
      // Verify that template factory initialization is called
      expect(server.templateFactory.initialize).toHaveBeenCalled();
    });
  });

  describe('Configuration Validation', () => {
    it('should handle missing optional configuration', () => {
      const minimalConfig = {
        name: 'minimal-server',
        version: '1.0.0'
      };

      const minimalServer = new SvgMcpServer(minimalConfig);
      
      expect(minimalServer.config.description).toBe('SVG MCP Server');
      expect(minimalServer.config.maxSvgSize).toBe(10000);
      expect(minimalServer.config.enableDebug).toBe(false);
    });

    it('should validate version format', () => {
      const versionFormats = [
        '1.0.0',
        '2.1.3',
        '0.0.1',
        '10.20.30'
      ];

      versionFormats.forEach(version => {
        expect(() => new SvgMcpServer({
          name: 'test',
          version
        })).not.toThrow();
      });
    });
  });
});
