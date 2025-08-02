/**
 * RFC 7996 Compliance Tests
 * Task #12: Comprehensive Testing Infrastructure
 */

import { jest } from '@jest/globals';
import { SvgMcpServer } from '../../src/server/SvgMcpServer.js';

// Mock dependencies
jest.mock('../../src/utils/logger.js');

describe('RFC 7996 Compliance Tests', () => {
  let server: SvgMcpServer;

  beforeEach(() => {
    server = new SvgMcpServer({
      name: 'rfc-compliance-test-server',
      version: '1.0.0',
      maxSvgSize: 10000,
      enableDebug: false,
    });
  });

  describe('SVG 1.2 Tiny Profile Compliance', () => {
    it('should generate SVG with proper version and baseProfile', async () => {
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) throw new Error('generate_svg tool not found');

      const testDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [
          {
            type: 'rect',
            x: 10,
            y: 10,
            width: 80,
            height: 80,
            fill: '#0000FF'
          }
        ]
      };

      const result = await generateTool.execute({
        document: testDocument,
        optimize: false,
        validate: true
      });

      const response = JSON.parse(result.content[0].text);
      
      // Should specify SVG 1.2 version and tiny baseProfile
      expect(response.svg).toContain('version="1.2"');
      expect(response.svg).toContain('baseProfile="tiny"');
    });

    it('should use only SVG 1.2 Tiny allowed elements', async () => {
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) throw new Error('generate_svg tool not found');

      const testDocument = {
        viewBox: { x: 0, y: 0, width: 200, height: 200 },
        elements: [
          { type: 'rect', x: 10, y: 10, width: 50, height: 50, fill: '#FF0000' },
          { type: 'circle', cx: 100, cy: 50, r: 25, fill: '#00FF00' },
          { type: 'ellipse', cx: 150, cy: 50, rx: 30, ry: 20, fill: '#0000FF' },
          { type: 'line', x1: 10, y1: 100, x2: 190, y2: 100, stroke: '#000000', strokeWidth: 2 },
          { type: 'polyline', points: '10,120 50,140 90,120 130,140 170,120', stroke: '#FF00FF', fill: 'none' },
          { type: 'polygon', points: '10,150 50,170 30,190', fill: '#FFFF00' },
          { type: 'path', d: 'M100,150 Q120,130 140,150 T180,150', stroke: '#00FFFF', fill: 'none' },
          { type: 'text', x: 10, y: 180, content: 'RFC 7996 Compliant', fill: '#000000' }
        ]
      };

      const result = await generateTool.execute({
        document: testDocument,
        optimize: false,
        validate: true
      });

      const response = JSON.parse(result.content[0].text);
      
      // All elements should be allowed in SVG 1.2 Tiny
      expect(response.valid).toBe(true);
      expect(response.errors.filter((e: any) => e.type === 'forbidden-element')).toHaveLength(0);
    });

    it('should reject forbidden SVG elements', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      // These elements are not allowed in SVG 1.2 Tiny
      const forbiddenElements = [
        { type: 'filter', children: [] },
        { type: 'mask', children: [] },
        { type: 'marker', children: [] },
        { type: 'pattern', children: [] },
        { type: 'symbol', children: [] }
      ];

      for (const forbiddenElement of forbiddenElements) {
        const testDocument = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [forbiddenElement]
        };

        const result = await validateTool.execute({
          document: testDocument,
          preset: 'strict'
        });

        const response = JSON.parse(result.content[0].text);
        
        expect(response.valid).toBe(false);
        expect(response.errors.some((e: any) => 
          e.code.includes('forbidden') || e.code.includes('invalid-element')
        )).toBe(true);
      }
    });
  });

  describe('Color Restrictions', () => {
    it('should accept valid color formats allowed in RFC 7996', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const validColors = [
        '#000000',     // Hex 6-digit
        '#000',        // Hex 3-digit
        'black',       // Named color
        'rgb(0,0,0)',  // RGB function
        'transparent', // Transparency
        'none'         // No color
      ];

      for (const color of validColors) {
        const testDocument = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [
            {
              type: 'rect',
              x: 10,
              y: 10,
              width: 80,
              height: 80,
              fill: color
            }
          ]
        };

        const result = await validateTool.execute({
          document: testDocument,
          preset: 'strict'
        });

        const response = JSON.parse(result.content[0].text);
        
        expect(response.errors.filter((e: any) => 
          e.code.includes('invalid-color')
        )).toHaveLength(0);
      }
    });

    it('should reject invalid color formats', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const invalidColors = [
        'hsl(120, 100%, 50%)',  // HSL not allowed in RFC 7996
        'rgba(0,0,0,0.5)',      // RGBA with alpha
        'url(#gradient)',       // URL references to gradients
        '#gggggg',              // Invalid hex
        'invalid-color'         // Non-existent color name
      ];

      for (const color of invalidColors) {
        const testDocument = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [
            {
              type: 'rect',
              x: 10,
              y: 10,
              width: 80,
              height: 80,
              fill: color
            }
          ]
        };

        const result = await validateTool.execute({
          document: testDocument,
          preset: 'strict'
        });

        const response = JSON.parse(result.content[0].text);
        
        expect(response.valid).toBe(false);
        expect(response.errors.some((e: any) => 
          e.code.includes('invalid-color')
        )).toBe(true);
      }
    });
  });

  describe('Font Restrictions', () => {
    it('should accept only allowed font families', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      // RFC 7996 specifies these font families
      const allowedFonts = [
        'serif',
        'sans-serif',
        'monospace'
      ];

      for (const font of allowedFonts) {
        const testDocument = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [
            {
              type: 'text',
              x: 10,
              y: 50,
              content: 'Test Text',
              fontFamily: font,
              fill: 'black'
            }
          ]
        };

        const result = await validateTool.execute({
          document: testDocument,
          preset: 'strict'
        });

        const response = JSON.parse(result.content[0].text);
        
        expect(response.errors.filter((e: any) => 
          e.code.includes('invalid-font')
        )).toHaveLength(0);
      }
    });

    it('should reject forbidden font families', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const forbiddenFonts = [
        'Arial',
        'Times New Roman',
        'Helvetica',
        'Comic Sans MS',
        'Verdana'
      ];

      for (const font of forbiddenFonts) {
        const testDocument = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [
            {
              type: 'text',
              x: 10,
              y: 50,
              content: 'Test Text',
              fontFamily: font,
              fill: 'black'
            }
          ]
        };

        const result = await validateTool.execute({
          document: testDocument,
          preset: 'strict'
        });

        const response = JSON.parse(result.content[0].text);
        
        expect(response.valid).toBe(false);
        expect(response.errors.some((e: any) => 
          e.code.includes('invalid-font')
        )).toBe(true);
      }
    });
  });

  describe('Accessibility Requirements', () => {
    it('should include title and description for accessibility', async () => {
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) throw new Error('generate_svg tool not found');

      const testDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        title: 'Test Diagram',
        description: 'A simple test diagram showing a blue rectangle',
        elements: [
          {
            type: 'rect',
            x: 10,
            y: 10,
            width: 80,
            height: 80,
            fill: '#0000FF'
          }
        ]
      };

      const result = await generateTool.execute({
        document: testDocument,
        optimize: false,
        validate: true
      });

      const response = JSON.parse(result.content[0].text);
      
      // Should include title and desc elements
      expect(response.svg).toContain('<title>');
      expect(response.svg).toContain('Test Diagram');
      expect(response.svg).toContain('<desc>');
      expect(response.svg).toContain('A simple test diagram');
    });

    it('should validate accessibility compliance', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const accessibleDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        title: 'Accessible Diagram',
        description: 'An accessible diagram with proper markup',
        elements: [
          {
            type: 'rect',
            x: 10,
            y: 10,
            width: 80,
            height: 80,
            fill: '#0000FF',
            'aria-label': 'Blue rectangle representing data'
          }
        ]
      };

      const result = await validateTool.execute({
        document: accessibleDocument,
        preset: 'accessibility'
      });

      const response = JSON.parse(result.content[0].text);
      
      expect(response.reports.accessibility.score).toBeGreaterThan(0.8);
      expect(response.reports.accessibility.level).toMatch(/^(A|AA|AAA)$/);
    });

    it('should detect accessibility issues', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const inaccessibleDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        // No title or description
        elements: [
          {
            type: 'rect',
            x: 10,
            y: 10,
            width: 80,
            height: 80,
            fill: '#FFFF00' // Poor contrast with white background
          }
        ]
      };

      const result = await validateTool.execute({
        document: inaccessibleDocument,
        preset: 'accessibility'
      });

      const response = JSON.parse(result.content[0].text);
      
      expect(response.warnings.some((w: any) => 
        w.code.includes('accessibility') || w.code.includes('contrast')
      )).toBe(true);
    });
  });

  describe('Structural Requirements', () => {
    it('should require valid viewBox', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const invalidViewBoxes = [
        { x: 0, y: 0, width: -100, height: 100 },   // Negative width
        { x: 0, y: 0, width: 100, height: -100 },   // Negative height
        { x: 0, y: 0, width: 0, height: 100 },      // Zero width
        { x: 0, y: 0, width: 100, height: 0 }       // Zero height
      ];

      for (const viewBox of invalidViewBoxes) {
        const testDocument = {
          viewBox,
          elements: []
        };

        const result = await validateTool.execute({
          document: testDocument,
          preset: 'strict'
        });

        const response = JSON.parse(result.content[0].text);
        
        expect(response.valid).toBe(false);
        expect(response.errors.some((e: any) => 
          e.code.includes('invalid-viewbox') || e.code.includes('invalid-dimension')
        )).toBe(true);
      }
    });

    it('should validate element coordinates', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const testDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [
          {
            type: 'rect',
            x: 'invalid', // Should be number
            y: 10,
            width: 80,
            height: 80,
            fill: '#0000FF'
          }
        ]
      };

      const result = await validateTool.execute({
        document: testDocument,
        preset: 'strict'
      });

      const response = JSON.parse(result.content[0].text);
      
      expect(response.valid).toBe(false);
      expect(response.errors.some((e: any) => 
        e.code.includes('invalid-coordinate') || e.code.includes('type-error')
      )).toBe(true);
    });

    it('should validate required attributes for each element type', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const incompleteElements = [
        { type: 'rect', x: 10, y: 10, width: 80 }, // Missing height
        { type: 'circle', cx: 50 }, // Missing cy and r
        { type: 'line', x1: 0, y1: 0 }, // Missing x2 and y2
        { type: 'text', x: 10 } // Missing y and content
      ];

      for (const element of incompleteElements) {
        const testDocument = {
          viewBox: { x: 0, y: 0, width: 100, height: 100 },
          elements: [element]
        };

        const result = await validateTool.execute({
          document: testDocument,
          preset: 'strict'
        });

        const response = JSON.parse(result.content[0].text);
        
        expect(response.valid).toBe(false);
        expect(response.errors.some((e: any) => 
          e.code.includes('missing-attribute') || e.code.includes('required-property')
        )).toBe(true);
      }
    });
  });

  describe('Namespace and Declaration Compliance', () => {
    it('should include proper SVG namespace', async () => {
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) throw new Error('generate_svg tool not found');

      const testDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [
          {
            type: 'rect',
            x: 10,
            y: 10,
            width: 80,
            height: 80,
            fill: '#0000FF'
          }
        ]
      };

      const result = await generateTool.execute({
        document: testDocument,
        optimize: false,
        validate: true
      });

      const response = JSON.parse(result.content[0].text);
      
      // Should include proper SVG namespace
      expect(response.svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    });

    it('should include XML declaration for standalone SVGs', async () => {
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) throw new Error('generate_svg tool not found');

      const testDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [
          {
            type: 'rect',
            x: 10,
            y: 10,
            width: 80,
            height: 80,
            fill: '#0000FF'
          }
        ]
      };

      const result = await generateTool.execute({
        document: testDocument,
        optimize: false,
        validate: true
      });

      const response = JSON.parse(result.content[0].text);
      
      // Should include XML declaration
      expect(response.svg).toMatch(/^<\?xml\s+version="1\.0"/);
    });
  });

  describe('Content Model Compliance', () => {
    it('should validate proper element nesting', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const properlyNestedDocument = {
        viewBox: { x: 0, y: 0, width: 200, height: 200 },
        elements: [
          {
            type: 'g',
            children: [
              {
                type: 'rect',
                x: 10,
                y: 10,
                width: 80,
                height: 80,
                fill: '#FF0000'
              },
              {
                type: 'circle',
                cx: 150,
                cy: 50,
                r: 30,
                fill: '#00FF00'
              }
            ]
          },
          {
            type: 'defs',
            children: [
              {
                type: 'g',
                id: 'reusable-shape',
                children: [
                  {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    width: 20,
                    height: 20,
                    fill: '#0000FF'
                  }
                ]
              }
            ]
          }
        ]
      };

      const result = await validateTool.execute({
        document: properlyNestedDocument,
        preset: 'strict'
      });

      const response = JSON.parse(result.content[0].text);
      
      expect(response.errors.filter((e: any) => 
        e.code.includes('invalid-nesting') || e.code.includes('content-model')
      )).toHaveLength(0);
    });

    it('should reject invalid element nesting', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const invalidlyNestedDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [
          {
            type: 'rect',
            x: 10,
            y: 10,
            width: 80,
            height: 80,
            fill: '#FF0000',
            children: [ // rect cannot contain children
              {
                type: 'circle',
                cx: 50,
                cy: 50,
                r: 20,
                fill: '#00FF00'
              }
            ]
          }
        ]
      };

      const result = await validateTool.execute({
        document: invalidlyNestedDocument,
        preset: 'strict'
      });

      const response = JSON.parse(result.content[0].text);
      
      expect(response.valid).toBe(false);
      expect(response.errors.some((e: any) => 
        e.code.includes('invalid-nesting') || e.code.includes('content-model')
      )).toBe(true);
    });
  });

  describe('Metadata Requirements', () => {
    it('should generate compliant metadata', async () => {
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) throw new Error('generate_svg tool not found');

      const testDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        title: 'RFC 7996 Test',
        description: 'Test for RFC compliance',
        elements: [
          {
            type: 'rect',
            x: 10,
            y: 10,
            width: 80,
            height: 80,
            fill: '#0000FF'
          }
        ]
      };

      const result = await generateTool.execute({
        document: testDocument,
        optimize: false,
        validate: true
      });

      const response = JSON.parse(result.content[0].text);
      
      expect(response.metadata.compliance.level).toBe('full');
      expect(response.metadata.compliance.rfc7996).toBe(true);
      expect(response.metadata.profile).toBe('SVG 1.2 Tiny');
    });
  });
});
