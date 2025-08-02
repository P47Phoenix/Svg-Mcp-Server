/**
 * Tests for SVG Document Optimization and Transformation capabilities
 * 
 * Tests the Task #10 implementation: Document optimization and transformation tools
 */

import { SvgDocumentOptimizer, OptimizationPresets } from '../src/core/optimization/SvgDocumentOptimizer.js';
import { SvgTransformationEngine } from '../src/core/optimization/SvgTransformationEngine.js';
import { SvgDocument } from '../src/types/svg.js';

describe('SVG Document Optimization', () => {
  let optimizer: SvgDocumentOptimizer;
  let sampleDocument: SvgDocument;

  beforeEach(() => {
    optimizer = new SvgDocumentOptimizer();
    sampleDocument = {
      viewBox: { x: 0, y: 0, width: 200, height: 200 },
      elements: [
        {
          type: 'circle',
          cx: 50.12345,
          cy: 50.12345,
          r: 25.98765,
          style: { fill: 'black', strokeWidth: 1, opacity: 1 }
        },
        {
          type: 'rect',
          x: 100.00000,
          y: 100.00000,
          width: 50.55555,
          height: 30.33333,
          style: { fill: 'black' }
        },
        {
          type: 'group',
          children: []
        }
      ]
    };
  });

  test('should optimize document with balanced preset', async () => {
    const result = await optimizer.optimize(sampleDocument);

    expect(result.optimizedDocument).toBeDefined();
    expect(result.statistics.originalElementCount).toBe(3);
    expect(result.statistics.optimizedElementCount).toBe(2); // Empty group removed
    expect(result.statistics.elementReduction).toBe(1);
    expect(result.applied.length).toBeGreaterThan(0);
  });

  test('should remove empty elements', async () => {
    const result = await optimizer.optimize(sampleDocument);
    
    // Empty group should be removed
    expect(result.optimizedDocument.elements.length).toBe(2);
    expect(result.optimizedDocument.elements.every(el => el.type !== 'group')).toBe(true);
  });

  test('should round coordinates', async () => {
    const result = await optimizer.optimize(sampleDocument);
    
    const circle = result.optimizedDocument.elements[0];
    if (circle.type === 'circle') {
      expect(circle.cx).toBe(50.12); // Rounded to 2 decimal places
      expect(circle.cy).toBe(50.12);
      expect(circle.r).toBe(25.99);
    }
  });

  test('should remove redundant attributes', async () => {
    const result = await optimizer.optimize(sampleDocument);
    
    // Check that default values are removed
    const circle = result.optimizedDocument.elements[0];
    expect(circle.style?.opacity).toBeUndefined(); // Default opacity=1 removed
    expect(circle.style?.strokeWidth).toBeUndefined(); // Default strokeWidth=1 removed
  });

  test('should use aggressive preset', async () => {
    const aggressiveOptimizer = new SvgDocumentOptimizer(OptimizationPresets.AGGRESSIVE);
    const result = await aggressiveOptimizer.optimize(sampleDocument);

    expect(result.statistics.coordinatesRounded).toBeGreaterThan(0);
    expect(result.statistics.attributesRemoved).toBeGreaterThan(0);
  });

  test('should preserve accessibility when enabled', async () => {
    const docWithAccessibility: SvgDocument = {
      ...sampleDocument,
      title: 'Test SVG',
      description: 'A test SVG document'
    };

    const result = await optimizer.optimize(docWithAccessibility);
    
    expect(result.optimizedDocument.title).toBe('Test SVG');
    expect(result.optimizedDocument.description).toBe('A test SVG document');
  });

  test('should calculate size reduction estimate', async () => {
    const result = await optimizer.optimize(sampleDocument);
    
    expect(result.statistics.estimatedSizeReduction).toBeGreaterThanOrEqual(0);
    expect(typeof result.statistics.estimatedSizeReduction).toBe('number');
  });
});

describe('SVG Document Transformation', () => {
  let engine: SvgTransformationEngine;
  let sampleDocument: SvgDocument;

  beforeEach(() => {
    engine = new SvgTransformationEngine();
    sampleDocument = {
      viewBox: { x: 0, y: 0, width: 200, height: 200 },
      elements: [
        {
          type: 'circle',
          cx: 50,
          cy: 50,
          r: 25
        },
        {
          type: 'rect',
          x: 100,
          y: 100,
          width: 50,
          height: 30
        }
      ]
    };
  });

  test('should scale document', async () => {
    const result = await engine.transform(sampleDocument, 'scale', {
      scale: { x: 2, y: 2 }
    });

    const circle = result.transformedDocument.elements[0];
    if (circle.type === 'circle') {
      expect(circle.cx).toBe(100); // 50 * 2
      expect(circle.cy).toBe(100); // 50 * 2
      expect(circle.r).toBe(50);   // 25 * 2
    }

    const rect = result.transformedDocument.elements[1];
    if (rect.type === 'rect') {
      expect(rect.x).toBe(200);    // 100 * 2
      expect(rect.y).toBe(200);    // 100 * 2
      expect(rect.width).toBe(100); // 50 * 2
      expect(rect.height).toBe(60); // 30 * 2
    }
  });

  test('should translate document', async () => {
    const result = await engine.transform(sampleDocument, 'translate', {
      translate: { x: 10, y: 20 }
    });

    const circle = result.transformedDocument.elements[0];
    if (circle.type === 'circle') {
      expect(circle.cx).toBe(60); // 50 + 10
      expect(circle.cy).toBe(70); // 50 + 20
    }

    const rect = result.transformedDocument.elements[1];
    if (rect.type === 'rect') {
      expect(rect.x).toBe(110);  // 100 + 10
      expect(rect.y).toBe(120);  // 100 + 20
    }
  });

  test('should apply multiple transformations', async () => {
    const transformations = [
      { type: 'scale' as const, params: { scale: { x: 2, y: 2 } } },
      { type: 'translate' as const, params: { translate: { x: 10, y: 10 } } }
    ];

    const result = await engine.transformMultiple(sampleDocument, transformations);

    expect(result.appliedTransforms.length).toBe(2);
    expect(result.appliedTransforms[0].type).toBe('scale');
    expect(result.appliedTransforms[1].type).toBe('translate');

    // Circle should be scaled then translated: (50*2)+10 = 110
    const circle = result.transformedDocument.elements[0];
    if (circle.type === 'circle') {
      expect(circle.cx).toBe(110);
      expect(circle.cy).toBe(110);
    }
  });

  test('should flip horizontally', async () => {
    const result = await engine.transform(sampleDocument, 'flipHorizontal', {});

    // Elements should be reflected across the vertical center of viewBox
    const circle = result.transformedDocument.elements[0];
    if (circle.type === 'circle') {
      expect(circle.cx).toBe(150); // 200 - 50
      expect(circle.cy).toBe(50);  // y unchanged
    }
  });

  test('should flip vertically', async () => {
    const result = await engine.transform(sampleDocument, 'flipVertical', {});

    // Elements should be reflected across the horizontal center of viewBox
    const circle = result.transformedDocument.elements[0];
    if (circle.type === 'circle') {
      expect(circle.cx).toBe(50);  // x unchanged
      expect(circle.cy).toBe(150); // 200 - 50
    }
  });

  test('should rotate document', async () => {
    const result = await engine.transform(sampleDocument, 'rotate', {
      rotate: { angle: 90, centerX: 100, centerY: 100 }
    });

    expect(result.appliedTransforms[0].type).toBe('rotate');
    expect(result.metadata.rotationAngle).toBe(90);
  });

  test('should provide transformation metadata', async () => {
    const result = await engine.transform(sampleDocument, 'scale', {
      scale: { x: 2, y: 3 }
    });

    expect(result.metadata.originalBounds).toBeDefined();
    expect(result.metadata.transformedBounds).toBeDefined();
    expect(result.metadata.scaleFactors.x).toBeCloseTo(2, 1);
    expect(result.metadata.scaleFactors.y).toBeCloseTo(3, 1);
  });
});

describe('Optimization Integration', () => {
  test('should optimize and transform in sequence', async () => {
    const optimizer = new SvgDocumentOptimizer(OptimizationPresets.BALANCED);
    const engine = new SvgTransformationEngine();

    const document: SvgDocument = {
      viewBox: { x: 0, y: 0, width: 100, height: 100 },
      elements: [
        {
          type: 'circle',
          cx: 50.123456,
          cy: 50.123456,
          r: 25.987654,
          style: { fill: 'black', opacity: 1 }
        },
        {
          type: 'group',
          children: [] // Empty group to be removed
        }
      ]
    };

    // First optimize
    const optimizeResult = await optimizer.optimize(document);
    expect(optimizeResult.optimizedDocument.elements.length).toBe(1); // Empty group removed

    // Then transform
    const transformResult = await engine.transform(
      optimizeResult.optimizedDocument, 
      'scale', 
      { scale: { x: 2, y: 2 } }
    );

    const circle = transformResult.transformedDocument.elements[0];
    if (circle.type === 'circle') {
      // Should be optimized coordinates (rounded) then scaled
      expect(circle.cx).toBeCloseTo(100.24, 1); // 50.12 * 2
      expect(circle.r).toBeCloseTo(51.96, 1);   // 25.99 * 2
    }
  });
});
