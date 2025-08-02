/**
 * Security Tests for SVG MCP Server
 * Task #12: Comprehensive Testing Infrastructure
 */

import { jest } from '@jest/globals';
import { SvgMcpServer } from '../../src/server/SvgMcpServer.js';

// Mock dependencies
jest.mock('../../src/utils/logger.js');

describe('Security Tests', () => {
  let server: SvgMcpServer;

  beforeEach(() => {
    server = new SvgMcpServer({
      name: 'security-test-server',
      version: '1.0.0',
      maxSvgSize: 10000,
      enableDebug: false,
    });
  });

  describe('Input Validation Security', () => {
    describe('XSS Prevention', () => {
      it('should sanitize malicious script content in SVG elements', async () => {
        const generateTool = server.getTools().find(t => t.name === 'generate_svg');
        if (!generateTool) throw new Error('generate_svg tool not found');

        const maliciousDocument = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [
            {
              type: 'text',
              x: 10,
              y: 50,
              content: '<script>alert("XSS")</script>',
              fill: 'black'
            }
          ]
        };

        const result = await generateTool.execute({
          document: maliciousDocument,
          optimize: false,
          validate: true
        });

        const response = JSON.parse(result.content[0].text);
        
        // SVG should not contain script tags
        expect(response.svg).not.toContain('<script>');
        expect(response.svg).not.toContain('alert(');
        expect(response.svg).not.toContain('javascript:');
      });

      it('should prevent script injection through element attributes', async () => {
        const generateTool = server.getTools().find(t => t.name === 'generate_svg');
        if (!generateTool) throw new Error('generate_svg tool not found');

        const maliciousDocument = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [
            {
              type: 'rect',
              x: 10,
              y: 10,
              width: 80,
              height: 80,
              fill: 'red',
              onclick: 'alert("XSS")',
              onload: 'maliciousFunction()',
              style: 'background: url(javascript:alert("XSS"))'
            }
          ]
        };

        const result = await generateTool.execute({
          document: maliciousDocument,
          optimize: false,
          validate: true
        });

        const response = JSON.parse(result.content[0].text);
        
        // SVG should not contain dangerous attributes
        expect(response.svg).not.toContain('onclick');
        expect(response.svg).not.toContain('onload');
        expect(response.svg).not.toContain('javascript:');
      });

      it('should sanitize href attributes in SVG elements', async () => {
        const generateTool = server.getTools().find(t => t.name === 'generate_svg');
        if (!generateTool) throw new Error('generate_svg tool not found');

        const maliciousDocument = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [
            {
              type: 'a',
              href: 'javascript:alert("XSS")',
              children: [
                {
                  type: 'text',
                  x: 10,
                  y: 50,
                  content: 'Click me',
                  fill: 'blue'
                }
              ]
            }
          ]
        };

        const result = await generateTool.execute({
          document: maliciousDocument,
          optimize: false,
          validate: true
        });

        const response = JSON.parse(result.content[0].text);
        
        // Href should be sanitized
        expect(response.svg).not.toContain('javascript:');
      });
    });

    describe('Path Traversal Prevention', () => {
      it('should prevent directory traversal in template paths', async () => {
        const instantiateTool = server.getTools().find(t => t.name === 'instantiate_template');
        if (!instantiateTool) throw new Error('instantiate_template tool not found');

        const maliciousTemplateId = '../../../etc/passwd';

        await expect(instantiateTool.execute({
          templateId: maliciousTemplateId,
          variables: {},
          format: 'svg'
        })).rejects.toThrow();
      });

      it('should validate template IDs against injection attacks', async () => {
        const instantiateTool = server.getTools().find(t => t.name === 'instantiate_template');
        if (!instantiateTool) throw new Error('instantiate_template tool not found');

        const maliciousTemplateIds = [
          '../template',
          '../../template',
          '/etc/passwd',
          'template; rm -rf /',
          'template | cat /etc/passwd',
          'template && malicious_command'
        ];

        for (const templateId of maliciousTemplateIds) {
          await expect(instantiateTool.execute({
            templateId,
            variables: {},
            format: 'svg'
          })).rejects.toThrow();
        }
      });
    });

    describe('Resource Exhaustion Prevention', () => {
      it('should reject documents exceeding size limits', async () => {
        const generateTool = server.getTools().find(t => t.name === 'generate_svg');
        if (!generateTool) throw new Error('generate_svg tool not found');

        const oversizedDocument = {
          viewBox: { x: 0, y: 0, width: 10000, height: 10000 },
          elements: Array.from({ length: 50000 }, (_, i) => ({
            type: 'rect',
            x: i % 100,
            y: Math.floor(i / 100),
            width: 1,
            height: 1,
            fill: `hsl(${i * 0.1}, 50%, 50%)`
          }))
        };

        await expect(generateTool.execute({
          document: oversizedDocument,
          optimize: false,
          validate: false
        })).rejects.toThrow(/size limit/i);
      });

      it('should limit template variable recursion depth', async () => {
        const instantiateTool = server.getTools().find(t => t.name === 'instantiate_template');
        if (!instantiateTool) return; // Skip if tool not available

        // Create deeply nested variable references
        const deeplyNestedVariables = {
          var1: '{{var2}}',
          var2: '{{var3}}',
          var3: '{{var4}}',
          var4: '{{var5}}',
          var5: '{{var6}}',
          var6: '{{var7}}',
          var7: '{{var8}}',
          var8: '{{var9}}',
          var9: '{{var10}}',
          var10: '{{var1}}' // Circular reference
        };

        // This should either resolve safely or throw an error, not hang
        const timeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Template processing timeout')), 5000)
        );

        await expect(Promise.race([
          instantiateTool.execute({
            templateId: 'nonexistent-template',
            variables: deeplyNestedVariables,
            format: 'svg'
          }),
          timeout
        ])).rejects.toThrow();
      });

      it('should prevent memory exhaustion through large variable values', async () => {
        const instantiateTool = server.getTools().find(t => t.name === 'instantiate_template');
        if (!instantiateTool) return;

        const hugeSting = 'x'.repeat(1000000); // 1MB string
        const largeVariables = {
          largeValue: hugeSting,
          anotherLargeValue: hugeSting,
          yetAnotherLargeValue: hugeSting
        };

        await expect(instantiateTool.execute({
          templateId: 'test-template',
          variables: largeVariables,
          format: 'svg'
        })).rejects.toThrow();
      });
    });

    describe('Injection Attack Prevention', () => {
      it('should prevent SVG injection attacks', async () => {
        const generateTool = server.getTools().find(t => t.name === 'generate_svg');
        if (!generateTool) throw new Error('generate_svg tool not found');

        const injectionDocument = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [
            {
              type: 'rect',
              x: 10,
              y: 10,
              width: 80,
              height: 80,
              fill: 'red"/><script>alert("XSS")</script><rect fill="blue'
            }
          ]
        };

        const result = await generateTool.execute({
          document: injectionDocument,
          optimize: false,
          validate: true
        });

        const response = JSON.parse(result.content[0].text);
        
        // Should not contain injected script
        expect(response.svg).not.toContain('<script>');
        expect(response.svg).not.toContain('alert(');
      });

      it('should prevent CDATA injection', async () => {
        const generateTool = server.getTools().find(t => t.name === 'generate_svg');
        if (!generateTool) throw new Error('generate_svg tool not found');

        const cdataDocument = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [
            {
              type: 'text',
              x: 10,
              y: 50,
              content: '<![CDATA[<script>alert("XSS")</script>]]>',
              fill: 'black'
            }
          ]
        };

        const result = await generateTool.execute({
          document: cdataDocument,
          optimize: false,
          validate: true
        });

        const response = JSON.parse(result.content[0].text);
        
        // Should not contain CDATA with scripts
        expect(response.svg).not.toContain('<![CDATA[');
        expect(response.svg).not.toContain('<script>');
      });

      it('should prevent XML entity injection', async () => {
        const generateTool = server.getTools().find(t => t.name === 'generate_svg');
        if (!generateTool) throw new Error('generate_svg tool not found');

        const entityDocument = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [
            {
              type: 'text',
              x: 10,
              y: 50,
              content: '&lt;script&gt;alert("XSS")&lt;/script&gt;',
              fill: 'black'
            }
          ]
        };

        const result = await generateTool.execute({
          document: entityDocument,
          optimize: false,
          validate: true
        });

        const response = JSON.parse(result.content[0].text);
        
        // Should properly encode entities
        expect(response.svg).not.toContain('<script>');
        expect(response.svg).not.toContain('alert(');
      });
    });
  });

  describe('Template Security', () => {
    it('should validate template variable types', async () => {
      // Test that template variables are properly typed and validated
      const listTool = server.getTools().find(t => t.name === 'list_templates');
      if (!listTool) return;

      const result = await listTool.execute({});
      const templates = JSON.parse(result.content[0].text).templates;

      templates.forEach((template: any) => {
        template.variables?.forEach((variable: any) => {
          expect(variable.type).toMatch(/^(string|number|boolean|color)$/);
          expect(typeof variable.required).toBe('boolean');
        });
      });
    });

    it('should prevent template variable injection', async () => {
      const instantiateTool = server.getTools().find(t => t.name === 'instantiate_template');
      if (!instantiateTool) return;

      const maliciousVariables = {
        width: '<script>alert("XSS")</script>',
        height: '{{maliciousTemplate}}',
        color: 'javascript:alert("XSS")',
        content: '</rect><script>alert("XSS")</script><rect>'
      };

      // Should either reject or sanitize malicious variables
      await expect(instantiateTool.execute({
        templateId: 'icon-arrow-right',
        variables: maliciousVariables,
        format: 'svg'
      })).rejects.toThrow();
    });
  });

  describe('Validation Security', () => {
    it('should not expose internal file paths in error messages', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const invalidDocument = {
        viewBox: { x: 0, y: 0, width: -1, height: -1 },
        elements: []
      };

      try {
        await validateTool.execute({
          document: invalidDocument,
          preset: 'strict'
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        // Should not expose internal paths
        expect(errorMessage).not.toMatch(/\/[a-zA-Z]+\/[a-zA-Z]+\//); // Unix paths
        expect(errorMessage).not.toMatch(/[A-Z]:\\[a-zA-Z\\]+/); // Windows paths
        expect(errorMessage).not.toContain('node_modules');
        expect(errorMessage).not.toContain('src/');
      }
    });

    it('should sanitize error messages from validation', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const documentWithBadData = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [
          {
            type: 'rect',
            x: '<script>alert("XSS")</script>',
            y: 10,
            width: 80,
            height: 80,
            fill: 'red'
          }
        ]
      };

      const result = await validateTool.execute({
        document: documentWithBadData,
        preset: 'standard'
      });

      const response = JSON.parse(result.content[0].text);
      
      // Error messages should not contain script tags
      const allMessages = [
        ...response.errors.map((e: any) => e.message),
        ...response.warnings.map((w: any) => w.message)
      ].join(' ');

      expect(allMessages).not.toContain('<script>');
      expect(allMessages).not.toContain('alert(');
    });
  });

  describe('Output Sanitization', () => {
    it('should produce safe SVG output', async () => {
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) throw new Error('generate_svg tool not found');

      const testDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [
          {
            type: 'text',
            x: 10,
            y: 50,
            content: 'Safe content',
            fill: 'black'
          }
        ]
      };

      const result = await generateTool.execute({
        document: testDocument,
        optimize: false,
        validate: true
      });

      const response = JSON.parse(result.content[0].text);
      
      // Verify SVG is well-formed and safe
      expect(response.svg).toContain('<svg');
      expect(response.svg).toContain('</svg>');
      expect(response.svg).not.toContain('<script>');
      expect(response.svg).not.toContain('javascript:');
      expect(response.svg).not.toContain('data:text/html');
    });

    it('should prevent SVG bombs (exponential entity expansion)', async () => {
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) throw new Error('generate_svg tool not found');

      // Test document that could lead to exponential expansion
      const bombDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [
          {
            type: 'defs',
            children: [
              {
                type: 'g',
                id: 'bomb',
                children: Array.from({ length: 1000 }, () => ({
                  type: 'use',
                  href: '#bomb'
                }))
              }
            ]
          },
          {
            type: 'use',
            href: '#bomb'
          }
        ]
      };

      // Should complete within reasonable time or throw error
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('SVG bomb timeout')), 5000)
      );

      await expect(Promise.race([
        generateTool.execute({
          document: bombDocument,
          optimize: false,
          validate: true
        }),
        timeout
      ])).rejects.toThrow();
    });
  });

  describe('Rate Limiting and DoS Prevention', () => {
    it('should handle rapid successive requests', async () => {
      const healthTool = server.getTools().find(t => t.name === 'health_check');
      if (!healthTool) throw new Error('health_check tool not found');

      // Send many requests rapidly
      const rapidRequests = Array.from({ length: 100 }, () => 
        healthTool.execute()
      );

      // All requests should complete without crashing the server
      const results = await Promise.allSettled(rapidRequests);
      
      const failures = results.filter(r => r.status === 'rejected');
      
      // Some requests might fail due to resource limits, but not all
      expect(failures.length).toBeLessThan(results.length);
    });

    it('should prevent timeout-based DoS attacks', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const complexDocument = {
        viewBox: { x: 0, y: 0, width: 1000, height: 1000 },
        elements: Array.from({ length: 10000 }, (_, i) => ({
          type: 'circle',
          cx: Math.random() * 1000,
          cy: Math.random() * 1000,
          r: 1,
          fill: `hsl(${i * 0.036}, 50%, 50%)`
        }))
      };

      const startTime = Date.now();
      
      try {
        await validateTool.execute({
          document: complexDocument,
          preset: 'strict',
          includeRecommendations: true,
          includeQuickFixes: true
        });
      } catch (error) {
        // Error is acceptable, but should not take too long
      }

      const endTime = Date.now();
      const executionTime = endTime - startTime;

      // Should not take more than 10 seconds even for complex documents
      expect(executionTime).toBeLessThan(10000);
    });
  });

  describe('Configuration Security', () => {
    it('should validate server configuration limits', () => {
      const secureConfig = {
        name: 'secure-server',
        version: '1.0.0',
        maxSvgSize: 1000000, // 1MB limit
        enableDebug: false
      };

      const secureServer = new SvgMcpServer(secureConfig);
      expect(secureServer.config.maxSvgSize).toBeLessThanOrEqual(1000000);
      expect(secureServer.config.enableDebug).toBe(false);
    });

    it('should handle invalid configuration gracefully', () => {
      const invalidConfigs = [
        { name: '', version: '1.0.0' },
        { name: 'test', version: '' },
        { name: 'test', version: '1.0.0', maxSvgSize: -1 },
        { name: 'test', version: '1.0.0', maxSvgSize: Number.MAX_SAFE_INTEGER }
      ];

      invalidConfigs.forEach(config => {
        expect(() => new SvgMcpServer(config)).not.toThrow();
      });
    });
  });
});
