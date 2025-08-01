/**
 * Core type definitions for the SVG MCP Server
 */
import { z } from 'zod';
export interface Point {
    x: number;
    y: number;
}
export interface Size {
    width: number;
    height: number;
}
export interface Rectangle extends Point, Size {
}
export interface ViewBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
export type ColorValue = string;
export type StrokeLineCap = 'butt' | 'round' | 'square';
export type StrokeLineJoin = 'miter' | 'round' | 'bevel';
export type TextAnchor = 'start' | 'middle' | 'end';
export type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | number;
export type FontStyle = 'normal' | 'italic' | 'oblique';
export interface SvgStyle {
    fill?: ColorValue;
    stroke?: ColorValue;
    strokeWidth?: number;
    strokeLinecap?: StrokeLineCap;
    strokeLinejoin?: StrokeLineJoin;
    strokeDasharray?: string;
    opacity?: number;
    fillOpacity?: number;
    strokeOpacity?: number;
}
export interface TextStyle extends SvgStyle {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: FontWeight;
    fontStyle?: FontStyle;
    textAnchor?: TextAnchor;
    dominantBaseline?: string;
}
export interface SvgElement {
    id?: string;
    className?: string;
    style?: SvgStyle;
    transform?: string;
    clipPath?: string;
    mask?: string;
}
export interface CircleElement extends SvgElement {
    type: 'circle';
    cx: number;
    cy: number;
    r: number;
}
export interface RectElement extends SvgElement {
    type: 'rect';
    x: number;
    y: number;
    width: number;
    height: number;
    rx?: number;
    ry?: number;
}
export interface LineElement extends SvgElement {
    type: 'line';
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export interface PathElement extends SvgElement {
    type: 'path';
    d: string;
}
export interface TextElement extends SvgElement {
    type: 'text';
    x: number;
    y: number;
    content: string;
    style?: TextStyle;
}
export interface GroupElement extends SvgElement {
    type: 'group';
    children: SvgAnyElement[];
}
export type SvgAnyElement = CircleElement | RectElement | LineElement | PathElement | TextElement | GroupElement;
export interface SvgDocument {
    viewBox: ViewBox;
    width?: number;
    height?: number;
    title?: string;
    description?: string;
    elements: SvgAnyElement[];
    defs?: SvgDefinition[];
    style?: string;
}
export interface SvgDefinition {
    id: string;
    type: 'linearGradient' | 'radialGradient' | 'pattern' | 'clipPath' | 'mask';
    content: string;
}
export declare const PointSchema: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    x: number;
    y: number;
}, {
    x: number;
    y: number;
}>;
export declare const SizeSchema: z.ZodObject<{
    width: z.ZodNumber;
    height: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    width: number;
    height: number;
}, {
    width: number;
    height: number;
}>;
export declare const ViewBoxSchema: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
    width: z.ZodNumber;
    height: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    x: number;
    y: number;
    width: number;
    height: number;
}, {
    x: number;
    y: number;
    width: number;
    height: number;
}>;
export declare const SvgStyleSchema: z.ZodObject<{
    fill: z.ZodOptional<z.ZodString>;
    stroke: z.ZodOptional<z.ZodString>;
    strokeWidth: z.ZodOptional<z.ZodNumber>;
    strokeLinecap: z.ZodOptional<z.ZodEnum<["butt", "round", "square"]>>;
    strokeLinejoin: z.ZodOptional<z.ZodEnum<["miter", "round", "bevel"]>>;
    strokeDasharray: z.ZodOptional<z.ZodString>;
    opacity: z.ZodOptional<z.ZodNumber>;
    fillOpacity: z.ZodOptional<z.ZodNumber>;
    strokeOpacity: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    fill?: string | undefined;
    stroke?: string | undefined;
    strokeWidth?: number | undefined;
    strokeLinecap?: "butt" | "round" | "square" | undefined;
    strokeLinejoin?: "round" | "miter" | "bevel" | undefined;
    strokeDasharray?: string | undefined;
    opacity?: number | undefined;
    fillOpacity?: number | undefined;
    strokeOpacity?: number | undefined;
}, {
    fill?: string | undefined;
    stroke?: string | undefined;
    strokeWidth?: number | undefined;
    strokeLinecap?: "butt" | "round" | "square" | undefined;
    strokeLinejoin?: "round" | "miter" | "bevel" | undefined;
    strokeDasharray?: string | undefined;
    opacity?: number | undefined;
    fillOpacity?: number | undefined;
    strokeOpacity?: number | undefined;
}>;
export declare const TextStyleSchema: z.ZodObject<{
    fill: z.ZodOptional<z.ZodString>;
    stroke: z.ZodOptional<z.ZodString>;
    strokeWidth: z.ZodOptional<z.ZodNumber>;
    strokeLinecap: z.ZodOptional<z.ZodEnum<["butt", "round", "square"]>>;
    strokeLinejoin: z.ZodOptional<z.ZodEnum<["miter", "round", "bevel"]>>;
    strokeDasharray: z.ZodOptional<z.ZodString>;
    opacity: z.ZodOptional<z.ZodNumber>;
    fillOpacity: z.ZodOptional<z.ZodNumber>;
    strokeOpacity: z.ZodOptional<z.ZodNumber>;
} & {
    fontFamily: z.ZodOptional<z.ZodString>;
    fontSize: z.ZodOptional<z.ZodNumber>;
    fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["normal", "bold", "bolder", "lighter"]>, z.ZodNumber]>>;
    fontStyle: z.ZodOptional<z.ZodEnum<["normal", "italic", "oblique"]>>;
    textAnchor: z.ZodOptional<z.ZodEnum<["start", "middle", "end"]>>;
    dominantBaseline: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fill?: string | undefined;
    stroke?: string | undefined;
    fontFamily?: string | undefined;
    fontSize?: number | undefined;
    fontWeight?: number | "bold" | "normal" | "bolder" | "lighter" | undefined;
    fontStyle?: "normal" | "italic" | "oblique" | undefined;
    textAnchor?: "start" | "middle" | "end" | undefined;
    dominantBaseline?: string | undefined;
    strokeWidth?: number | undefined;
    strokeLinecap?: "butt" | "round" | "square" | undefined;
    strokeLinejoin?: "round" | "miter" | "bevel" | undefined;
    strokeDasharray?: string | undefined;
    opacity?: number | undefined;
    fillOpacity?: number | undefined;
    strokeOpacity?: number | undefined;
}, {
    fill?: string | undefined;
    stroke?: string | undefined;
    fontFamily?: string | undefined;
    fontSize?: number | undefined;
    fontWeight?: number | "bold" | "normal" | "bolder" | "lighter" | undefined;
    fontStyle?: "normal" | "italic" | "oblique" | undefined;
    textAnchor?: "start" | "middle" | "end" | undefined;
    dominantBaseline?: string | undefined;
    strokeWidth?: number | undefined;
    strokeLinecap?: "butt" | "round" | "square" | undefined;
    strokeLinejoin?: "round" | "miter" | "bevel" | undefined;
    strokeDasharray?: string | undefined;
    opacity?: number | undefined;
    fillOpacity?: number | undefined;
    strokeOpacity?: number | undefined;
}>;
export declare class SvgValidationError extends Error {
    readonly details?: unknown | undefined;
    constructor(message: string, details?: unknown | undefined);
}
export declare class SvgRenderError extends Error {
    readonly element?: SvgAnyElement | undefined;
    constructor(message: string, element?: SvgAnyElement | undefined);
}
//# sourceMappingURL=svg.d.ts.map