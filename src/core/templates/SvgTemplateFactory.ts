/**
 * SVG Template Factory
 * 
 * Factory for creating common SVG templates including icons, charts,
 * decorative patterns, logos, and design elements. Provides built-in
 * template library with customizable parameters.
 */

import { SvgTemplate, SvgTemplateEngine } from './SvgTemplateEngine.js';
import { logger } from '../../utils/logger.js';

/**
 * SVG Template Factory
 */
export class SvgTemplateFactory {
  private templateEngine: SvgTemplateEngine;

  constructor(templateEngine: SvgTemplateEngine) {
    this.templateEngine = templateEngine;
  }

  /**
   * Initialize factory with built-in templates
   */
  initialize(): void {
    logger.info('Initializing SVG Template Factory with built-in templates');

    // Register built-in templates
    this.registerIconTemplates();
    this.registerChartTemplates();
    this.registerPatternTemplates();
    this.registerLogoTemplates();
    this.registerDecorationTemplates();

    logger.info('SVG Template Factory initialized successfully');
  }

  // ===== ICON TEMPLATES =====

  /**
   * Register icon templates
   */
  private registerIconTemplates(): void {
    // Arrow icon template
    this.templateEngine.registerTemplate(this.createArrowIconTemplate());
    
    // Check mark icon template
    this.templateEngine.registerTemplate(this.createCheckIconTemplate());
    
    // Star icon template
    this.templateEngine.registerTemplate(this.createStarIconTemplate());
    
    // Heart icon template
    this.templateEngine.registerTemplate(this.createHeartIconTemplate());
  }

  private createArrowIconTemplate(): SvgTemplate {
    return {
      id: 'icon-arrow',
      name: 'Arrow Icon',
      description: 'Customizable arrow icon with direction and styling options',
      version: '1.0.0',
      author: 'SVG Template Factory',
      tags: ['icon', 'arrow', 'navigation', 'ui'],
      variables: [
        {
          name: 'direction',
          type: 'string',
          defaultValue: 'right',
          description: 'Arrow direction',
          required: false,
          constraints: {
            enumValues: ['up', 'down', 'left', 'right']
          }
        },
        {
          name: 'size',
          type: 'number',
          defaultValue: 24,
          description: 'Icon size in pixels',
          required: false,
          constraints: { min: 8, max: 128 }
        },
        {
          name: 'color',
          type: 'color',
          defaultValue: '#000000',
          description: 'Arrow color',
          required: false
        },
        {
          name: 'strokeWidth',
          type: 'number',
          defaultValue: 2,
          description: 'Stroke width',
          required: false,
          constraints: { min: 1, max: 8 }
        }
      ],
      document: {
        viewBox: { x: 0, y: 0, width: 24, height: 24 },
        elements: [
          {
            type: 'path',
            d: 'M9 18l6-6-6-6',
            style: {
              fill: 'none',
              stroke: '{{color}}',
              strokeWidth: 2,
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            }
          }
        ]
      },
      metadata: {
        category: 'Icons',
        complexity: 'simple',
        dimensions: { width: 24, height: 24 },
        createdAt: new Date(),
        updatedAt: new Date(),
        usage: {
          totalUses: 0,
          popularVariations: {}
        }
      }
    };
  }

  private createCheckIconTemplate(): SvgTemplate {
    return {
      id: 'icon-check',
      name: 'Check Mark Icon',
      description: 'Customizable check mark icon for success states',
      version: '1.0.0',
      author: 'SVG Template Factory',
      tags: ['icon', 'check', 'success', 'validation', 'ui'],
      variables: [
        {
          name: 'size',
          type: 'number',
          defaultValue: 24,
          description: 'Icon size in pixels',
          required: false,
          constraints: { min: 8, max: 128 }
        },
        {
          name: 'color',
          type: 'color',
          defaultValue: '#10B981',
          description: 'Check mark color',
          required: false
        },
        {
          name: 'strokeWidth',
          type: 'number',
          defaultValue: 3,
          description: 'Stroke width',
          required: false,
          constraints: { min: 1, max: 8 }
        }
      ],
      document: {
        viewBox: { x: 0, y: 0, width: 24, height: 24 },
        elements: [
          {
            type: 'path',
            d: 'M20 6L9 17l-5-5',
            style: {
              fill: 'none',
              stroke: '{{color}}',
              strokeWidth: 3,
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            }
          }
        ]
      },
      metadata: {
        category: 'Icons',
        complexity: 'simple',
        dimensions: { width: 24, height: 24 },
        createdAt: new Date(),
        updatedAt: new Date(),
        usage: {
          totalUses: 0,
          popularVariations: {}
        }
      }
    };
  }

  private createStarIconTemplate(): SvgTemplate {
    return {
      id: 'icon-star',
      name: 'Star Icon',
      description: 'Customizable star icon with fill and outline options',
      version: '1.0.0',
      author: 'SVG Template Factory',
      tags: ['icon', 'star', 'rating', 'favorite', 'ui'],
      variables: [
        {
          name: 'size',
          type: 'number',
          defaultValue: 24,
          description: 'Icon size in pixels',
          required: false,
          constraints: { min: 8, max: 128 }
        },
        {
          name: 'fillColor',
          type: 'color',
          defaultValue: '#FCD34D',
          description: 'Star fill color',
          required: false
        },
        {
          name: 'strokeColor',
          type: 'color',
          defaultValue: '#F59E0B',
          description: 'Star stroke color',
          required: false
        },
        {
          name: 'filled',
          type: 'boolean',
          defaultValue: true,
          description: 'Whether the star is filled',
          required: false
        }
      ],
      document: {
        viewBox: { x: 0, y: 0, width: 24, height: 24 },
        elements: [
          {
            type: 'path',
            d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
            style: {
              fill: '{{fillColor}}',
              stroke: '{{strokeColor}}',
              strokeWidth: 1,
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            }
          }
        ]
      },
      metadata: {
        category: 'Icons',
        complexity: 'simple',
        dimensions: { width: 24, height: 24 },
        createdAt: new Date(),
        updatedAt: new Date(),
        usage: {
          totalUses: 0,
          popularVariations: {}
        }
      }
    };
  }

  private createHeartIconTemplate(): SvgTemplate {
    return {
      id: 'icon-heart',
      name: 'Heart Icon',
      description: 'Customizable heart icon for favorites and likes',
      version: '1.0.0',
      author: 'SVG Template Factory',
      tags: ['icon', 'heart', 'favorite', 'love', 'ui'],
      variables: [
        {
          name: 'size',
          type: 'number',
          defaultValue: 24,
          description: 'Icon size in pixels',
          required: false,
          constraints: { min: 8, max: 128 }
        },
        {
          name: 'color',
          type: 'color',
          defaultValue: '#EF4444',
          description: 'Heart color',
          required: false
        },
        {
          name: 'filled',
          type: 'boolean',
          defaultValue: false,
          description: 'Whether the heart is filled',
          required: false
        }
      ],
      document: {
        viewBox: { x: 0, y: 0, width: 24, height: 24 },
        elements: [
          {
            type: 'path',
            d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
            style: {
              fill: '{{color}}',
              stroke: '{{color}}',
              strokeWidth: 2,
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            }
          }
        ]
      },
      metadata: {
        category: 'Icons',
        complexity: 'simple',
        dimensions: { width: 24, height: 24 },
        createdAt: new Date(),
        updatedAt: new Date(),
        usage: {
          totalUses: 0,
          popularVariations: {}
        }
      }
    };
  }

  // ===== CHART TEMPLATES =====

  /**
   * Register chart templates
   */
  private registerChartTemplates(): void {
    // Bar chart template
    this.templateEngine.registerTemplate(this.createBarChartTemplate());
    
    // Pie chart template
    this.templateEngine.registerTemplate(this.createPieChartTemplate());
    
    // Line chart template
    this.templateEngine.registerTemplate(this.createLineChartTemplate());
  }

  private createBarChartTemplate(): SvgTemplate {
    return {
      id: 'chart-bar',
      name: 'Bar Chart',
      description: 'Simple bar chart with customizable data and styling',
      version: '1.0.0',
      author: 'SVG Template Factory',
      tags: ['chart', 'bar', 'data', 'visualization'],
      variables: [
        {
          name: 'data',
          type: 'array',
          defaultValue: [40, 70, 55, 90, 60],
          description: 'Chart data values',
          required: true
        },
        {
          name: 'labels',
          type: 'array',
          defaultValue: ['A', 'B', 'C', 'D', 'E'],
          description: 'Chart labels',
          required: false
        },
        {
          name: 'barColor',
          type: 'color',
          defaultValue: '#3B82F6',
          description: 'Bar color',
          required: false
        },
        {
          name: 'maxValue',
          type: 'number',
          defaultValue: 100,
          description: 'Maximum value for scaling',
          required: false,
          constraints: { min: 1 }
        }
      ],
      document: {
        viewBox: { x: 0, y: 0, width: 400, height: 300 },
        elements: [] // Would be dynamically generated based on data
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
    };
  }

  private createPieChartTemplate(): SvgTemplate {
    return {
      id: 'chart-pie',
      name: 'Pie Chart',
      description: 'Pie chart with customizable segments and colors',
      version: '1.0.0',
      author: 'SVG Template Factory',
      tags: ['chart', 'pie', 'data', 'visualization'],
      variables: [
        {
          name: 'data',
          type: 'array',
          defaultValue: [30, 25, 20, 15, 10],
          description: 'Chart data values',
          required: true
        },
        {
          name: 'labels',
          type: 'array',
          defaultValue: ['Segment 1', 'Segment 2', 'Segment 3', 'Segment 4', 'Segment 5'],
          description: 'Segment labels',
          required: false
        },
        {
          name: 'colors',
          type: 'array',
          defaultValue: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
          description: 'Segment colors',
          required: false
        },
        {
          name: 'centerX',
          type: 'number',
          defaultValue: 150,
          description: 'Center X coordinate',
          required: false
        },
        {
          name: 'centerY',
          type: 'number',
          defaultValue: 150,
          description: 'Center Y coordinate',
          required: false
        },
        {
          name: 'radius',
          type: 'number',
          defaultValue: 100,
          description: 'Pie chart radius',
          required: false,
          constraints: { min: 20, max: 200 }
        }
      ],
      document: {
        viewBox: { x: 0, y: 0, width: 300, height: 300 },
        elements: [] // Would be dynamically generated based on data
      },
      metadata: {
        category: 'Charts',
        complexity: 'advanced',
        dimensions: { width: 300, height: 300 },
        createdAt: new Date(),
        updatedAt: new Date(),
        usage: {
          totalUses: 0,
          popularVariations: {}
        }
      }
    };
  }

  private createLineChartTemplate(): SvgTemplate {
    return {
      id: 'chart-line',
      name: 'Line Chart',
      description: 'Line chart with customizable data points and styling',
      version: '1.0.0',
      author: 'SVG Template Factory',
      tags: ['chart', 'line', 'data', 'visualization', 'trends'],
      variables: [
        {
          name: 'data',
          type: 'array',
          defaultValue: [
            { x: 0, y: 40 },
            { x: 1, y: 70 },
            { x: 2, y: 55 },
            { x: 3, y: 90 },
            { x: 4, y: 60 }
          ],
          description: 'Chart data points',
          required: true
        },
        {
          name: 'lineColor',
          type: 'color',
          defaultValue: '#3B82F6',
          description: 'Line color',
          required: false
        },
        {
          name: 'pointColor',
          type: 'color',
          defaultValue: '#1D4ED8',
          description: 'Data point color',
          required: false
        },
        {
          name: 'strokeWidth',
          type: 'number',
          defaultValue: 2,
          description: 'Line stroke width',
          required: false,
          constraints: { min: 1, max: 8 }
        },
        {
          name: 'showPoints',
          type: 'boolean',
          defaultValue: true,
          description: 'Whether to show data points',
          required: false
        }
      ],
      document: {
        viewBox: { x: 0, y: 0, width: 400, height: 300 },
        elements: [] // Would be dynamically generated based on data
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
    };
  }

  // ===== PATTERN TEMPLATES =====

  /**
   * Register pattern templates
   */
  private registerPatternTemplates(): void {
    // Grid pattern template
    this.templateEngine.registerTemplate(this.createGridPatternTemplate());
    
    // Dots pattern template
    this.templateEngine.registerTemplate(this.createDotsPatternTemplate());
    
    // Stripes pattern template
    this.templateEngine.registerTemplate(this.createStripesPatternTemplate());
  }

  private createGridPatternTemplate(): SvgTemplate {
    return {
      id: 'pattern-grid',
      name: 'Grid Pattern',
      description: 'Customizable grid pattern for backgrounds',
      version: '1.0.0',
      author: 'SVG Template Factory',
      tags: ['pattern', 'grid', 'background', 'decoration'],
      variables: [
        {
          name: 'gridSize',
          type: 'number',
          defaultValue: 20,
          description: 'Grid cell size',
          required: false,
          constraints: { min: 5, max: 100 }
        },
        {
          name: 'strokeColor',
          type: 'color',
          defaultValue: '#E5E7EB',
          description: 'Grid line color',
          required: false
        },
        {
          name: 'strokeWidth',
          type: 'number',
          defaultValue: 1,
          description: 'Grid line width',
          required: false,
          constraints: { min: 0.5, max: 5 }
        },
        {
          name: 'width',
          type: 'number',
          defaultValue: 400,
          description: 'Pattern width',
          required: false,
          constraints: { min: 100, max: 1000 }
        },
        {
          name: 'height',
          type: 'number',
          defaultValue: 300,
          description: 'Pattern height',
          required: false,
          constraints: { min: 100, max: 1000 }
        }
      ],
      document: {
        viewBox: { x: 0, y: 0, width: 400, height: 300 },
        elements: [] // Would be dynamically generated based on gridSize
      },
      metadata: {
        category: 'Patterns',
        complexity: 'simple',
        dimensions: { width: 400, height: 300 },
        createdAt: new Date(),
        updatedAt: new Date(),
        usage: {
          totalUses: 0,
          popularVariations: {}
        }
      }
    };
  }

  private createDotsPatternTemplate(): SvgTemplate {
    return {
      id: 'pattern-dots',
      name: 'Dots Pattern',
      description: 'Customizable dots pattern for backgrounds',
      version: '1.0.0',
      author: 'SVG Template Factory',
      tags: ['pattern', 'dots', 'background', 'decoration'],
      variables: [
        {
          name: 'dotSize',
          type: 'number',
          defaultValue: 3,
          description: 'Dot radius',
          required: false,
          constraints: { min: 1, max: 20 }
        },
        {
          name: 'spacing',
          type: 'number',
          defaultValue: 20,
          description: 'Spacing between dots',
          required: false,
          constraints: { min: 5, max: 100 }
        },
        {
          name: 'dotColor',
          type: 'color',
          defaultValue: '#D1D5DB',
          description: 'Dot color',
          required: false
        },
        {
          name: 'width',
          type: 'number',
          defaultValue: 400,
          description: 'Pattern width',
          required: false,
          constraints: { min: 100, max: 1000 }
        },
        {
          name: 'height',
          type: 'number',
          defaultValue: 300,
          description: 'Pattern height',
          required: false,
          constraints: { min: 100, max: 1000 }
        }
      ],
      document: {
        viewBox: { x: 0, y: 0, width: 400, height: 300 },
        elements: [] // Would be dynamically generated based on spacing and dotSize
      },
      metadata: {
        category: 'Patterns',
        complexity: 'simple',
        dimensions: { width: 400, height: 300 },
        createdAt: new Date(),
        updatedAt: new Date(),
        usage: {
          totalUses: 0,
          popularVariations: {}
        }
      }
    };
  }

  private createStripesPatternTemplate(): SvgTemplate {
    return {
      id: 'pattern-stripes',
      name: 'Stripes Pattern',
      description: 'Customizable stripes pattern for backgrounds',
      version: '1.0.0',
      author: 'SVG Template Factory',
      tags: ['pattern', 'stripes', 'background', 'decoration'],
      variables: [
        {
          name: 'stripeWidth',
          type: 'number',
          defaultValue: 10,
          description: 'Stripe width',
          required: false,
          constraints: { min: 2, max: 50 }
        },
        {
          name: 'direction',
          type: 'string',
          defaultValue: 'horizontal',
          description: 'Stripe direction',
          required: false,
          constraints: {
            enumValues: ['horizontal', 'vertical', 'diagonal']
          }
        },
        {
          name: 'color1',
          type: 'color',
          defaultValue: '#F3F4F6',
          description: 'First stripe color',
          required: false
        },
        {
          name: 'color2',
          type: 'color',
          defaultValue: '#E5E7EB',
          description: 'Second stripe color',
          required: false
        },
        {
          name: 'width',
          type: 'number',
          defaultValue: 400,
          description: 'Pattern width',
          required: false,
          constraints: { min: 100, max: 1000 }
        },
        {
          name: 'height',
          type: 'number',
          defaultValue: 300,
          description: 'Pattern height',
          required: false,
          constraints: { min: 100, max: 1000 }
        }
      ],
      document: {
        viewBox: { x: 0, y: 0, width: 400, height: 300 },
        elements: [] // Would be dynamically generated based on stripeWidth and direction
      },
      metadata: {
        category: 'Patterns',
        complexity: 'simple',
        dimensions: { width: 400, height: 300 },
        createdAt: new Date(),
        updatedAt: new Date(),
        usage: {
          totalUses: 0,
          popularVariations: {}
        }
      }
    };
  }

  // ===== LOGO TEMPLATES =====

  /**
   * Register logo templates
   */
  private registerLogoTemplates(): void {
    // Simple logo template
    this.templateEngine.registerTemplate(this.createSimpleLogoTemplate());
    
    // Badge logo template
    this.templateEngine.registerTemplate(this.createBadgeLogoTemplate());
  }

  private createSimpleLogoTemplate(): SvgTemplate {
    return {
      id: 'logo-simple',
      name: 'Simple Logo',
      description: 'Simple text-based logo with customizable styling',
      version: '1.0.0',
      author: 'SVG Template Factory',
      tags: ['logo', 'text', 'branding', 'simple'],
      variables: [
        {
          name: 'text',
          type: 'string',
          defaultValue: 'LOGO',
          description: 'Logo text',
          required: true
        },
        {
          name: 'fontSize',
          type: 'number',
          defaultValue: 32,
          description: 'Font size',
          required: false,
          constraints: { min: 12, max: 72 }
        },
        {
          name: 'fontFamily',
          type: 'string',
          defaultValue: 'Arial, sans-serif',
          description: 'Font family',
          required: false
        },
        {
          name: 'textColor',
          type: 'color',
          defaultValue: '#1F2937',
          description: 'Text color',
          required: false
        },
        {
          name: 'backgroundColor',
          type: 'color',
          defaultValue: 'transparent',
          description: 'Background color',
          required: false
        }
      ],
      document: {
        viewBox: { x: 0, y: 0, width: 200, height: 60 },
        elements: [
          {
            type: 'text',
            x: 100,
            y: 40,
            content: '{{text}}',
            style: {
              fontFamily: '{{fontFamily}}',
              fontSize: 32,
              fill: '{{textColor}}',
              textAnchor: 'middle',
              dominantBaseline: 'middle'
            }
          }
        ]
      },
      metadata: {
        category: 'Logos',
        complexity: 'simple',
        dimensions: { width: 200, height: 60 },
        createdAt: new Date(),
        updatedAt: new Date(),
        usage: {
          totalUses: 0,
          popularVariations: {}
        }
      }
    };
  }

  private createBadgeLogoTemplate(): SvgTemplate {
    return {
      id: 'logo-badge',
      name: 'Badge Logo',
      description: 'Badge-style logo with background shape and text',
      version: '1.0.0',
      author: 'SVG Template Factory',
      tags: ['logo', 'badge', 'branding', 'shape'],
      variables: [
        {
          name: 'text',
          type: 'string',
          defaultValue: 'BADGE',
          description: 'Badge text',
          required: true
        },
        {
          name: 'shape',
          type: 'string',
          defaultValue: 'circle',
          description: 'Badge shape',
          required: false,
          constraints: {
            enumValues: ['circle', 'square', 'hexagon']
          }
        },
        {
          name: 'backgroundColor',
          type: 'color',
          defaultValue: '#3B82F6',
          description: 'Background color',
          required: false
        },
        {
          name: 'textColor',
          type: 'color',
          defaultValue: '#FFFFFF',
          description: 'Text color',
          required: false
        },
        {
          name: 'size',
          type: 'number',
          defaultValue: 100,
          description: 'Badge size',
          required: false,
          constraints: { min: 50, max: 200 }
        }
      ],
      document: {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [
          {
            type: 'circle',
            cx: 50,
            cy: 50,
            r: 45,
            style: {
              fill: '{{backgroundColor}}',
              stroke: 'none'
            }
          },
          {
            type: 'text',
            x: 50,
            y: 50,
            content: '{{text}}',
            style: {
              fontFamily: 'Arial, sans-serif',
              fontSize: 16,
              fill: '{{textColor}}',
              textAnchor: 'middle',
              dominantBaseline: 'middle',
              fontWeight: 'bold'
            }
          }
        ]
      },
      metadata: {
        category: 'Logos',
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
  }

  // ===== DECORATION TEMPLATES =====

  /**
   * Register decoration templates
   */
  private registerDecorationTemplates(): void {
    // Border decoration template
    this.templateEngine.registerTemplate(this.createBorderDecorationTemplate());
    
    // Divider template
    this.templateEngine.registerTemplate(this.createDividerTemplate());
  }

  private createBorderDecorationTemplate(): SvgTemplate {
    return {
      id: 'decoration-border',
      name: 'Border Decoration',
      description: 'Decorative border with customizable style and corners',
      version: '1.0.0',
      author: 'SVG Template Factory',
      tags: ['decoration', 'border', 'frame', 'ornament'],
      variables: [
        {
          name: 'width',
          type: 'number',
          defaultValue: 300,
          description: 'Border width',
          required: false,
          constraints: { min: 100, max: 800 }
        },
        {
          name: 'height',
          type: 'number',
          defaultValue: 200,
          description: 'Border height',
          required: false,
          constraints: { min: 100, max: 600 }
        },
        {
          name: 'strokeColor',
          type: 'color',
          defaultValue: '#6B7280',
          description: 'Border color',
          required: false
        },
        {
          name: 'strokeWidth',
          type: 'number',
          defaultValue: 2,
          description: 'Border width',
          required: false,
          constraints: { min: 1, max: 10 }
        },
        {
          name: 'cornerRadius',
          type: 'number',
          defaultValue: 10,
          description: 'Corner radius',
          required: false,
          constraints: { min: 0, max: 50 }
        }
      ],
      document: {
        viewBox: { x: 0, y: 0, width: 300, height: 200 },
        elements: [
          {
            type: 'rect',
            x: 10,
            y: 10,
            width: 280,
            height: 180,
            rx: 10,
            ry: 10,
            style: {
              fill: 'none',
              stroke: '{{strokeColor}}',
              strokeWidth: 2
            }
          }
        ]
      },
      metadata: {
        category: 'Decorations',
        complexity: 'simple',
        dimensions: { width: 300, height: 200 },
        createdAt: new Date(),
        updatedAt: new Date(),
        usage: {
          totalUses: 0,
          popularVariations: {}
        }
      }
    };
  }

  private createDividerTemplate(): SvgTemplate {
    return {
      id: 'decoration-divider',
      name: 'Divider',
      description: 'Decorative divider line with optional center ornament',
      version: '1.0.0',
      author: 'SVG Template Factory',
      tags: ['decoration', 'divider', 'separator', 'line'],
      variables: [
        {
          name: 'width',
          type: 'number',
          defaultValue: 200,
          description: 'Divider width',
          required: false,
          constraints: { min: 50, max: 500 }
        },
        {
          name: 'lineColor',
          type: 'color',
          defaultValue: '#D1D5DB',
          description: 'Line color',
          required: false
        },
        {
          name: 'strokeWidth',
          type: 'number',
          defaultValue: 1,
          description: 'Line width',
          required: false,
          constraints: { min: 0.5, max: 5 }
        },
        {
          name: 'centerOrnament',
          type: 'boolean',
          defaultValue: true,
          description: 'Whether to include center ornament',
          required: false
        }
      ],
      document: {
        viewBox: { x: 0, y: 0, width: 200, height: 20 },
        elements: [
          {
            type: 'line',
            x1: 0,
            y1: 10,
            x2: 200,
            y2: 10,
            style: {
              stroke: '{{lineColor}}',
              strokeWidth: 1
            }
          }
        ]
      },
      metadata: {
        category: 'Decorations',
        complexity: 'simple',
        dimensions: { width: 200, height: 20 },
        createdAt: new Date(),
        updatedAt: new Date(),
        usage: {
          totalUses: 0,
          popularVariations: {}
        }
      }
    };
  }
}
