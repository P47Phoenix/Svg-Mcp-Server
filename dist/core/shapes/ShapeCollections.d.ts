/**
 * SVG Shape Collections
 *
 * Pre-defined collections of shapes for common use cases like diagrams,
 * flowcharts, icons, and geometric patterns.
 */
import { BaseShapeOptions } from './BasicShapeGenerator.js';
import { SvgAnyElement } from '../../types/svg.js';
export interface ShapeCollection {
    name: string;
    description: string;
    shapes: SvgAnyElement[];
    boundingBox: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
/**
 * Shape Collections - Pre-defined shape sets
 */
export declare class ShapeCollections {
    /**
     * Create basic geometric shapes collection
     */
    static createGeometricShapes(options?: Partial<BaseShapeOptions>): ShapeCollection;
    /**
     * Create flowchart elements collection
     */
    static createFlowchartElements(options?: Partial<BaseShapeOptions>): ShapeCollection;
    /**
     * Create arrow collection
     */
    static createArrows(options?: Partial<BaseShapeOptions>): ShapeCollection;
    /**
     * Create star collection
     */
    static createStars(options?: Partial<BaseShapeOptions>): ShapeCollection;
    /**
     * Create basic UI elements collection
     */
    static createUIElements(options?: Partial<BaseShapeOptions>): ShapeCollection;
    /**
     * Create grid pattern
     */
    static createGrid(startX: number, startY: number, cellWidth: number, cellHeight: number, rows: number, cols: number, options?: Partial<BaseShapeOptions>): ShapeCollection;
    /**
     * Create coordinate system (axes)
     */
    static createCoordinateSystem(centerX: number, centerY: number, width: number, height: number, options?: Partial<BaseShapeOptions>): ShapeCollection;
    /**
     * Get all available collections
     */
    static getAllCollections(): string[];
    /**
     * Get collection by name
     */
    static getCollection(name: string, options?: Partial<BaseShapeOptions>): ShapeCollection | null;
}
//# sourceMappingURL=ShapeCollections.d.ts.map