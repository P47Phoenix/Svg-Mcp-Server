/**
 * Core type definitions for the SVG MCP Server
 */

import { z } from 'zod';

// Basic geometric types
export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rectangle extends Point, Size {}

export interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Color and styling types
export type ColorValue = string; // Supports hex, rgb, rgba, hsl, named colors
export type StrokeLineCap = 'butt' | 'round' | 'square';
export type StrokeLineJoin = 'miter' | 'round' | 'bevel';
export type TextAnchor = 'start' | 'middle' | 'end';
export type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | number;
export type FontStyle = 'normal' | 'italic' | 'oblique';

// SVG style properties
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

// Text style properties
export interface TextStyle extends SvgStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  textAnchor?: TextAnchor;
  dominantBaseline?: string;
}

// SVG element base interface
export interface SvgElement {
  id?: string;
  className?: string;
  style?: SvgStyle;
  transform?: string;
  clipPath?: string;
  mask?: string;
}

// Shape interfaces
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

// Union type for all SVG elements
export type SvgAnyElement = 
  | CircleElement 
  | RectElement 
  | LineElement 
  | PathElement 
  | TextElement 
  | GroupElement;

// SVG document structure
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

// SVG definitions (gradients, patterns, etc.)
export interface SvgDefinition {
  id: string;
  type: 'linearGradient' | 'radialGradient' | 'pattern' | 'clipPath' | 'mask';
  content: string; // Raw SVG content for the definition
}

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
  constructor(message: string, public readonly details?: unknown) {
    super(message);
    this.name = 'SvgValidationError';
  }
}

export class SvgRenderError extends Error {
  constructor(message: string, public readonly element?: SvgAnyElement) {
    super(message);
    this.name = 'SvgRenderError';
  }
}
