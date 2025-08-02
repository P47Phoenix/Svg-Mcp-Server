/**
 * Comprehensive Template System Tests
 * Task #12: Comprehensive Testing Infrastructure
 */

import { jest } from '@jest/globals';
import { SvgTemplateEngine } from '../../src/core/templates/SvgTemplateEngine.js';
import { SvgTemplateFactory } from '../../src/core/templates/SvgTemplateFactory.js';
import { logger } from '../../src/utils/logger.js';

// Mock logger
jest.mock('../../src/utils/logger.js');

describe('Template System Comprehensive Tests', () => {
  let templateEngine: SvgTemplateEngine;
  let templateFactory: SvgTemplateFactory;

  beforeEach(() => {
    templateEngine = new SvgTemplateEngine();
    templateFactory = new SvgTemplateFactory(templateEngine);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('SvgTemplateEngine', () => {
    describe('Template Registration', () => {
      it('should register a template successfully', () => {
        const template = {
          id: 'test-template',
          name: 'Test Template',
          description: 'A test template',
          version: '1.0.0',
          author: 'Test Author',
          tags: ['test'],
          variables: [],
          document: {
            viewBox: '0 0 100 100',
            width: 100,
            height: 100,
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
          },
          metadata: {
            category: 'test',
            complexity: 'simple' as const,
            dimensions: { width: 100, height: 100 },
            usage: {
              totalUses: 0,
              lastUsed: null,
              averageRating: 0,
              ratingCount: 0
            }
          }
        };

        templateEngine.registerTemplate(template);
        expect(templateEngine.getTemplate('test-template')).toBeDefined();
      });

      it('should prevent duplicate template registration', () => {
        const template = {
          id: 'duplicate-template',
          name: 'Duplicate Template',
          description: 'A duplicate template',
          version: '1.0.0',
          author: 'Test Author',
          tags: ['test'],
          variables: [],
          document: {
            viewBox: '0 0 100 100',
            width: 100,
            height: 100,
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
          },
          metadata: {
            category: 'test',
            complexity: 'simple' as const,
            dimensions: { width: 100, height: 100 },
            usage: {
              totalUses: 0,
              lastUsed: null,
              averageRating: 0,
              ratingCount: 0
            }
          }
        };

        // Register first time
        templateEngine.registerTemplate(template);
        expect(templateEngine.getTemplate('duplicate-template')).toBeDefined();

        // Attempt to register again should throw
        expect(() => templateEngine.registerTemplate(template))
          .toThrow('Template duplicate-template already exists');
      });

      it('should validate template structure', () => {
        const invalidTemplate = {
          id: '',  // Invalid empty ID
          name: 'Invalid Template',
          description: 'A template with invalid structure',
          version: '1.0.0',
          author: 'Test Author',
          tags: ['test'],
          variables: [],
          content: '<rect />',
          metadata: {
            category: 'test',
            complexity: 'simple' as const,
            dimensions: { width: 100, height: 100 },
            usage: {
              totalUses: 0,
              lastUsed: null,
              averageRating: 0,
              ratingCount: 0
            }
          }
        };

        const result = templateEngine.registerTemplate(invalidTemplate);
        expect(result.success).toBe(false);
        expect(result.error).toContain('validation failed');
      });
    });

    describe('Template Instantiation', () => {
      beforeEach(() => {
        // Register a test template with variables
        const template = {
          id: 'variable-template',
          name: 'Variable Template',
          description: 'A template with variables',
          version: '1.0.0',
          author: 'Test Author',
          tags: ['test'],
          variables: [
            {
              name: 'width',
              type: 'number' as const,
              required: true,
              defaultValue: 100,
              description: 'Rectangle width'
            },
            {
              name: 'height',
              type: 'number' as const,
              required: true,
              defaultValue: 50,
              description: 'Rectangle height'
            },
            {
              name: 'color',
              type: 'string' as const,
              required: false,
              defaultValue: 'blue',
              description: 'Rectangle color'
            }
          ],
          document: {
            viewBox: '0 0 200 100',
            width: 200,
            height: 100,
            elements: [
              {
                type: 'rect',
                x: 0,
                y: 0,
                width: '{{width}}',
                height: '{{height}}',
                fill: '{{color}}'
              }
            ]
          },
          metadata: {
            category: 'test',
            complexity: 'simple' as const,
            dimensions: { width: 100, height: 100 },
            usage: {
              totalUses: 0,
              lastUsed: null,
              averageRating: 0,
              ratingCount: 0
            }
          }
        };

        templateEngine.registerTemplate(template);
      });

      it('should instantiate template with provided variables', async () => {
        const result = await templateEngine.instantiateTemplate('variable-template', {
          width: 200,
          height: 100,
          color: 'red'
        });

        expect(result).toBeDefined();
        expect(result.variables.width).toBe(200);
        expect(result.variables.height).toBe(100);
        expect(result.variables.color).toBe('red');
      });

      it('should use default values for missing optional variables', async () => {
        const result = await templateEngine.instantiateTemplate('variable-template', {
          width: 200,
          height: 100
          // color not provided, should use default
        });

        expect(result).toBeDefined();
        expect(result.variables.color).toBe('blue');
      });

      it('should fail when required variables are missing', async () => {
        await expect(templateEngine.instantiateTemplate('variable-template', {
          width: 200
          // height missing and required
        })).rejects.toThrow('Required variable missing');
      });

      it('should validate variable types', async () => {
        await expect(templateEngine.instantiateTemplate('variable-template', {
          width: 'invalid-number',  // Should be number
          height: 100,
          color: 'red'
        })).rejects.toThrow('invalid type');
      });
    });

    describe('Template Search', () => {
      beforeEach(() => {
        // Register multiple test templates
        const templates = [
          {
            id: 'icon-arrow',
            name: 'Arrow Icon',
            description: 'Simple arrow icon',
            version: '1.0.0',
            author: 'Test Author',
            tags: ['icon', 'arrow'],
            variables: [],
            content: '<path />',
            metadata: {
              category: 'icons',
              complexity: 'simple' as const,
              dimensions: { width: 24, height: 24 },
              usage: {
                totalUses: 10,
                lastUsed: new Date(),
                averageRating: 4.5,
                ratingCount: 5
              }
            }
          },
          {
            id: 'chart-bar',
            name: 'Bar Chart',
            description: 'Simple bar chart',
            version: '1.0.0',
            author: 'Test Author',
            tags: ['chart', 'bar'],
            variables: [],
            content: '<g />',
            metadata: {
              category: 'charts',
              complexity: 'moderate' as const,
              dimensions: { width: 300, height: 200 },
              usage: {
                totalUses: 5,
                lastUsed: new Date(),
                averageRating: 4.0,
                ratingCount: 2
              }
            }
          }
        ];

        templates.forEach(template => templateEngine.registerTemplate(template));
      });

      it('should search templates by name', () => {
        const results = templateEngine.searchTemplates({ name: 'Arrow' });
        expect(results).toHaveLength(1);
        expect(results[0].id).toBe('icon-arrow');
      });

      it('should search templates by category', () => {
        const results = templateEngine.searchTemplates({ category: 'icons' });
        expect(results).toHaveLength(1);
        expect(results[0].id).toBe('icon-arrow');
      });

      it('should search templates by tags', () => {
        const results = templateEngine.searchTemplates({ tags: ['chart'] });
        expect(results).toHaveLength(1);
        expect(results[0].id).toBe('chart-bar');
      });

      it('should return all templates when no filters provided', () => {
        const results = templateEngine.searchTemplates({});
        expect(results).toHaveLength(2);
      });

      it('should handle case-insensitive search', () => {
        const results = templateEngine.searchTemplates({ name: 'arrow' });
        expect(results).toHaveLength(1);
        expect(results[0].id).toBe('icon-arrow');
      });
    });
  });

  describe('SvgTemplateFactory', () => {
    describe('Initialization', () => {
      it('should initialize with built-in templates', () => {
        templateFactory.initialize();
        
        // Verify that built-in templates are registered
        const allTemplates = templateEngine.searchTemplates({});
        expect(allTemplates.length).toBeGreaterThan(0);
      });

      it('should register icon templates', () => {
        templateFactory.initialize();
        
        const iconTemplates = templateEngine.searchTemplates({ category: 'icons' });
        expect(iconTemplates.length).toBeGreaterThan(0);
        
        // Check for specific icon templates
        const templateIds = iconTemplates.map(t => t.id);
        expect(templateIds).toContain('icon-arrow-right');
        expect(templateIds).toContain('icon-check');
        expect(templateIds).toContain('icon-star');
      });

      it('should register chart templates', () => {
        templateFactory.initialize();
        
        const chartTemplates = templateEngine.searchTemplates({ category: 'charts' });
        expect(chartTemplates.length).toBeGreaterThan(0);
        
        // Check for specific chart templates
        const templateIds = chartTemplates.map(t => t.id);
        expect(templateIds).toContain('chart-bar');
        expect(templateIds).toContain('chart-pie');
        expect(templateIds).toContain('chart-line');
      });

      it('should register pattern templates', () => {
        templateFactory.initialize();
        
        const patternTemplates = templateEngine.searchTemplates({ category: 'patterns' });
        expect(patternTemplates.length).toBeGreaterThan(0);
        
        // Check for specific pattern templates
        const templateIds = patternTemplates.map(t => t.id);
        expect(templateIds).toContain('pattern-grid');
        expect(templateIds).toContain('pattern-dots');
        expect(templateIds).toContain('pattern-stripes');
      });
    });

    describe('Template Quality', () => {
      beforeEach(() => {
        templateFactory.initialize();
      });

      it('should have valid SVG content for all templates', () => {
        const allTemplates = templateEngine.searchTemplates({});
        
        allTemplates.forEach(template => {
          expect(template.content).toBeTruthy();
          expect(template.content).toMatch(/<[^>]+>/); // Contains SVG elements
        });
      });

      it('should have proper metadata for all templates', () => {
        const allTemplates = templateEngine.searchTemplates({});
        
        allTemplates.forEach(template => {
          expect(template.metadata).toBeDefined();
          expect(template.metadata.category).toBeTruthy();
          expect(template.metadata.complexity).toMatch(/^(simple|moderate|complex)$/);
          expect(template.metadata.dimensions).toBeDefined();
          expect(template.metadata.dimensions.width).toBeGreaterThan(0);
          expect(template.metadata.dimensions.height).toBeGreaterThan(0);
        });
      });

      it('should have valid variable definitions', () => {
        const allTemplates = templateEngine.searchTemplates({});
        
        allTemplates.forEach(template => {
          template.variables.forEach(variable => {
            expect(variable.name).toBeTruthy();
            expect(variable.type).toMatch(/^(string|number|boolean|color)$/);
            expect(typeof variable.required).toBe('boolean');
          });
        });
      });
    });
  });

  describe('Integration Tests', () => {
    it('should handle template lifecycle end-to-end', () => {
      // Initialize factory
      templateFactory.initialize();
      
      // Search for a template
      const iconTemplates = templateEngine.searchTemplates({ category: 'icons' });
      expect(iconTemplates.length).toBeGreaterThan(0);
      
      // Instantiate a template
      const template = iconTemplates[0];
      const variables = template.variables.reduce((acc, variable) => {
        acc[variable.name] = variable.default;
        return acc;
      }, {} as Record<string, any>);
      
      const result = templateEngine.instantiateTemplate(template.id, variables);
      expect(result.success).toBe(true);
      expect(result.content).toBeTruthy();
    });

    it('should handle concurrent template operations', async () => {
      templateFactory.initialize();
      
      // Simulate concurrent operations
      const operations = Array.from({ length: 10 }, (_, i) => 
        templateEngine.searchTemplates({ name: `template-${i}` })
      );
      
      // All operations should complete without errors
      expect(() => {
        operations.forEach(result => {
          expect(Array.isArray(result)).toBe(true);
        });
      }).not.toThrow();
    });
  });

  describe('Performance Tests', () => {
    it('should search templates efficiently', () => {
      templateFactory.initialize();
      
      const startTime = Date.now();
      const results = templateEngine.searchTemplates({});
      const endTime = Date.now();
      
      const executionTime = endTime - startTime;
      expect(executionTime).toBeLessThan(100); // Should complete in under 100ms
      expect(results.length).toBeGreaterThan(0);
    });

    it('should instantiate templates efficiently', () => {
      templateFactory.initialize();
      
      const templates = templateEngine.searchTemplates({ category: 'icons' });
      if (templates.length === 0) return;
      
      const template = templates[0];
      const variables = template.variables.reduce((acc, variable) => {
        acc[variable.name] = variable.default;
        return acc;
      }, {} as Record<string, any>);
      
      const startTime = Date.now();
      const result = templateEngine.instantiateTemplate(template.id, variables);
      const endTime = Date.now();
      
      const executionTime = endTime - startTime;
      expect(executionTime).toBeLessThan(50); // Should complete in under 50ms
      expect(result.success).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid template IDs gracefully', async () => {
      await expect(templateEngine.instantiateTemplate('nonexistent-template', {}))
        .rejects.toThrow('Template not found: nonexistent-template');
    });

    it('should handle malformed search queries gracefully', () => {
      expect(() => templateEngine.searchTemplates({ name: null as any })).not.toThrow();
      expect(() => templateEngine.searchTemplates({ category: undefined as any })).not.toThrow();
    });

    it('should handle template registration errors gracefully', () => {
      const malformedTemplate = {
        // Missing required fields
        name: 'Malformed Template'
      };

      expect(() => templateEngine.registerTemplate(malformedTemplate as any))
        .toThrow('Template must have a valid ID');
      expect(result.error).toBeTruthy();
    });
  });
});
