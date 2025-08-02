/**
 * SVG Document Processor
 */

import { SvgDocument, SvgAnyElement, ViewBox, SvgValidationError } from '../types/svg.js';
import { SvgRenderer } from './SvgRenderer.js';
import { logger } from '../utils/logger.js';
import { 
  ValidationFactory, 
  ValidationSuiteResult, 
  ValidationPreset
} from './validation/ValidationFactory.js';
import { 
  SvgDocumentOptimizer, 
  OptimizationOptions, 
  OptimizationResult,
  OptimizationPresets
} from './optimization/SvgDocumentOptimizer.js';
import { 
  SvgTransformationEngine, 
  TransformationType, 
  TransformationParams, 
  TransformationResult,
  AppliedTransform
} from './optimization/SvgTransformationEngine.js';

export interface SvgDocumentSpec {
  viewBox: ViewBox;
  elements: SvgAnyElement[];
  width?: number;
  height?: number;
  title?: string;
  description?: string;
  optimize?: boolean | OptimizationOptions;
  validate?: boolean | ValidationPreset;
  generateMetadata?: boolean;
  transform?: {
    type: TransformationType;
    params: TransformationParams;
  }[];
}

export interface ProcessingResult {
  document: SvgDocument;
  svg: string;
  warnings: string[];
  errors: string[];
  metadata: DocumentMetadata;
  processingTime: number;
  optimization?: OptimizationResult;
  transformation?: TransformationResult;
}

export interface DocumentMetadata {
  complexity: 'low' | 'medium' | 'high' | 'extreme';
  features: string[];
  accessibility: {
    hasTitle: boolean;
    hasDescription: boolean;
  };
  compliance?: string;
  performance?: {
    elementCount: number;
    estimatedFileSize: number;
    renderComplexity: 'low' | 'medium' | 'high';
  };
}

export class SvgDocumentProcessor {
  private readonly renderer: SvgRenderer;

  constructor() {
    this.renderer = new SvgRenderer();
  }

  async processDocument(spec: SvgDocumentSpec): Promise<ProcessingResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      let document: SvgDocument = {
        viewBox: spec.viewBox,
        elements: spec.elements,
        ...(spec.width !== undefined && { width: spec.width }),
        ...(spec.height !== undefined && { height: spec.height }),
        ...(spec.title && { title: spec.title }),
        ...(spec.description && { description: spec.description })
      };

      let optimizationResult: OptimizationResult | undefined;
      let transformationResult: TransformationResult | undefined;

      // Apply transformations if specified
      if (spec.transform && spec.transform.length > 0) {
        const transformationEngine = new SvgTransformationEngine();
        transformationResult = await transformationEngine.transformMultiple(document, spec.transform);
        document = transformationResult.transformedDocument;
        warnings.push(...transformationResult.appliedTransforms.map((t: AppliedTransform) => t.description));
      }

      // Apply optimization if specified
      if (spec.optimize) {
        const optimizationOptions = typeof spec.optimize === 'boolean' 
          ? OptimizationPresets.BALANCED 
          : spec.optimize;
        
        const optimizer = new SvgDocumentOptimizer(optimizationOptions);
        optimizationResult = await optimizer.optimize(document);
        document = optimizationResult.optimizedDocument;
        warnings.push(...optimizationResult.warnings);
      }

      if (spec.validate !== false) {
        const validationPreset = typeof spec.validate === 'string' ? spec.validate : 'standard';
        const validation = await this.validateDocument(document, validationPreset);
        errors.push(...validation.errors);
        warnings.push(...validation.warnings);
        
        if (!validation.valid) {
          throw new SvgValidationError('Document validation failed', { errors, warnings });
        }
      }

      const svg = await this.renderer.render(document);
      
      // Enhanced metadata generation using validation results
      let metadata: DocumentMetadata;
      if (spec.generateMetadata !== false) {
        metadata = await this.generateMetadata(document);
      } else {
        metadata = {
          complexity: document.elements.length < 10 ? 'low' : document.elements.length < 100 ? 'medium' : 'high',
          features: [...new Set(document.elements.map(el => el.type))],
          accessibility: {
            hasTitle: !!document.title,
            hasDescription: !!document.description
          },
          compliance: 'svg20',
          performance: {
            elementCount: document.elements.length,
            estimatedFileSize: svg.length,
            renderComplexity: document.elements.length < 50 ? 'low' : document.elements.length < 200 ? 'medium' : 'high'
          }
        };
      }

      const processingTime = Date.now() - startTime;

      return { 
        document, 
        svg, 
        warnings, 
        errors, 
        metadata, 
        processingTime,
        ...(optimizationResult && { optimization: optimizationResult }),
        ...(transformationResult && { transformation: transformationResult })
      };

    } catch (error) {
      logger.error('Document processing failed', { error, spec });
      throw error;
    }
  }

  async validateDocument(document: SvgDocument, preset: ValidationPreset = 'standard'): Promise<{
    valid: boolean;
    errors: string[];
    warnings: string[];
    validationResult?: ValidationSuiteResult;
  }> {
    try {
      const validationResult = await ValidationFactory.validateDocument(document, { preset });
      
      const errors = validationResult.documentResult?.errors.map(e => e.message) || [];
      const warnings = validationResult.documentResult?.warnings.map(w => w.message) || [];

      // Add element-level errors and warnings
      if (validationResult.elementResults) {
        for (const elementResult of validationResult.elementResults.values()) {
          errors.push(...elementResult.errors.map(e => e.message));
          warnings.push(...elementResult.warnings.map(w => w.message));
        }
      }

      return {
        valid: validationResult.overall.valid,
        errors,
        warnings,
        validationResult
      };
    } catch (error) {
      logger.error('Validation failed', { error, document });
      return {
        valid: false,
        errors: ['Validation system error: ' + (error as Error).message],
        warnings: []
      };
    }
  }

  /**
   * Optimize an SVG document
   */
  async optimizeDocument(
    document: SvgDocument, 
    options?: OptimizationOptions
  ): Promise<OptimizationResult> {
    logger.info('Optimizing SVG document', { elementCount: document.elements.length });
    
    const optimizer = new SvgDocumentOptimizer(options || OptimizationPresets.BALANCED);
    return await optimizer.optimize(document);
  }

  /**
   * Transform an SVG document
   */
  async transformDocument(
    document: SvgDocument,
    transformation: TransformationType,
    params: TransformationParams
  ): Promise<TransformationResult> {
    logger.info('Transforming SVG document', { transformation, params });
    
    const transformationEngine = new SvgTransformationEngine();
    return await transformationEngine.transform(document, transformation, params);
  }

  /**
   * Apply multiple transformations to an SVG document
   */
  async transformDocumentMultiple(
    document: SvgDocument,
    transformations: Array<{ type: TransformationType; params: TransformationParams }>
  ): Promise<TransformationResult> {
    logger.info('Applying multiple transformations to SVG document', { 
      count: transformations.length 
    });
    
    const transformationEngine = new SvgTransformationEngine();
    return await transformationEngine.transformMultiple(document, transformations);
  }

  async generateMetadata(document: SvgDocument): Promise<DocumentMetadata> {
    try {
      // Use performance validation to get detailed stats
      const validationResult = await ValidationFactory.validateDocument(document, { 
        preset: 'performance',
        documentValidation: true,
        elementValidation: false
      });

      const stats = validationResult.documentResult?.documentStats;
      const accessibility = validationResult.documentResult?.accessibility;

      return {
        complexity: stats?.documentSize.complexity || 'low',
        features: Array.from(stats?.elementTypes.keys() || []),
        accessibility: {
          hasTitle: accessibility?.hasTitle || !!document.title,
          hasDescription: accessibility?.hasDescription || !!document.description
        },
        compliance: validationResult.documentResult?.compliance.compliant ? 'svg20' : 'non-compliant',
        performance: {
          elementCount: document.elements.length,
          estimatedFileSize: JSON.stringify(document).length,
          renderComplexity: document.elements.length < 50 ? 'low' : document.elements.length < 200 ? 'medium' : 'high'
        }
      };
    } catch (error) {
      logger.warn('Failed to generate enhanced metadata, using basic metadata', { error });
      
      // Fallback to basic metadata
      return {
        complexity: document.elements.length < 10 ? 'low' : document.elements.length < 100 ? 'medium' : 'high',
        features: [...new Set(document.elements.map(el => el.type))],
        accessibility: {
          hasTitle: !!document.title,
          hasDescription: !!document.description
        },
        compliance: 'svg20',
        performance: {
          elementCount: document.elements.length,
          estimatedFileSize: JSON.stringify(document).length,
          renderComplexity: document.elements.length < 50 ? 'low' : document.elements.length < 200 ? 'medium' : 'high'
        }
      };
    }
  }

  getProcessingStats(): {
    totalDocuments: number;
    totalProcessingTime: number;
    averageProcessingTime: number;
  } {
    // Simple stats for now
    return {
      totalDocuments: 0,
      totalProcessingTime: 0,
      averageProcessingTime: 0
    };
  }
}
