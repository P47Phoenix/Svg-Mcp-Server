/**
 * Tests for SVG Template Engine System
 */

import { describe, test, expect, beforeEach } from '@jest/globals';

// Mock the logger to avoid import issues in tests
jest.mock('../src/utils/logger.js', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    setLogLevel: jest.fn()
  }
}));

import { SvgTemplateEngine, SvgTemplate } from '../src/core/templates/SvgTemplateEngine.js';
import { SvgTemplateFactory } from '../src/core/templates/SvgTemplateFactory.js';

describe('SvgTemplateEngine', () => {
  let templateEngine: SvgTemplateEngine;

  beforeEach(() => {
    templateEngine = new SvgTemplateEngine();
  });

  describe('Template Registration', () => {
    test('should register a template successfully', () => {
      const template: SvgTemplate = {
        id: 'test-template',
        name: 'Test Template',
        description: 'A test template',
        version: '1.0.0',
        author: 'Test Author',
        tags: ['test'],
        variables: [],
        document: {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: []
        },
        metadata: {
          category: 'Test',
          complexity: 'simple',
          dimensions: { width: 100, height: 100 },
          createdAt: new Date(),
          updatedAt: new Date(),
          usage: {
            totalUses: 0,
            popularVariations: {}
          }
        }
      };

      expect(() => templateEngine.registerTemplate(template)).not.toThrow();
    });

    test('should store registered template', () => {
      const template: SvgTemplate = {
        id: 'stored-template',
        name: 'Stored Template',
        description: 'A template that should be stored',
        version: '1.0.0',
        author: 'Test Author',
        tags: ['test'],
        variables: [],
        document: {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: []
        },
        metadata: {
          category: 'Test',
          complexity: 'simple',
          dimensions: { width: 100, height: 100 },
          createdAt: new Date(),
          updatedAt: new Date(),
          usage: {
            totalUses: 0,
            popularVariations: {}
          }
        }
      };

      templateEngine.registerTemplate(template);
      const retrievedTemplate = templateEngine.getTemplate('stored-template');
      
      expect(retrievedTemplate).toBeDefined();
      expect(retrievedTemplate?.id).toBe('stored-template');
      expect(retrievedTemplate?.name).toBe('Stored Template');
    });
  });

  describe('Template Instantiation', () => {
    beforeEach(() => {
      const template: SvgTemplate = {
        id: 'circle-template',
        name: 'Circle Template',
        description: 'A customizable circle',
        version: '1.0.0',
        author: 'Test Author',
        tags: ['shape', 'circle'],
        variables: [
          {
            name: 'radius',
            type: 'number',
            defaultValue: 50,
            description: 'Circle radius',
            required: false,
            constraints: { min: 10, max: 100 }
          },
          {
            name: 'color',
            type: 'color',
            defaultValue: '#3B82F6',
            description: 'Circle color',
            required: false
          }
        ],
        document: {
          viewBox: { x: 0, y: 0, width: 200, height: 200 },
          elements: [
            {
              type: 'circle',
              cx: 100,
              cy: 100,
              r: '{{radius}}',
              style: {
                fill: '{{color}}'
              }
            }
          ]
        },
        metadata: {
          category: 'Shapes',
          complexity: 'simple',
          dimensions: { width: 200, height: 200 },
          createdAt: new Date(),
          updatedAt: new Date(),
          usage: {
            totalUses: 0,
            popularVariations: {}
          }
        }
      };

      templateEngine.registerTemplate(template);
    });

    test('should instantiate template with default values', async () => {
      const instance = await templateEngine.instantiateTemplate('circle-template', {});
      
      expect(instance).toBeDefined();
      expect(instance.templateId).toBe('circle-template');
      expect(instance.variables.radius).toBe(50);
      expect(instance.variables.color).toBe('#3B82F6');
    });

    test('should instantiate template with custom values', async () => {
      const variables = {
        radius: 75,
        color: '#EF4444'
      };

      const instance = await templateEngine.instantiateTemplate('circle-template', variables);
      
      expect(instance).toBeDefined();
      expect(instance.variables.radius).toBe(75);
      expect(instance.variables.color).toBe('#EF4444');
    });
  });

  describe('Template Search', () => {
    beforeEach(() => {
      const templates: SvgTemplate[] = [
        {
          id: 'circle-icon',
          name: 'Circle Icon',
          description: 'A simple circle icon',
          version: '1.0.0',
          author: 'Test Author',
          tags: ['icon', 'circle', 'shape'],
          variables: [],
          document: {
            viewBox: { x: 0, y: 0, width: 100, height: 100 },
            elements: []
          },
          metadata: {
            category: 'Icons',
            complexity: 'simple',
            dimensions: { width: 100, height: 100 },
            createdAt: new Date(),
            updatedAt: new Date(),
            usage: {
              totalUses: 0,
              popularVariations: {}
            }
          }
        },
        {
          id: 'bar-chart',
          name: 'Bar Chart',
          description: 'A customizable bar chart',
          version: '1.0.0',
          author: 'Test Author',
          tags: ['chart', 'bar', 'data'],
          variables: [],
          document: {
            viewBox: { x: 0, y: 0, width: 400, height: 300 },
            elements: []
          },
          metadata: {
            category: 'Charts',
            complexity: 'intermediate',
            dimensions: { width: 400, height: 300 },
            createdAt: new Date(),
            updatedAt: new Date(),
            usage: {
              totalUses: 0,
              popularVariations: {}
            }
          }
        }
      ];

      templates.forEach(template => templateEngine.registerTemplate(template));
    });

    test('should search templates by name', () => {
      const results = templateEngine.searchTemplates({ name: 'circle' });
      expect(results.length).toBe(1);
      expect(results[0].id).toBe('circle-icon');
    });

    test('should search templates by category', () => {
      const results = templateEngine.searchTemplates({ category: 'Icons' });
      expect(results.length).toBe(1);
      expect(results[0].id).toBe('circle-icon');
    });

    test('should return all templates with empty search', () => {
      const results = templateEngine.searchTemplates({});
      expect(results.length).toBe(2);
    });
  });
});

describe('SvgTemplateFactory', () => {
  let templateEngine: SvgTemplateEngine;
  let templateFactory: SvgTemplateFactory;

  beforeEach(() => {
    templateEngine = new SvgTemplateEngine();
    templateFactory = new SvgTemplateFactory(templateEngine);
  });

  describe('Factory Initialization', () => {
    test('should initialize without throwing errors', () => {
      expect(() => templateFactory.initialize()).not.toThrow();
    });

    test('should register built-in templates', () => {
      templateFactory.initialize();
      
      // Check that templates were registered
      const iconTemplates = templateEngine.searchTemplates({ tags: ['icon'] });
      expect(iconTemplates.length).toBeGreaterThan(0);
    });

    test('should register arrow icon template', () => {
      templateFactory.initialize();
      
      const arrowTemplate = templateEngine.getTemplate('icon-arrow');
      expect(arrowTemplate).toBeDefined();
      expect(arrowTemplate?.name).toBe('Arrow Icon');
    });

    test('should register check icon template', () => {
      templateFactory.initialize();
      
      const checkTemplate = templateEngine.getTemplate('icon-check');
      expect(checkTemplate).toBeDefined();
      expect(checkTemplate?.name).toBe('Check Mark Icon');
    });
  });

  describe('Template Instantiation', () => {
    beforeEach(() => {
      templateFactory.initialize();
    });

    test('should instantiate arrow icon with default parameters', async () => {
      const instance = await templateEngine.instantiateTemplate('icon-arrow', {});
      
      expect(instance).toBeDefined();
      expect(instance.templateId).toBe('icon-arrow');
    });

    test('should instantiate check icon with default parameters', async () => {
      const instance = await templateEngine.instantiateTemplate('icon-check', {});
      
      expect(instance).toBeDefined();
      expect(instance.templateId).toBe('icon-check');
    });
  });
});
