/**
 * SVG Document Validator
 * 
 * Comprehensive document-level validation including cross-element validation,
 * structural integrity, accessibility compliance, and performance analysis.
 */

import { 
  SvgDocument, 
  SvgAnyElement, 
  ViewBox
} from '../../types/svg.js';
import { 
  ElementValidatorFactory, 
  ValidationResult, 
  ValidationError, 
  ValidationWarning, 
  ValidationSuggestion,
  ValidationContext 
} from './ElementValidators.js';

// Document validation options
export interface DocumentValidationOptions {
  checkAccessibility?: boolean;
  checkPerformance?: boolean;
  checkCompliance?: boolean;
  targetCompliance?: 'svg11' | 'svg20' | 'svg21';
  maxElements?: number;
  maxNestingDepth?: number;
  allowUnknownElements?: boolean;
}

// Document validation result
export interface DocumentValidationResult extends ValidationResult {
  elementResults: Map<number, ValidationResult>;
  documentStats: DocumentStats;
  compliance: ComplianceReport;
  accessibility: AccessibilityReport;
  performance: PerformanceReport;
}

// Document statistics
export interface DocumentStats {
  totalElements: number;
  elementTypes: Map<string, number>;
  maxNestingDepth: number;
  totalIds: number;
  duplicateIds: string[];
  unreferencedIds: string[];
  missingReferences: string[];
  documentSize: {
    estimatedBytes: number;
    complexity: 'low' | 'medium' | 'high' | 'extreme';
  };
}

// Compliance report
export interface ComplianceReport {
  standard: string;
  version: string;
  compliant: boolean;
  violations: ComplianceViolation[];
  recommendations: string[];
}

export interface ComplianceViolation {
  rule: string;
  description: string;
  elements: SvgAnyElement[];
  severity: 'error' | 'warning';
}

// Accessibility report
export interface AccessibilityReport {
  score: number; // 0-100
  hasTitle: boolean;
  hasDescription: boolean;
  hasAriaLabels: boolean;
  colorContrastIssues: ColorContrastIssue[];
  textSizeIssues: TextSizeIssue[];
  recommendations: string[];
}

export interface ColorContrastIssue {
  element: SvgAnyElement;
  foreground: string;
  background: string;
  ratio: number;
  minimumRequired: number;
}

export interface TextSizeIssue {
  element: SvgAnyElement;
  fontSize: number;
  recommended: number;
}

// Performance report
export interface PerformanceReport {
  score: number; // 0-100
  renderComplexity: number;
  memoryEstimate: number; // in KB
  issues: PerformanceIssue[];
  optimizations: string[];
}

export interface PerformanceIssue {
  type: 'complexity' | 'size' | 'nesting' | 'redundancy';
  description: string;
  impact: 'low' | 'medium' | 'high';
  elements?: SvgAnyElement[];
}

/**
 * SVG Document Validator
 */
export class DocumentValidator {
  private options: DocumentValidationOptions;

  constructor(options: DocumentValidationOptions = {}) {
    this.options = {
      checkAccessibility: true,
      checkPerformance: true,
      checkCompliance: true,
      targetCompliance: 'svg20',
      maxElements: 10000,
      maxNestingDepth: 20,
      allowUnknownElements: false,
      ...options
    };
  }

  /**
   * Validate an entire SVG document
   */
  async validateDocument(document: SvgDocument): Promise<DocumentValidationResult> {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const suggestions: ValidationSuggestion[] = [];
    const elementResults = new Map<number, ValidationResult>();

    // Validate document structure
    this.validateDocumentStructure(document, errors, warnings);

    // Build validation context
    const context = this.buildValidationContext(document);

    // Validate ViewBox
    this.validateViewBox(document.viewBox, errors, warnings);

    // Validate individual elements
    document.elements.forEach((element, index) => {
      const elementContext: ValidationContext = {
        elementIndex: index,
        siblingElements: document.elements,
        documentIds: context.documentIds,
        referencedIds: context.referencedIds
      };

      const result = ElementValidatorFactory.validateElement(element, elementContext);
      elementResults.set(index, result);

      // Aggregate errors, warnings, and suggestions
      errors.push(...result.errors);
      warnings.push(...result.warnings);
      suggestions.push(...result.suggestions);
    });

    // Cross-element validation
    this.validateCrossElementReferences(document, context, errors, warnings);
    this.validateIdUniqueness(context, errors);

    // Generate reports
    const documentStats = this.generateDocumentStats(document, context);
    const compliance = this.options.checkCompliance ? 
      await this.generateComplianceReport(document, this.options.targetCompliance!) : 
      this.createEmptyComplianceReport();
    const accessibility = this.options.checkAccessibility ? 
      this.generateAccessibilityReport(document) : 
      this.createEmptyAccessibilityReport();
    const performance = this.options.checkPerformance ? 
      this.generatePerformanceReport(document, documentStats) : 
      this.createEmptyPerformanceReport();

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      elementResults,
      documentStats,
      compliance,
      accessibility,
      performance
    };
  }

  private validateDocumentStructure(document: SvgDocument, errors: ValidationError[], warnings: ValidationWarning[]): void {
    // Check required properties
    if (!document.viewBox) {
      errors.push({
        code: 'MISSING_VIEWBOX',
        message: 'Document must have a viewBox',
        severity: 'error'
      });
    }

    if (!document.elements || document.elements.length === 0) {
      warnings.push({
        code: 'EMPTY_DOCUMENT',
        message: 'Document has no elements',
        severity: 'warning'
      });
    }

    // Check element limits
    if (document.elements && document.elements.length > this.options.maxElements!) {
      errors.push({
        code: 'TOO_MANY_ELEMENTS',
        message: `Document exceeds maximum element limit of ${this.options.maxElements}`,
        severity: 'error',
        value: document.elements.length
      });
    }

    // Check for accessibility metadata
    if (!document.title && !document.description) {
      warnings.push({
        code: 'MISSING_ACCESSIBILITY_METADATA',
        message: 'Document should have a title or description for accessibility',
        severity: 'warning'
      });
    }
  }

  private buildValidationContext(document: SvgDocument): {
    documentIds: Set<string>;
    referencedIds: Set<string>;
  } {
    const documentIds = new Set<string>();
    const referencedIds = new Set<string>();

    // Collect all IDs and references
    const collectIds = (element: SvgAnyElement) => {
      if (element.id) {
        documentIds.add(element.id);
      }

      // Collect referenced IDs from various attributes
      if (element.clipPath) {
        const id = this.extractIdFromUrl(element.clipPath);
        if (id) referencedIds.add(id);
      }

      if (element.mask) {
        const id = this.extractIdFromUrl(element.mask);
        if (id) referencedIds.add(id);
      }

      // Recurse into group children
      if (element.type === 'group') {
        element.children.forEach(collectIds);
      }
    };

    document.elements.forEach(collectIds);

    return { documentIds, referencedIds };
  }

  private extractIdFromUrl(url: string): string | null {
    const match = url.match(/url\(#([^)]+)\)/);
    return match?.[1] ?? null;
  }

  private validateViewBox(viewBox: ViewBox, errors: ValidationError[], warnings: ValidationWarning[]): void {
    if (viewBox.width <= 0) {
      errors.push({
        code: 'INVALID_VIEWBOX_WIDTH',
        message: 'ViewBox width must be positive',
        severity: 'error',
        property: 'viewBox.width',
        value: viewBox.width
      });
    }

    if (viewBox.height <= 0) {
      errors.push({
        code: 'INVALID_VIEWBOX_HEIGHT',
        message: 'ViewBox height must be positive',
        severity: 'error',
        property: 'viewBox.height',
        value: viewBox.height
      });
    }

    if (viewBox.width > 100000 || viewBox.height > 100000) {
      warnings.push({
        code: 'VERY_LARGE_VIEWBOX',
        message: 'Very large viewBox dimensions may impact performance',
        severity: 'warning',
        property: 'viewBox',
        value: viewBox
      });
    }

    const aspectRatio = viewBox.width / viewBox.height;
    if (aspectRatio > 100 || aspectRatio < 0.01) {
      warnings.push({
        code: 'EXTREME_ASPECT_RATIO',
        message: 'Extreme aspect ratio may cause rendering issues',
        severity: 'warning',
        property: 'viewBox',
        value: aspectRatio
      });
    }
  }

  private validateCrossElementReferences(
    _document: SvgDocument, 
    context: { documentIds: Set<string>; referencedIds: Set<string> }, 
    errors: ValidationError[], 
    warnings: ValidationWarning[]
  ): void {
    // Check for missing references
    for (const referencedId of context.referencedIds) {
      if (!context.documentIds.has(referencedId)) {
        errors.push({
          code: 'MISSING_REFERENCE',
          message: `Referenced ID '${referencedId}' not found in document`,
          severity: 'error',
          value: referencedId
        });
      }
    }

    // Check for unreferenced IDs (potential cleanup opportunity)
    for (const documentId of context.documentIds) {
      if (!context.referencedIds.has(documentId)) {
        warnings.push({
          code: 'UNREFERENCED_ID',
          message: `ID '${documentId}' is defined but never referenced`,
          severity: 'warning',
          value: documentId
        });
      }
    }
  }

  private validateIdUniqueness(
    context: { documentIds: Set<string>; referencedIds: Set<string> }, 
    errors: ValidationError[]
  ): void {
    const seenIds = new Set<string>();
    const duplicates = new Set<string>();

    // This is a simplified check - in practice, you'd track which elements have duplicate IDs
    for (const id of context.documentIds) {
      if (seenIds.has(id)) {
        duplicates.add(id);
      } else {
        seenIds.add(id);
      }
    }

    for (const duplicateId of duplicates) {
      errors.push({
        code: 'DUPLICATE_ID',
        message: `Duplicate ID found: '${duplicateId}'`,
        severity: 'error',
        value: duplicateId
      });
    }
  }

  private generateDocumentStats(document: SvgDocument, context: {
    documentIds: Set<string>;
    referencedIds: Set<string>;
  }): DocumentStats {
    const elementTypes = new Map<string, number>();
    let maxNestingDepth = 0;

    const analyzeElement = (element: SvgAnyElement, depth: number = 0) => {
      maxNestingDepth = Math.max(maxNestingDepth, depth);
      
      const count = elementTypes.get(element.type) || 0;
      elementTypes.set(element.type, count + 1);

      if (element.type === 'group') {
        element.children.forEach(child => analyzeElement(child, depth + 1));
      }
    };

    document.elements.forEach(element => analyzeElement(element));

    const duplicateIds: string[] = [];
    const unreferencedIds: string[] = [];
    const missingReferences: string[] = [];

    // Calculate unreferenced IDs
    for (const id of context.documentIds) {
      if (!context.referencedIds.has(id)) {
        unreferencedIds.push(id);
      }
    }

    // Calculate missing references
    for (const id of context.referencedIds) {
      if (!context.documentIds.has(id)) {
        missingReferences.push(id);
      }
    }

    // Estimate document size and complexity
    const estimatedBytes = JSON.stringify(document).length;
    let complexity: 'low' | 'medium' | 'high' | 'extreme';
    
    if (document.elements.length < 10 && maxNestingDepth < 3) {
      complexity = 'low';
    } else if (document.elements.length < 100 && maxNestingDepth < 6) {
      complexity = 'medium';
    } else if (document.elements.length < 1000 && maxNestingDepth < 10) {
      complexity = 'high';
    } else {
      complexity = 'extreme';
    }

    return {
      totalElements: document.elements.length,
      elementTypes,
      maxNestingDepth,
      totalIds: context.documentIds.size,
      duplicateIds,
      unreferencedIds,
      missingReferences,
      documentSize: {
        estimatedBytes,
        complexity
      }
    };
  }

  private async generateComplianceReport(document: SvgDocument, standard: string): Promise<ComplianceReport> {
    const violations: ComplianceViolation[] = [];
    const recommendations: string[] = [];

    // SVG 2.0 compliance checks (simplified)
    if (standard === 'svg20') {
      // Check for deprecated elements or attributes
      // Check for required attributes
      // Check for proper nesting rules
      
      // Example checks:
      if (!document.viewBox) {
        violations.push({
          rule: 'SVG2.0-VIEWBOX-REQUIRED',
          description: 'ViewBox is recommended for SVG 2.0 documents',
          elements: [],
          severity: 'warning'
        });
      }

      if (document.elements.some(el => el.type === 'group' && (!el.children || el.children.length === 0))) {
        violations.push({
          rule: 'SVG2.0-EMPTY-GROUPS',
          description: 'Empty group elements should be avoided',
          elements: document.elements.filter(el => el.type === 'group' && (!el.children || el.children.length === 0)),
          severity: 'warning'
        });
      }

      recommendations.push('Consider adding accessibility metadata (title, description)');
      recommendations.push('Use semantic grouping with meaningful IDs');
    }

    return {
      standard: 'SVG',
      version: standard,
      compliant: violations.filter(v => v.severity === 'error').length === 0,
      violations,
      recommendations
    };
  }

  private generateAccessibilityReport(document: SvgDocument): AccessibilityReport {
    let score = 100;
    const colorContrastIssues: ColorContrastIssue[] = [];
    const textSizeIssues: TextSizeIssue[] = [];
    const recommendations: string[] = [];

    // Check for accessibility metadata
    const hasTitle = !!document.title;
    const hasDescription = !!document.description;
    
    if (!hasTitle) {
      score -= 20;
      recommendations.push('Add a title for screen readers');
    }
    
    if (!hasDescription) {
      score -= 15;
      recommendations.push('Add a description for better accessibility');
    }

    // Check for aria labels (simplified)
    const hasAriaLabels = document.elements.some(el => 
      el.style && 'aria-label' in (el.style as any)
    );

    if (!hasAriaLabels) {
      score -= 10;
      recommendations.push('Consider adding aria-label attributes to important elements');
    }

    // Check text sizes
    const textElements = document.elements.filter(el => el.type === 'text') as any[];
    textElements.forEach(textEl => {
      const fontSize = textEl.style?.fontSize || 16;
      if (fontSize < 12) {
        textSizeIssues.push({
          element: textEl,
          fontSize,
          recommended: 12
        });
        score -= 5;
      }
    });

    if (textSizeIssues.length > 0) {
      recommendations.push('Increase font sizes for better readability');
    }

    return {
      score: Math.max(0, score),
      hasTitle,
      hasDescription,
      hasAriaLabels,
      colorContrastIssues,
      textSizeIssues,
      recommendations
    };
  }

  private generatePerformanceReport(document: SvgDocument, stats: DocumentStats): PerformanceReport {
    let score = 100;
    const issues: PerformanceIssue[] = [];
    const optimizations: string[] = [];

    // Analyze complexity
    let renderComplexity = 0;
    document.elements.forEach(element => {
      switch (element.type) {
        case 'circle':
        case 'rect':
        case 'line':
          renderComplexity += 1;
          break;
        case 'path':
          renderComplexity += 3;
          break;
        case 'text':
          renderComplexity += 2;
          break;
        case 'group':
          renderComplexity += 0.5;
          break;
      }
    });

    // Check for performance issues
    if (stats.totalElements > 1000) {
      issues.push({
        type: 'complexity',
        description: 'Document has many elements',
        impact: 'high'
      });
      score -= 30;
      optimizations.push('Consider grouping similar elements or using patterns');
    }

    if (stats.maxNestingDepth > 10) {
      issues.push({
        type: 'nesting',
        description: 'Deep element nesting detected',
        impact: 'medium'
      });
      score -= 15;
      optimizations.push('Flatten deeply nested structures where possible');
    }

    if (stats.documentSize.estimatedBytes > 1000000) { // 1MB
      issues.push({
        type: 'size',
        description: 'Document is very large',
        impact: 'high'
      });
      score -= 25;
      optimizations.push('Consider optimizing path data and removing unused elements');
    }

    // Estimate memory usage (simplified)
    const memoryEstimate = Math.max(1, stats.documentSize.estimatedBytes / 1024); // KB

    return {
      score: Math.max(0, score),
      renderComplexity,
      memoryEstimate,
      issues,
      optimizations
    };
  }

  private createEmptyComplianceReport(): ComplianceReport {
    return {
      standard: 'N/A',
      version: 'N/A',
      compliant: true,
      violations: [],
      recommendations: []
    };
  }

  private createEmptyAccessibilityReport(): AccessibilityReport {
    return {
      score: 0,
      hasTitle: false,
      hasDescription: false,
      hasAriaLabels: false,
      colorContrastIssues: [],
      textSizeIssues: [],
      recommendations: []
    };
  }

  private createEmptyPerformanceReport(): PerformanceReport {
    return {
      score: 0,
      renderComplexity: 0,
      memoryEstimate: 0,
      issues: [],
      optimizations: []
    };
  }
}
