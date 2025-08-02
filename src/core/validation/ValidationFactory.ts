/**
 * Validation Factory
 * 
 * Central factory for creating and managing SVG validation instances.
 * Provides easy access to all validation capabilities with sensible defaults.
 */

import { 
  ElementValidatorFactory, 
  ValidationResult, 
  ValidationContext 
} from './ElementValidators.js';
import { 
  DocumentValidator, 
  DocumentValidationOptions, 
  DocumentValidationResult 
} from './DocumentValidator.js';
import { SvgDocument, SvgAnyElement } from '../../types/svg.js';

// Validation presets for common use cases
export type ValidationPreset = 
  | 'strict'      // Maximum validation with all checks enabled
  | 'standard'    // Balanced validation suitable for most cases
  | 'minimal'     // Basic validation only
  | 'performance' // Focus on performance-related issues
  | 'accessibility' // Focus on accessibility compliance
  | 'custom';     // Custom configuration

// Validation suite configuration
export interface ValidationSuiteConfig {
  preset?: ValidationPreset;
  elementValidation?: boolean;
  documentValidation?: boolean;
  documentOptions?: DocumentValidationOptions;
}

// Combined validation results
export interface ValidationSuiteResult {
  overall: {
    valid: boolean;
    score: number; // 0-100 overall quality score
    summary: string;
  };
  elementResults?: Map<number, ValidationResult>;
  documentResult?: DocumentValidationResult;
  recommendations: string[];
  quickFixes: QuickFix[];
}

// Quick fix suggestions
export interface QuickFix {
  type: 'add' | 'remove' | 'modify';
  description: string;
  property?: string;
  suggestedValue?: any;
  priority: 'high' | 'medium' | 'low';
  automated: boolean; // Whether this fix can be applied automatically
}

/**
 * Main validation factory and orchestrator
 */
export class ValidationFactory {
  private static presetConfigs: Record<ValidationPreset, DocumentValidationOptions> = {
    strict: {
      checkAccessibility: true,
      checkPerformance: true,
      checkCompliance: true,
      targetCompliance: 'svg20',
      maxElements: 5000,
      maxNestingDepth: 15,
      allowUnknownElements: false
    },
    standard: {
      checkAccessibility: true,
      checkPerformance: true,
      checkCompliance: true,
      targetCompliance: 'svg20',
      maxElements: 10000,
      maxNestingDepth: 20,
      allowUnknownElements: true
    },
    minimal: {
      checkAccessibility: false,
      checkPerformance: false,
      checkCompliance: false,
      maxElements: 50000,
      maxNestingDepth: 50,
      allowUnknownElements: true
    },
    performance: {
      checkAccessibility: false,
      checkPerformance: true,
      checkCompliance: false,
      maxElements: 1000,
      maxNestingDepth: 10,
      allowUnknownElements: true
    },
    accessibility: {
      checkAccessibility: true,
      checkPerformance: false,
      checkCompliance: true,
      targetCompliance: 'svg20',
      maxElements: 50000,
      maxNestingDepth: 50,
      allowUnknownElements: true
    },
    custom: {
      // Default values - will be overridden by user config
      checkAccessibility: true,
      checkPerformance: true,
      checkCompliance: true,
      targetCompliance: 'svg20',
      maxElements: 10000,
      maxNestingDepth: 20,
      allowUnknownElements: true
    }
  };

  /**
   * Create a document validator with preset configuration
   */
  static createDocumentValidator(preset: ValidationPreset = 'standard'): DocumentValidator {
    const options = { ...this.presetConfigs[preset] };
    return new DocumentValidator(options);
  }

  /**
   * Create a document validator with custom options
   */
  static createCustomDocumentValidator(options: DocumentValidationOptions): DocumentValidator {
    return new DocumentValidator(options);
  }

  /**
   * Validate a single SVG element
   */
  static validateElement(
    element: SvgAnyElement, 
    context?: ValidationContext
  ): ValidationResult {
    return ElementValidatorFactory.validateElement(element, context);
  }

  /**
   * Run a complete validation suite on an SVG document
   */
  static async validateDocument(
    document: SvgDocument,
    config: ValidationSuiteConfig = {}
  ): Promise<ValidationSuiteResult> {
    const {
      preset = 'standard',
      elementValidation = true,
      documentValidation = true,
      documentOptions
    } = config;

    // Get preset options and merge with custom options
    const baseOptions = preset === 'custom' ? {} : this.presetConfigs[preset];
    const finalOptions = { ...baseOptions, ...documentOptions };

    const recommendations: string[] = [];
    const quickFixes: QuickFix[] = [];
    let elementResults: Map<number, ValidationResult> | undefined;
    let documentResult: DocumentValidationResult | undefined;

    // Element-level validation
    if (elementValidation) {
      elementResults = new Map();
      
      document.elements.forEach((element, index) => {
        const context: ValidationContext = {
          elementIndex: index,
          siblingElements: document.elements,
          documentIds: new Set(),
          referencedIds: new Set()
        };
        
        const result = ElementValidatorFactory.validateElement(element, context);
        elementResults!.set(index, result);

        // Generate quick fixes from element validation
        result.suggestions.forEach(suggestion => {
          const quickFix: any = {
            type: 'modify',
            description: suggestion.message,
            priority: this.getSuggestionPriority(suggestion.code),
            automated: this.isAutomatable(suggestion.code)
          };
          
          if (suggestion.property !== undefined) quickFix.property = suggestion.property;
          if ((suggestion as any).suggestedValue !== undefined) quickFix.suggestedValue = (suggestion as any).suggestedValue;
          
          quickFixes.push(quickFix);
        });
      });
    }

    // Document-level validation
    if (documentValidation) {
      const validator = new DocumentValidator(finalOptions);
      documentResult = await validator.validateDocument(document);

      // Extract recommendations from document validation
      if (documentResult.accessibility.recommendations) {
        recommendations.push(...documentResult.accessibility.recommendations);
      }
      if (documentResult.performance.optimizations) {
        recommendations.push(...documentResult.performance.optimizations);
      }
      if (documentResult.compliance.recommendations) {
        recommendations.push(...documentResult.compliance.recommendations);
      }

      // Generate quick fixes from document validation
      documentResult.warnings.forEach(warning => {
        quickFixes.push({
          type: 'modify',
          description: warning.message,
          priority: 'medium',
          automated: false
        });
      });
    }

    // Calculate overall results
    const overall = this.calculateOverallResults(elementResults, documentResult, recommendations);

    const result: any = {
      overall,
      recommendations: Array.from(new Set(recommendations)), // Remove duplicates
      quickFixes
    };
    
    if (elementResults !== undefined) result.elementResults = elementResults;
    if (documentResult !== undefined) result.documentResult = documentResult;

    return result;
  }

  /**
   * Quick validation for performance-critical scenarios
   */
  static quickValidate(document: SvgDocument): {
    valid: boolean;
    criticalIssues: string[];
    elementCount: number;
  } {
    const criticalIssues: string[] = [];

    // Basic structure checks
    if (!document.viewBox) {
      criticalIssues.push('Missing viewBox');
    }

    if (!document.elements || document.elements.length === 0) {
      criticalIssues.push('No elements in document');
    }

    // Check for obviously invalid values
    if (document.viewBox) {
      if (document.viewBox.width <= 0 || document.viewBox.height <= 0) {
        criticalIssues.push('Invalid viewBox dimensions');
      }
    }

    // Basic element validation
    let invalidElements = 0;
    document.elements?.forEach(element => {
      if (!element.type) {
        invalidElements++;
      }
    });

    if (invalidElements > 0) {
      criticalIssues.push(`${invalidElements} elements missing type information`);
    }

    return {
      valid: criticalIssues.length === 0,
      criticalIssues,
      elementCount: document.elements?.length || 0
    };
  }

  /**
   * Validate and suggest automatic fixes
   */
  static async validateWithAutoFix(
    document: SvgDocument,
    preset: ValidationPreset = 'standard'
  ): Promise<{
    validationResult: ValidationSuiteResult;
    autoFixedDocument?: SvgDocument;
    appliedFixes: string[];
  }> {
    const validationResult = await this.validateDocument(document, { preset });
    const appliedFixes: string[] = [];
    let autoFixedDocument: SvgDocument | undefined;

    // Apply automatic fixes
    const automatableFixes = validationResult.quickFixes.filter(fix => fix.automated);
    
    if (automatableFixes.length > 0) {
      autoFixedDocument = { ...document };
      
      for (const fix of automatableFixes) {
        try {
          this.applyFix(autoFixedDocument, fix);
          appliedFixes.push(fix.description);
        } catch (error) {
          console.warn(`Failed to apply auto-fix: ${fix.description}`, error);
        }
      }
    }

    const result: any = {
      validationResult,
      appliedFixes
    };
    
    if (autoFixedDocument !== undefined) result.autoFixedDocument = autoFixedDocument;

    return result;
  }

  private static calculateOverallResults(
    elementResults?: Map<number, ValidationResult>,
    documentResult?: DocumentValidationResult,
    _recommendations?: string[]
  ): { valid: boolean; score: number; summary: string } {
    let score = 100;
    let totalErrors = 0;
    let totalWarnings = 0;

    // Factor in element validation results
    if (elementResults) {
      for (const result of elementResults.values()) {
        totalErrors += result.errors.length;
        totalWarnings += result.warnings.length;
        score -= result.errors.length * 10; // 10 points per error
        score -= result.warnings.length * 2; // 2 points per warning
      }
    }

    // Factor in document validation results
    if (documentResult) {
      totalErrors += documentResult.errors.length;
      totalWarnings += documentResult.warnings.length;
      score -= documentResult.errors.length * 15; // Document errors are more serious
      score -= documentResult.warnings.length * 3;

      // Factor in specialized scores
      if (documentResult.accessibility.score < 100) {
        score -= (100 - documentResult.accessibility.score) * 0.2;
      }
      if (documentResult.performance.score < 100) {
        score -= (100 - documentResult.performance.score) * 0.1;
      }
    }

    score = Math.max(0, Math.min(100, score));

    // Generate summary
    let summary = '';
    if (totalErrors === 0 && totalWarnings === 0) {
      summary = 'Document is valid with no issues detected';
    } else if (totalErrors === 0) {
      summary = `Document is valid with ${totalWarnings} warning(s)`;
    } else {
      summary = `Document has ${totalErrors} error(s) and ${totalWarnings} warning(s)`;
    }

    return {
      valid: totalErrors === 0,
      score: Math.round(score),
      summary
    };
  }

  private static getSuggestionPriority(code: string): 'high' | 'medium' | 'low' {
    const highPriority = ['MISSING_REQUIRED_ATTRIBUTE', 'INVALID_DIMENSION', 'NEGATIVE_DIMENSION'];
    const lowPriority = ['STYLE_OPTIMIZATION', 'PERFORMANCE_SUGGESTION'];
    
    if (highPriority.some(hp => code.includes(hp))) return 'high';
    if (lowPriority.some(lp => code.includes(lp))) return 'low';
    return 'medium';
  }

  private static isAutomatable(code: string): boolean {
    const automatable = [
      'MISSING_TITLE',
      'MISSING_DESCRIPTION',
      'EMPTY_ATTRIBUTE',
      'REDUNDANT_ATTRIBUTE'
    ];
    return automatable.some(auto => code.includes(auto));
  }

  private static applyFix(document: SvgDocument, fix: QuickFix): void {
    // Simple auto-fix implementations
    switch (fix.description) {
      case 'Add a title for screen readers':
        if (!document.title) {
          document.title = 'SVG Document';
        }
        break;
      case 'Add a description for better accessibility':
        if (!document.description) {
          document.description = 'An SVG graphic';
        }
        break;
      // Add more auto-fix implementations as needed
    }
  }
}

// Convenience exports for common validation scenarios
export const SVGValidator = {
  /**
   * Quick validation for basic structure and critical errors
   */
  quick: (document: SvgDocument) => ValidationFactory.quickValidate(document),

  /**
   * Standard validation with balanced checks
   */
  standard: (document: SvgDocument) => ValidationFactory.validateDocument(document, { preset: 'standard' }),

  /**
   * Strict validation with all checks enabled
   */
  strict: (document: SvgDocument) => ValidationFactory.validateDocument(document, { preset: 'strict' }),

  /**
   * Performance-focused validation
   */
  performance: (document: SvgDocument) => ValidationFactory.validateDocument(document, { preset: 'performance' }),

  /**
   * Accessibility-focused validation
   */
  accessibility: (document: SvgDocument) => ValidationFactory.validateDocument(document, { preset: 'accessibility' }),

  /**
   * Validation with automatic fixes applied
   */
  withAutoFix: (document: SvgDocument, preset?: ValidationPreset) => 
    ValidationFactory.validateWithAutoFix(document, preset)
};
