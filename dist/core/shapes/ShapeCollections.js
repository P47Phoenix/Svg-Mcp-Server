/**
 * SVG Shape Collections
 *
 * Pre-defined collections of shapes for common use cases like diagrams,
 * flowcharts, icons, and geometric patterns.
 */
import { BasicShapeGenerator } from './BasicShapeGenerator.js';
/**
 * Shape Collections - Pre-defined shape sets
 */
export class ShapeCollections {
    /**
     * Create basic geometric shapes collection
     */
    static createGeometricShapes(options) {
        const shapes = [
            // Circle
            BasicShapeGenerator.createCircle({
                cx: 50,
                cy: 50,
                r: 30,
                fill: 'none',
                stroke: 'black',
                strokeWidth: 2,
                ...options
            }),
            // Rectangle
            BasicShapeGenerator.createRect({
                x: 120,
                y: 20,
                width: 60,
                height: 60,
                fill: 'none',
                stroke: 'black',
                strokeWidth: 2,
                ...options
            }),
            // Triangle
            BasicShapeGenerator.createRegularPolygon(250, 50, 30, 3, {
                fill: 'none',
                stroke: 'black',
                strokeWidth: 2,
                ...options
            }),
            // Pentagon
            BasicShapeGenerator.createRegularPolygon(350, 50, 30, 5, {
                fill: 'none',
                stroke: 'black',
                strokeWidth: 2,
                ...options
            }),
            // Hexagon
            BasicShapeGenerator.createRegularPolygon(450, 50, 30, 6, {
                fill: 'none',
                stroke: 'black',
                strokeWidth: 2,
                ...options
            })
        ];
        return {
            name: 'Geometric Shapes',
            description: 'Basic geometric shapes including circle, rectangle, and regular polygons',
            shapes,
            boundingBox: { x: 20, y: 20, width: 460, height: 60 }
        };
    }
    /**
     * Create flowchart elements collection
     */
    static createFlowchartElements(options) {
        const shapes = [
            // Start/End (Rounded Rectangle)
            BasicShapeGenerator.createRect({
                x: 20,
                y: 20,
                width: 100,
                height: 40,
                rx: 20,
                ry: 20,
                fill: 'lightblue',
                stroke: 'navy',
                strokeWidth: 2,
                ...options
            }),
            // Process (Rectangle)
            BasicShapeGenerator.createRect({
                x: 150,
                y: 20,
                width: 100,
                height: 40,
                fill: 'lightgreen',
                stroke: 'darkgreen',
                strokeWidth: 2,
                ...options
            }),
            // Decision (Diamond)
            BasicShapeGenerator.createRegularPolygon(340, 40, 30, 4, {
                fill: 'lightyellow',
                stroke: 'orange',
                strokeWidth: 2,
                ...options
            }),
            // Document (Rectangle with wave bottom)
            BasicShapeGenerator.createRect({
                x: 400,
                y: 20,
                width: 80,
                height: 40,
                fill: 'lightcoral',
                stroke: 'darkred',
                strokeWidth: 2,
                ...options
            }),
            // Arrow (pointing right)
            BasicShapeGenerator.createPolygon([
                { x: 520, y: 20 },
                { x: 580, y: 20 },
                { x: 600, y: 40 },
                { x: 580, y: 60 },
                { x: 520, y: 60 },
                { x: 540, y: 40 }
            ], {
                fill: 'lightgray',
                stroke: 'black',
                strokeWidth: 2,
                ...options
            })
        ];
        return {
            name: 'Flowchart Elements',
            description: 'Common flowchart symbols including start/end, process, decision, and connector shapes',
            shapes,
            boundingBox: { x: 20, y: 20, width: 580, height: 40 }
        };
    }
    /**
     * Create arrow collection
     */
    static createArrows(options) {
        const shapes = [
            // Right arrow
            BasicShapeGenerator.createPolygon([
                { x: 20, y: 30 },
                { x: 60, y: 30 },
                { x: 60, y: 20 },
                { x: 80, y: 40 },
                { x: 60, y: 60 },
                { x: 60, y: 50 },
                { x: 20, y: 50 }
            ], {
                fill: 'black',
                ...options
            }),
            // Left arrow
            BasicShapeGenerator.createPolygon([
                { x: 120, y: 30 },
                { x: 160, y: 30 },
                { x: 160, y: 20 },
                { x: 180, y: 40 },
                { x: 160, y: 60 },
                { x: 160, y: 50 },
                { x: 120, y: 50 },
                { x: 100, y: 40 }
            ], {
                fill: 'black',
                ...options
            }),
            // Up arrow
            BasicShapeGenerator.createPolygon([
                { x: 230, y: 60 },
                { x: 230, y: 30 },
                { x: 220, y: 30 },
                { x: 240, y: 10 },
                { x: 260, y: 30 },
                { x: 250, y: 30 },
                { x: 250, y: 60 }
            ], {
                fill: 'black',
                ...options
            }),
            // Down arrow
            BasicShapeGenerator.createPolygon([
                { x: 300, y: 20 },
                { x: 300, y: 50 },
                { x: 290, y: 50 },
                { x: 310, y: 70 },
                { x: 330, y: 50 },
                { x: 320, y: 50 },
                { x: 320, y: 20 }
            ], {
                fill: 'black',
                ...options
            })
        ];
        return {
            name: 'Arrows',
            description: 'Directional arrows pointing up, down, left, and right',
            shapes,
            boundingBox: { x: 20, y: 10, width: 310, height: 60 }
        };
    }
    /**
     * Create star collection
     */
    static createStars(options) {
        const shapes = [
            // 5-point star
            BasicShapeGenerator.createStar(50, 50, 30, 15, 5, {
                fill: 'gold',
                stroke: 'orange',
                strokeWidth: 2,
                ...options
            }),
            // 6-point star
            BasicShapeGenerator.createStar(150, 50, 30, 15, 6, {
                fill: 'silver',
                stroke: 'gray',
                strokeWidth: 2,
                ...options
            }),
            // 8-point star
            BasicShapeGenerator.createStar(250, 50, 30, 15, 8, {
                fill: 'lightblue',
                stroke: 'blue',
                strokeWidth: 2,
                ...options
            })
        ];
        return {
            name: 'Stars',
            description: 'Star shapes with different numbers of points',
            shapes,
            boundingBox: { x: 20, y: 20, width: 260, height: 60 }
        };
    }
    /**
     * Create basic UI elements collection
     */
    static createUIElements(options) {
        const shapes = [
            // Button
            BasicShapeGenerator.createRect({
                x: 20,
                y: 20,
                width: 80,
                height: 30,
                rx: 5,
                ry: 5,
                fill: 'lightblue',
                stroke: 'blue',
                strokeWidth: 1,
                ...options
            }),
            // Text field
            BasicShapeGenerator.createRect({
                x: 120,
                y: 20,
                width: 120,
                height: 30,
                fill: 'white',
                stroke: 'gray',
                strokeWidth: 1,
                ...options
            }),
            // Checkbox (unchecked)
            BasicShapeGenerator.createRect({
                x: 260,
                y: 25,
                width: 20,
                height: 20,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 1,
                ...options
            }),
            // Radio button (unchecked)
            BasicShapeGenerator.createCircle({
                cx: 310,
                cy: 35,
                r: 10,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 1,
                ...options
            }),
            // Progress bar background
            BasicShapeGenerator.createRect({
                x: 340,
                y: 30,
                width: 100,
                height: 10,
                rx: 5,
                ry: 5,
                fill: 'lightgray',
                stroke: 'gray',
                strokeWidth: 1,
                ...options
            }),
            // Progress bar fill
            BasicShapeGenerator.createRect({
                x: 342,
                y: 32,
                width: 60,
                height: 6,
                rx: 3,
                ry: 3,
                fill: 'blue',
                ...options
            })
        ];
        return {
            name: 'UI Elements',
            description: 'Basic user interface elements like buttons, text fields, and form controls',
            shapes,
            boundingBox: { x: 20, y: 20, width: 420, height: 30 }
        };
    }
    /**
     * Create grid pattern
     */
    static createGrid(startX, startY, cellWidth, cellHeight, rows, cols, options) {
        const shapes = [];
        // Create horizontal lines
        for (let i = 0; i <= rows; i++) {
            const y = startY + i * cellHeight;
            shapes.push(BasicShapeGenerator.createLine({
                x1: startX,
                y1: y,
                x2: startX + cols * cellWidth,
                y2: y,
                stroke: 'lightgray',
                strokeWidth: 1,
                ...options
            }));
        }
        // Create vertical lines
        for (let j = 0; j <= cols; j++) {
            const x = startX + j * cellWidth;
            shapes.push(BasicShapeGenerator.createLine({
                x1: x,
                y1: startY,
                x2: x,
                y2: startY + rows * cellHeight,
                stroke: 'lightgray',
                strokeWidth: 1,
                ...options
            }));
        }
        return {
            name: 'Grid',
            description: `${rows}x${cols} grid pattern`,
            shapes,
            boundingBox: {
                x: startX,
                y: startY,
                width: cols * cellWidth,
                height: rows * cellHeight
            }
        };
    }
    /**
     * Create coordinate system (axes)
     */
    static createCoordinateSystem(centerX, centerY, width, height, options) {
        const shapes = [
            // X-axis
            BasicShapeGenerator.createLine({
                x1: centerX - width / 2,
                y1: centerY,
                x2: centerX + width / 2,
                y2: centerY,
                stroke: 'black',
                strokeWidth: 2,
                ...options
            }),
            // Y-axis
            BasicShapeGenerator.createLine({
                x1: centerX,
                y1: centerY - height / 2,
                x2: centerX,
                y2: centerY + height / 2,
                stroke: 'black',
                strokeWidth: 2,
                ...options
            }),
            // X-axis arrow
            BasicShapeGenerator.createPolygon([
                { x: centerX + width / 2, y: centerY },
                { x: centerX + width / 2 - 10, y: centerY - 5 },
                { x: centerX + width / 2 - 10, y: centerY + 5 }
            ], {
                fill: 'black',
                ...options
            }),
            // Y-axis arrow
            BasicShapeGenerator.createPolygon([
                { x: centerX, y: centerY - height / 2 },
                { x: centerX - 5, y: centerY - height / 2 + 10 },
                { x: centerX + 5, y: centerY - height / 2 + 10 }
            ], {
                fill: 'black',
                ...options
            })
        ];
        return {
            name: 'Coordinate System',
            description: 'X-Y coordinate system with axes and arrows',
            shapes,
            boundingBox: {
                x: centerX - width / 2,
                y: centerY - height / 2,
                width,
                height
            }
        };
    }
    /**
     * Get all available collections
     */
    static getAllCollections() {
        return [
            'geometricShapes',
            'flowchartElements',
            'arrows',
            'stars',
            'uiElements'
        ];
    }
    /**
     * Get collection by name
     */
    static getCollection(name, options) {
        switch (name.toLowerCase()) {
            case 'geometric':
            case 'geometricshapes':
                return this.createGeometricShapes(options);
            case 'flowchart':
            case 'flowchartelements':
                return this.createFlowchartElements(options);
            case 'arrows':
                return this.createArrows(options);
            case 'stars':
                return this.createStars(options);
            case 'ui':
            case 'uielements':
                return this.createUIElements(options);
            default:
                return null;
        }
    }
}
//# sourceMappingURL=ShapeCollections.js.map