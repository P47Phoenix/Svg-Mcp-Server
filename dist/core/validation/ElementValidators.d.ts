/**
 * SVG Element Validators
 *
 * Comprehensive validation modules for individual SVG elements with detailed
 * error reporting, compliance checking, and semantic validation.
 */
import { SvgAnyElement } from '../../types/svg.js';
export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
    suggestions: ValidationSuggestion[];
}
export interface ValidationError {
    code: string;
    message: string;
    element?: SvgAnyElement;
    property?: string;
    value?: unknown;
    severity: 'error';
    line?: number;
    column?: number;
}
export interface ValidationWarning {
    code: string;
    message: string;
    element?: SvgAnyElement;
    property?: string;
    value?: unknown;
    severity: 'warning';
    line?: number;
    column?: number;
}
export interface ValidationSuggestion {
    code: string;
    message: string;
    element?: SvgAnyElement;
    property?: string;
    value?: unknown;
    severity: 'info';
    line?: number;
    column?: number;
    suggestion: string;
    suggestedValue?: any;
}
export interface ValidationContext {
    elementIndex?: number;
    parentElement?: SvgAnyElement;
    siblingElements?: SvgAnyElement[];
    documentIds?: Set<string>;
    referencedIds?: Set<string>;
}
/**
 * Base Element Validator
 */
export declare abstract class BaseElementValidator {
    protected errors: ValidationError[];
    protected warnings: ValidationWarning[];
    protected suggestions: ValidationSuggestion[];
    abstract validate(element: SvgAnyElement, context?: ValidationContext): ValidationResult;
    protected addError(code: string, message: string, element?: SvgAnyElement, property?: string, value?: unknown): void;
    protected addWarning(code: string, message: string, element?: SvgAnyElement, property?: string, value?: unknown): void;
    protected addSuggestion(code: string, message: string, suggestion: string, element?: SvgAnyElement, property?: string): void;
    protected reset(): void;
    protected validateCommonProperties(element: SvgAnyElement): void;
    private isValidClassName;
    private isValidTransform;
    private validateStyleProperties;
    private isValidColor;
}
/**
 * Circle Element Validator
 */
export declare class CircleValidator extends BaseElementValidator {
    validate(element: SvgAnyElement, _context?: ValidationContext): ValidationResult;
    private validateRadius;
    private validateCenter;
    private checkVisibility;
    private checkPerformance;
    private getResult;
}
/**
 * Rectangle Element Validator
 */
export declare class RectValidator extends BaseElementValidator {
    validate(element: SvgAnyElement, _context?: ValidationContext): ValidationResult;
    private validateDimensions;
    private validatePosition;
    private validateCornerRadius;
    private checkVisibility;
    private getResult;
}
/**
 * Line Element Validator
 */
export declare class LineValidator extends BaseElementValidator {
    validate(element: SvgAnyElement, _context?: ValidationContext): ValidationResult;
    private validateCoordinates;
    private checkLineLength;
    private checkVisibility;
    private getResult;
}
/**
 * Path Element Validator
 */
export declare class PathValidator extends BaseElementValidator {
    validate(element: SvgAnyElement, _context?: ValidationContext): ValidationResult;
    private validatePathData;
    private hasValidPathStructure;
    private checkComplexity;
    private checkVisibility;
    private getResult;
}
/**
 * Text Element Validator
 */
export declare class TextValidator extends BaseElementValidator {
    validate(element: SvgAnyElement, _context?: ValidationContext): ValidationResult;
    private validateContent;
    private validatePosition;
    private validateTextStyle;
    private checkAccessibility;
    private getResult;
}
/**
 * Group Element Validator
 */
export declare class GroupValidator extends BaseElementValidator {
    validate(element: SvgAnyElement, context?: ValidationContext): ValidationResult;
    private validateChildren;
    private checkNesting;
    private getResult;
}
/**
 * Element Validator Factory
 */
export declare class ElementValidatorFactory {
    private static validators;
    static getValidator(elementType: string): BaseElementValidator | null;
    static validateElement(element: SvgAnyElement, context?: ValidationContext): ValidationResult;
    static getSupportedElementTypes(): string[];
}
//# sourceMappingURL=ElementValidators.d.ts.map