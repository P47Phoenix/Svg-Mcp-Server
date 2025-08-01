/**
 * SVG Shape Generators - Main Export
 * 
 * Exports all shape generation utilities and collections
 */

export { BasicShapeGenerator } from './BasicShapeGenerator.js';
export { ShapeCollections } from './ShapeCollections.js';

export type {
  BaseShapeOptions,
  CircleOptions,
  RectOptions,
  LineOptions,
  TextOptions,
  GroupOptions,
  PathOptions,
  PathCommand
} from './BasicShapeGenerator.js';

export type {
  ShapeCollection
} from './ShapeCollections.js';
