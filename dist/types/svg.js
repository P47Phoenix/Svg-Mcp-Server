/**
 * Core type definitions for the SVG MCP Server
 */
import { z } from 'zod';
// Zod schemas for validation
export const PointSchema = z.object({
    x: z.number(),
    y: z.number(),
});
export const SizeSchema = z.object({
    width: z.number().positive(),
    height: z.number().positive(),
});
export const ViewBoxSchema = z.object({
    x: z.number(),
    y: z.number(),
    width: z.number().positive(),
    height: z.number().positive(),
});
export const SvgStyleSchema = z.object({
    fill: z.string().optional(),
    stroke: z.string().optional(),
    strokeWidth: z.number().positive().optional(),
    strokeLinecap: z.enum(['butt', 'round', 'square']).optional(),
    strokeLinejoin: z.enum(['miter', 'round', 'bevel']).optional(),
    strokeDasharray: z.string().optional(),
    opacity: z.number().min(0).max(1).optional(),
    fillOpacity: z.number().min(0).max(1).optional(),
    strokeOpacity: z.number().min(0).max(1).optional(),
});
export const TextStyleSchema = SvgStyleSchema.extend({
    fontFamily: z.string().optional(),
    fontSize: z.number().positive().optional(),
    fontWeight: z.union([
        z.enum(['normal', 'bold', 'bolder', 'lighter']),
        z.number()
    ]).optional(),
    fontStyle: z.enum(['normal', 'italic', 'oblique']).optional(),
    textAnchor: z.enum(['start', 'middle', 'end']).optional(),
    dominantBaseline: z.string().optional(),
});
// Error types
export class SvgValidationError extends Error {
    details;
    constructor(message, details) {
        super(message);
        this.details = details;
        this.name = 'SvgValidationError';
    }
}
export class SvgRenderError extends Error {
    element;
    constructor(message, element) {
        super(message);
        this.element = element;
        this.name = 'SvgRenderError';
    }
}
//# sourceMappingURL=svg.js.map