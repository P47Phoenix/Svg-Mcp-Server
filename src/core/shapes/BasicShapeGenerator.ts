/**
 * SVG Basic Shape Generators
 * 
 * Provides factory functions for creating basic SVG shapes with intelligent defaults,
 * parameter validation, and optimized configurations for common use cases.
 */

import { 
  CircleElement, 
  RectElement, 
  LineElement, 
  PathElement, 
  TextElement, 
  GroupElement,
  SvgAnyElement 
} from '../../types/svg.js';

// Common styling options for all shapes
export interface BaseShapeOptions {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  id?: string;
  className?: string;
}

// Shape-specific options interfaces
export interface CircleOptions extends BaseShapeOptions {
  cx: number;
  cy: number;
  r: number;
}

export interface RectOptions extends BaseShapeOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  ry?: number;
}

export interface LineOptions extends BaseShapeOptions {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface TextOptions extends BaseShapeOptions {
  x: number;
  y: number;
  content: string;
  fontSize?: number;
  fontFamily?: string;
  textAnchor?: 'start' | 'middle' | 'end';
}

export interface GroupOptions extends BaseShapeOptions {
  children: SvgAnyElement[];
  transform?: string;
}

// Path command types for path generation
export type PathCommand = 
  | { type: 'M', x: number, y: number }  // Move to
  | { type: 'L', x: number, y: number }  // Line to
  | { type: 'C', x1: number, y1: number, x2: number, y2: number, x: number, y: number }  // Cubic curve
  | { type: 'Q', x1: number, y1: number, x: number, y: number }  // Quadratic curve
  | { type: 'A', rx: number, ry: number, rotation: number, largeArc: boolean, sweep: boolean, x: number, y: number }  // Arc
  | { type: 'Z' };  // Close path

export interface PathOptions extends BaseShapeOptions {
  commands: PathCommand[];
}

/**
 * Basic Shape Generator - Factory for creating SVG elements
 */
export class BasicShapeGenerator {
  
  /**
   * Create a circle element
   */
  static createCircle(options: CircleOptions): CircleElement {
    if (options.r <= 0) {
      throw new Error('Circle radius must be positive');
    }

    return {
      type: 'circle',
      cx: options.cx,
      cy: options.cy,
      r: options.r,
      ...(options.fill && { fill: options.fill }),
      ...(options.stroke && { stroke: options.stroke }),
      ...(options.strokeWidth && { 'stroke-width': options.strokeWidth }),
      ...(options.opacity && { opacity: options.opacity }),
      ...(options.id && { id: options.id }),
      ...(options.className && { class: options.className })
    };
  }

  /**
   * Create a rectangle element
   */
  static createRect(options: RectOptions): RectElement {
    if (options.width <= 0 || options.height <= 0) {
      throw new Error('Rectangle width and height must be positive');
    }

    return {
      type: 'rect',
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
      ...(options.rx && { rx: options.rx }),
      ...(options.ry && { ry: options.ry }),
      ...(options.fill && { fill: options.fill }),
      ...(options.stroke && { stroke: options.stroke }),
      ...(options.strokeWidth && { 'stroke-width': options.strokeWidth }),
      ...(options.opacity && { opacity: options.opacity }),
      ...(options.id && { id: options.id }),
      ...(options.className && { class: options.className })
    };
  }

  /**
   * Create a line element
   */
  static createLine(options: LineOptions): LineElement {
    return {
      type: 'line',
      x1: options.x1,
      y1: options.y1,
      x2: options.x2,
      y2: options.y2,
      ...(options.stroke && { stroke: options.stroke }),
      ...(options.strokeWidth && { 'stroke-width': options.strokeWidth }),
      ...(options.opacity && { opacity: options.opacity }),
      ...(options.id && { id: options.id }),
      ...(options.className && { class: options.className })
    };
  }

  /**
   * Create a text element
   */
  static createText(options: TextOptions): TextElement {
    if (!options.content.trim()) {
      throw new Error('Text content cannot be empty');
    }

    return {
      type: 'text',
      x: options.x,
      y: options.y,
      content: options.content,
      ...(options.fontSize && { 'font-size': options.fontSize }),
      ...(options.fontFamily && { 'font-family': options.fontFamily }),
      ...(options.textAnchor && { 'text-anchor': options.textAnchor }),
      ...(options.fill && { fill: options.fill }),
      ...(options.stroke && { stroke: options.stroke }),
      ...(options.strokeWidth && { 'stroke-width': options.strokeWidth }),
      ...(options.opacity && { opacity: options.opacity }),
      ...(options.id && { id: options.id }),
      ...(options.className && { class: options.className })
    };
  }

  /**
   * Create a group element
   */
  static createGroup(options: GroupOptions): GroupElement {
    if (!options.children || options.children.length === 0) {
      throw new Error('Group must contain at least one child element');
    }

    return {
      type: 'group',
      children: options.children,
      ...(options.transform && { transform: options.transform }),
      ...(options.fill && { fill: options.fill }),
      ...(options.stroke && { stroke: options.stroke }),
      ...(options.strokeWidth && { 'stroke-width': options.strokeWidth }),
      ...(options.opacity && { opacity: options.opacity }),
      ...(options.id && { id: options.id }),
      ...(options.className && { class: options.className })
    };
  }

  /**
   * Create a path element from commands
   */
  static createPath(options: PathOptions): PathElement {
    if (!options.commands || options.commands.length === 0) {
      throw new Error('Path must contain at least one command');
    }

    const d = this.pathCommandsToString(options.commands);

    return {
      type: 'path',
      d,
      ...(options.fill && { fill: options.fill }),
      ...(options.stroke && { stroke: options.stroke }),
      ...(options.strokeWidth && { 'stroke-width': options.strokeWidth }),
      ...(options.opacity && { opacity: options.opacity }),
      ...(options.id && { id: options.id }),
      ...(options.className && { class: options.className })
    };
  }

  // Preset shape generators for common patterns

  /**
   * Create a circle at origin with default styling
   */
  static createDefaultCircle(radius: number): CircleElement {
    return this.createCircle({
      cx: 0,
      cy: 0,
      r: radius,
      fill: 'none',
      stroke: 'black',
      strokeWidth: 1
    });
  }

  /**
   * Create a rectangle at origin with default styling
   */
  static createDefaultRect(width: number, height: number): RectElement {
    return this.createRect({
      x: 0,
      y: 0,
      width,
      height,
      fill: 'none',
      stroke: 'black',
      strokeWidth: 1
    });
  }

  /**
   * Create a horizontal line
   */
  static createHorizontalLine(x1: number, x2: number, y: number): LineElement {
    return this.createLine({
      x1,
      y1: y,
      x2,
      y2: y,
      stroke: 'black',
      strokeWidth: 1
    });
  }

  /**
   * Create a vertical line
   */
  static createVerticalLine(x: number, y1: number, y2: number): LineElement {
    return this.createLine({
      x1: x,
      y1,
      x2: x,
      y2,
      stroke: 'black',
      strokeWidth: 1
    });
  }

  /**
   * Create a square (special case of rectangle)
   */
  static createSquare(x: number, y: number, size: number, options?: Partial<BaseShapeOptions>): RectElement {
    return this.createRect({
      x,
      y,
      width: size,
      height: size,
      fill: 'none',
      stroke: 'black',
      strokeWidth: 1,
      ...options
    });
  }

  /**
   * Create an ellipse using path commands
   */
  static createEllipse(cx: number, cy: number, rx: number, ry: number, options?: Partial<BaseShapeOptions>): PathElement {
    const commands: PathCommand[] = [
      { type: 'M', x: cx - rx, y: cy },
      { type: 'A', rx, ry, rotation: 0, largeArc: false, sweep: false, x: cx + rx, y: cy },
      { type: 'A', rx, ry, rotation: 0, largeArc: false, sweep: false, x: cx - rx, y: cy },
      { type: 'Z' }
    ];

    return this.createPath({
      commands,
      fill: 'none',
      stroke: 'black',
      strokeWidth: 1,
      ...options
    });
  }

  /**
   * Create a polygon using path commands
   */
  static createPolygon(points: Array<{x: number, y: number}>, options?: Partial<BaseShapeOptions>): PathElement {
    if (points.length < 3) {
      throw new Error('Polygon must have at least 3 points');
    }

    const firstPoint = points[0];
    if (!firstPoint) {
      throw new Error('Polygon must have valid points');
    }

    const commands: PathCommand[] = [
      { type: 'M', x: firstPoint.x, y: firstPoint.y },
      ...points.slice(1).map(point => ({ type: 'L' as const, x: point.x, y: point.y })),
      { type: 'Z' }
    ];

    return this.createPath({
      commands,
      fill: 'none',
      stroke: 'black',
      strokeWidth: 1,
      ...options
    });
  }

  /**
   * Create a regular polygon (e.g., triangle, pentagon, hexagon)
   */
  static createRegularPolygon(
    cx: number, 
    cy: number, 
    radius: number, 
    sides: number, 
    options?: Partial<BaseShapeOptions>
  ): PathElement {
    if (sides < 3) {
      throw new Error('Polygon must have at least 3 sides');
    }

    const points: Array<{x: number, y: number}> = [];
    const angleStep = (2 * Math.PI) / sides;
    
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      points.push({
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle)
      });
    }

    return this.createPolygon(points, options);
  }

  /**
   * Create a star shape
   */
  static createStar(
    cx: number, 
    cy: number, 
    outerRadius: number, 
    innerRadius: number, 
    points: number, 
    options?: Partial<BaseShapeOptions>
  ): PathElement {
    if (points < 3) {
      throw new Error('Star must have at least 3 points');
    }

    const starPoints: Array<{x: number, y: number}> = [];
    const angleStep = Math.PI / points;
    
    for (let i = 0; i < points * 2; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      starPoints.push({
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle)
      });
    }

    return this.createPolygon(starPoints, options);
  }

  // Helper methods

  /**
   * Convert path commands to SVG path string
   */
  private static pathCommandsToString(commands: PathCommand[]): string {
    return commands.map(cmd => {
      switch (cmd.type) {
        case 'M':
          return `M ${cmd.x} ${cmd.y}`;
        case 'L':
          return `L ${cmd.x} ${cmd.y}`;
        case 'C':
          return `C ${cmd.x1} ${cmd.y1} ${cmd.x2} ${cmd.y2} ${cmd.x} ${cmd.y}`;
        case 'Q':
          return `Q ${cmd.x1} ${cmd.y1} ${cmd.x} ${cmd.y}`;
        case 'A':
          return `A ${cmd.rx} ${cmd.ry} ${cmd.rotation} ${cmd.largeArc ? 1 : 0} ${cmd.sweep ? 1 : 0} ${cmd.x} ${cmd.y}`;
        case 'Z':
          return 'Z';
        default:
          throw new Error(`Unknown path command type: ${(cmd as any).type}`);
      }
    }).join(' ');
  }

  /**
   * Calculate bounding box for a set of points
   */
  static calculateBoundingBox(points: Array<{x: number, y: number}>): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    if (points.length === 0) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }

    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
}
