/**
 * SVG Basic Shape Generators
 *
 * Provides factory functions for creating basic SVG shapes with intelligent defaults,
 * parameter validation, and optimized configurations for common use cases.
 */
import { CircleElement, RectElement, LineElement, PathElement, TextElement, GroupElement, SvgAnyElement } from '../../types/svg.js';
export interface BaseShapeOptions {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    id?: string;
    className?: string;
}
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
export type PathCommand = {
    type: 'M';
    x: number;
    y: number;
} | {
    type: 'L';
    x: number;
    y: number;
} | {
    type: 'C';
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x: number;
    y: number;
} | {
    type: 'Q';
    x1: number;
    y1: number;
    x: number;
    y: number;
} | {
    type: 'A';
    rx: number;
    ry: number;
    rotation: number;
    largeArc: boolean;
    sweep: boolean;
    x: number;
    y: number;
} | {
    type: 'Z';
};
export interface PathOptions extends BaseShapeOptions {
    commands: PathCommand[];
}
/**
 * Basic Shape Generator - Factory for creating SVG elements
 */
export declare class BasicShapeGenerator {
    /**
     * Create a circle element
     */
    static createCircle(options: CircleOptions): CircleElement;
    /**
     * Create a rectangle element
     */
    static createRect(options: RectOptions): RectElement;
    /**
     * Create a line element
     */
    static createLine(options: LineOptions): LineElement;
    /**
     * Create a text element
     */
    static createText(options: TextOptions): TextElement;
    /**
     * Create a group element
     */
    static createGroup(options: GroupOptions): GroupElement;
    /**
     * Create a path element from commands
     */
    static createPath(options: PathOptions): PathElement;
    /**
     * Create a circle at origin with default styling
     */
    static createDefaultCircle(radius: number): CircleElement;
    /**
     * Create a rectangle at origin with default styling
     */
    static createDefaultRect(width: number, height: number): RectElement;
    /**
     * Create a horizontal line
     */
    static createHorizontalLine(x1: number, x2: number, y: number): LineElement;
    /**
     * Create a vertical line
     */
    static createVerticalLine(x: number, y1: number, y2: number): LineElement;
    /**
     * Create a square (special case of rectangle)
     */
    static createSquare(x: number, y: number, size: number, options?: Partial<BaseShapeOptions>): RectElement;
    /**
     * Create an ellipse using path commands
     */
    static createEllipse(cx: number, cy: number, rx: number, ry: number, options?: Partial<BaseShapeOptions>): PathElement;
    /**
     * Create a polygon using path commands
     */
    static createPolygon(points: Array<{
        x: number;
        y: number;
    }>, options?: Partial<BaseShapeOptions>): PathElement;
    /**
     * Create a regular polygon (e.g., triangle, pentagon, hexagon)
     */
    static createRegularPolygon(cx: number, cy: number, radius: number, sides: number, options?: Partial<BaseShapeOptions>): PathElement;
    /**
     * Create a star shape
     */
    static createStar(cx: number, cy: number, outerRadius: number, innerRadius: number, points: number, options?: Partial<BaseShapeOptions>): PathElement;
    /**
     * Convert path commands to SVG path string
     */
    private static pathCommandsToString;
    /**
     * Calculate bounding box for a set of points
     */
    static calculateBoundingBox(points: Array<{
        x: number;
        y: number;
    }>): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
//# sourceMappingURL=BasicShapeGenerator.d.ts.map