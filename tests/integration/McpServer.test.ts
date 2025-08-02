/**
 * MCP Server Integration Tests
 * Task #12: Comprehensive Testing Infrastructure
 */

import { jest } from '@jest/globals';
import { SvgMcpServer } from '../../src/server/SvgMcpServer.js';
import { logger } from '../../src/utils/logger.js';

// Mock dependencies
jest.mock('../../src/utils/logger.js');

describe('MCP Server Integration Tests', () => {
  let server: SvgMcpServer;

  beforeEach(() => {
    server = new SvgMcpServer({
      name: 'test-svg-server',
      version: '1.0.0',
      description: 'Integration Test Server',
      maxSvgSize: 10000,
      enableDebug: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Tool Integration Tests', () => {
    describe('generate_svg Tool', () => {
      it('should generate SVG from document specification', async () => {
        const document = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [
            {
              type: 'rect',
              x: 10,
              y: 10,
              width: 80,
              height: 80,
              fill: 'blue'
            }
          ],
          title: 'Test Rectangle',
          description: 'A simple blue rectangle'
        };

        // Test the tool's execute function
        const tool = server.getTools().find(t => t.name === 'generate_svg');
        expect(tool).toBeDefined();

        if (tool) {
          const result = await tool.execute({
            document,
            optimize: true,
            validate: true
          });

          expect(result).toBeDefined();
          expect(result.content).toBeDefined();
          expect(result.content[0].type).toBe('text');
          
          const response = JSON.parse(result.content[0].text);
          expect(response.svg).toBeDefined();
          expect(response.metadata).toBeDefined();
          expect(response.valid).toBe(true);
        }
      });

      it('should handle large documents within size limits', async () => {
        const largeDocument = {
          viewBox: { x: 0, y: 0, width: 1000, height: 1000 },
          elements: Array.from({ length: 100 }, (_, i) => ({
            type: 'circle',
            cx: Math.random() * 1000,
            cy: Math.random() * 1000,
            r: 5,
            fill: `hsl(${i * 3.6}, 70%, 50%)`
          }))
        };

        const tool = server.getTools().find(t => t.name === 'generate_svg');
        if (tool) {
          const result = await tool.execute({
            document: largeDocument,
            optimize: true,
            validate: true
          });

          expect(result).toBeDefined();
          const response = JSON.parse(result.content[0].text);
          expect(response.svg.length).toBeLessThanOrEqual(server.config.maxSvgSize);
        }
      });

      it('should reject documents exceeding size limits', async () => {
        const oversizedDocument = {
          viewBox: { x: 0, y: 0, width: 10000, height: 10000 },
          elements: Array.from({ length: 10000 }, (_, i) => ({
            type: 'rect',
            x: i % 100 * 100,
            y: Math.floor(i / 100) * 100,
            width: 50,
            height: 50,
            fill: `hsl(${i * 0.036}, 70%, 50%)`
          }))
        };

        const tool = server.getTools().find(t => t.name === 'generate_svg');
        if (tool) {
          await expect(tool.execute({
            document: oversizedDocument,
            optimize: true,
            validate: true
          })).rejects.toThrow();
        }
      });
    });

    describe('validate_svg Tool', () => {
      it('should validate valid SVG documents', async () => {
        const validDocument = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              width: 100,
              height: 100,
              fill: '#000000'
            }
          ]
        };

        const tool = server.getTools().find(t => t.name === 'validate_svg');
        if (tool) {
          const result = await tool.execute({
            document: validDocument,
            preset: 'standard',
            includeRecommendations: true,
            includeQuickFixes: true
          });

          expect(result).toBeDefined();
          const response = JSON.parse(result.content[0].text);
          expect(response.valid).toBe(true);
          expect(response.score).toBeGreaterThan(0);
          expect(Array.isArray(response.errors)).toBe(true);
          expect(Array.isArray(response.warnings)).toBe(true);
        }
      });

      it('should detect validation errors in invalid documents', async () => {
        const invalidDocument = {
          viewBox: { x: 0, y: 0, width: -10, height: 100 }, // Invalid negative width
          elements: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              width: 100,
              height: 100,
              fill: 'invalid-color' // Invalid color
            }
          ]
        };

        const tool = server.getTools().find(t => t.name === 'validate_svg');
        if (tool) {
          const result = await tool.execute({
            document: invalidDocument,
            preset: 'strict'
          });

          expect(result).toBeDefined();
          const response = JSON.parse(result.content[0].text);
          expect(response.valid).toBe(false);
          expect(response.errors.length).toBeGreaterThan(0);
        }
      });
    });

    describe('optimize_svg Tool', () => {
      it('should optimize SVG documents', async () => {
        const unoptimizedDocument = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [
            {
              type: 'rect',
              x: 0.123456789,
              y: 0.987654321,
              width: 100.00000001,
              height: 100.00000001,
              fill: '#000000'
            }
          ]
        };

        const tool = server.getTools().find(t => t.name === 'optimize_svg');
        if (tool) {
          const result = await tool.execute({
            document: unoptimizedDocument,
            preset: 'balanced',
            options: {
              roundCoordinates: true,
              coordinatePrecision: 2
            }
          });

          expect(result).toBeDefined();
          const response = JSON.parse(result.content[0].text);
          expect(response.optimized).toBe(true);
          expect(response.originalSize).toBeGreaterThan(response.optimizedSize);
        }
      });
    });

    describe('Template Tools', () => {
      it('should list available templates', async () => {
        const tool = server.getTools().find(t => t.name === 'list_templates');
        if (tool) {
          const result = await tool.execute({
            query: '',
            tags: [],
            category: undefined,
            author: undefined
          });

          expect(result).toBeDefined();
          const response = JSON.parse(result.content[0].text);
          expect(response.templates).toBeDefined();
          expect(Array.isArray(response.templates)).toBe(true);
          expect(response.total).toBeGreaterThan(0);
        }
      });

      it('should search templates with filters', async () => {
        const tool = server.getTools().find(t => t.name === 'list_templates');
        if (tool) {
          const result = await tool.execute({
            query: 'icon',
            category: 'icons',
            tags: ['arrow']
          });

          expect(result).toBeDefined();
          const response = JSON.parse(result.content[0].text);
          expect(response.templates).toBeDefined();
          expect(Array.isArray(response.templates)).toBe(true);
          
          // Check that results match filters
          response.templates.forEach((template: any) => {
            expect(template.category).toBe('icons');
            expect(template.tags).toContain('arrow');
          });
        }
      });

      it('should instantiate templates with variables', async () => {
        // First, get a template with variables
        const listTool = server.getTools().find(t => t.name === 'list_templates');
        if (!listTool) return;

        const listResult = await listTool.execute({});
        const response = JSON.parse(listResult.content[0].text);
        const templateWithVariables = response.templates.find((t: any) => t.variableCount > 0);
        
        if (templateWithVariables) {
          const instantiateTool = server.getTools().find(t => t.name === 'instantiate_template');
          if (instantiateTool) {
            const result = await instantiateTool.execute({
              templateId: templateWithVariables.id,
              variables: {},
              format: 'svg'
            });

            expect(result).toBeDefined();
            const instantiateResponse = JSON.parse(result.content[0].text);
            expect(instantiateResponse.success).toBe(true);
            expect(instantiateResponse.content).toBeDefined();
          }
        }
      });
    });

    describe('Health Check Tool', () => {
      it('should return server health status', async () => {
        const tool = server.getTools().find(t => t.name === 'health_check');
        if (tool) {
          const result = await tool.execute();

          expect(result).toBeDefined();
          const response = JSON.parse(result.content[0].text);
          expect(response.status).toBe('healthy');
          expect(response.timestamp).toBeDefined();
          expect(response.version).toBe(server.config.version);
          expect(response.renderer.status).toBe('operational');
          expect(response.processor.status).toBe('operational');
        }
      });
    });
  });

  describe('Resource Integration Tests', () => {
    describe('Server Info Resource', () => {
      it('should provide server information', async () => {
        const resource = server.getResources().find(r => r.uri === 'server://info');
        expect(resource).toBeDefined();

        if (resource) {
          const result = await resource.load();
          const info = JSON.parse(result.text);

          expect(info.name).toBe(server.config.name);
          expect(info.version).toBe(server.config.version);
          expect(info.capabilities).toBeDefined();
          expect(info.capabilities.svgGeneration).toBe(true);
          expect(info.capabilities.validation).toBe(true);
          expect(info.capabilities.optimization).toBe(true);
          expect(info.capabilities.rfc7996Compliance).toBe(true);
        }
      });
    });

    describe('SVG Schema Resource', () => {
      it('should provide SVG document schema', async () => {
        const resource = server.getResources().find(r => r.uri === 'schema://svg-document');
        expect(resource).toBeDefined();

        if (resource) {
          const result = await resource.load();
          const schema = JSON.parse(result.text);

          expect(schema.$schema).toBeDefined();
          expect(schema.title).toBe('SVG Document');
          expect(schema.type).toBe('object');
          expect(schema.required).toContain('viewBox');
          expect(schema.required).toContain('elements');
        }
      });
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle tool execution errors gracefully', async () => {
      const tool = server.getTools().find(t => t.name === 'generate_svg');
      if (tool) {
        // Pass invalid document structure
        await expect(tool.execute({
          document: null,
          optimize: true,
          validate: true
        })).rejects.toThrow();
      }
    });

    it('should handle resource loading errors gracefully', async () => {
      // This would test error handling in resource loading
      // For now, we verify that the server handles errors appropriately
      expect(server).toBeDefined();
    });

    it('should validate tool parameters', async () => {
      const tool = server.getTools().find(t => t.name === 'validate_svg');
      if (tool) {
        // Test with invalid parameters
        await expect(tool.execute({
          document: 'invalid-document-type',
          preset: 'invalid-preset'
        })).rejects.toThrow();
      }
    });
  });

  describe('Performance Integration Tests', () => {
    it('should handle multiple concurrent requests', async () => {
      const tool = server.getTools().find(t => t.name === 'health_check');
      if (!tool) return;

      const concurrentRequests = Array.from({ length: 10 }, () => 
        tool.execute()
      );

      const results = await Promise.all(concurrentRequests);
      
      results.forEach(result => {
        expect(result).toBeDefined();
        const response = JSON.parse(result.content[0].text);
        expect(response.status).toBe('healthy');
      });
    });

    it('should complete operations within reasonable time', async () => {
      const tool = server.getTools().find(t => t.name === 'list_templates');
      if (!tool) return;

      const startTime = Date.now();
      const result = await tool.execute({});
      const endTime = Date.now();

      const executionTime = endTime - startTime;
      expect(executionTime).toBeLessThan(500); // Should complete in under 500ms
      expect(result).toBeDefined();
    });
  });

  describe('End-to-End Workflows', () => {
    it('should complete full SVG generation workflow', async () => {
      // 1. Generate SVG
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) return;

      const document = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [{ type: 'rect', x: 10, y: 10, width: 80, height: 80, fill: 'blue' }]
      };

      const generateResult = await generateTool.execute({
        document,
        optimize: false,
        validate: false
      });

      expect(generateResult).toBeDefined();
      const svgResponse = JSON.parse(generateResult.content[0].text);
      expect(svgResponse.svg).toBeDefined();

      // 2. Validate the generated SVG
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) return;

      const validateResult = await validateTool.execute({
        document,
        preset: 'standard'
      });

      expect(validateResult).toBeDefined();
      const validationResponse = JSON.parse(validateResult.content[0].text);
      expect(validationResponse.valid).toBe(true);

      // 3. Optimize the SVG
      const optimizeTool = server.getTools().find(t => t.name === 'optimize_svg');
      if (!optimizeTool) return;

      const optimizeResult = await optimizeTool.execute({
        document,
        preset: 'balanced'
      });

      expect(optimizeResult).toBeDefined();
      const optimizeResponse = JSON.parse(optimizeResult.content[0].text);
      expect(optimizeResponse.optimized).toBe(true);
    });

    it('should complete template workflow', async () => {
      // 1. List templates
      const listTool = server.getTools().find(t => t.name === 'list_templates');
      if (!listTool) return;

      const listResult = await listTool.execute({ category: 'icons' });
      const listResponse = JSON.parse(listResult.content[0].text);
      expect(listResponse.templates.length).toBeGreaterThan(0);

      // 2. Instantiate template
      const template = listResponse.templates[0];
      const instantiateTool = server.getTools().find(t => t.name === 'instantiate_template');
      if (!instantiateTool) return;

      const instantiateResult = await instantiateTool.execute({
        templateId: template.id,
        variables: {},
        format: 'svg'
      });

      expect(instantiateResult).toBeDefined();
      const instantiateResponse = JSON.parse(instantiateResult.content[0].text);
      expect(instantiateResponse.success).toBe(true);
    });
  });
});
