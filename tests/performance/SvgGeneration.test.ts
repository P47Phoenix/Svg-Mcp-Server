/**
 * SVG Generation Performance Tests
 * Task #12: Comprehensive Testing Infrastructure
 */

import { jest } from '@jest/globals';
import { SvgMcpServer } from '../../src/server/SvgMcpServer.js';
import { PerformanceBenchmark, assertPerformance } from './PerformanceBenchmark.js';

// Mock dependencies
jest.mock('../../src/utils/logger.js');

describe('SVG Generation Performance Tests', () => {
  let server: SvgMcpServer;
  let benchmark: PerformanceBenchmark;

  beforeAll(() => {
    server = new SvgMcpServer({
      name: 'performance-test-server',
      version: '1.0.0',
      maxSvgSize: 50000,
      enableDebug: false,
    });

    benchmark = new PerformanceBenchmark({
      warmupIterations: 5,
      benchmarkIterations: 50,
      timeoutMs: 2000,
      maxMemoryMB: 256,
      concurrentRequests: 5
    });
  });

  describe('Simple SVG Generation', () => {
    it('should generate simple SVGs within performance requirements', async () => {
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) throw new Error('generate_svg tool not found');

      const testDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [
          {
            type: 'rect',
            x: 10,
            y: 10,
            width: 80,
            height: 80,
            fill: 'blue'
          }
        ]
      };

      const metrics = await benchmark.run(async () => {
        await generateTool.execute({
          document: testDocument,
          optimize: false,
          validate: false
        });
      }, 'Simple SVG Generation');

      console.log('Simple SVG Generation Metrics:', metrics);

      assertPerformance(metrics, {
        maxAverageExecutionTime: 100,  // 100ms average
        maxP95ExecutionTime: 200,      // 200ms P95
        maxMemoryUsageMB: 50,          // 50MB memory
        minThroughputPerSecond: 10,    // 10 ops/sec minimum
        maxErrorRate: 0.01             // 1% error rate max
      });
    });

    it('should handle concurrent simple SVG generation', async () => {
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) throw new Error('generate_svg tool not found');

      const testDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [
          {
            type: 'circle',
            cx: 50,
            cy: 50,
            r: 40,
            fill: 'red'
          }
        ]
      };

      const metrics = await benchmark.runConcurrent(async () => {
        await generateTool.execute({
          document: testDocument,
          optimize: false,
          validate: false
        });
      }, 'Concurrent Simple SVG Generation');

      console.log('Concurrent Simple SVG Generation Metrics:', metrics);

      assertPerformance(metrics, {
        maxAverageExecutionTime: 150,  // Slightly higher for concurrent
        maxP95ExecutionTime: 300,
        maxMemoryUsageMB: 100,
        minThroughputPerSecond: 8,     // Lower throughput acceptable for concurrent
        maxErrorRate: 0.02
      });
    });
  });

  describe('Complex SVG Generation', () => {
    it('should generate complex SVGs within performance requirements', async () => {
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) throw new Error('generate_svg tool not found');

      const complexDocument = {
        viewBox: { x: 0, y: 0, width: 500, height: 500 },
        elements: Array.from({ length: 50 }, (_, i) => ({
          type: 'circle',
          cx: (i % 10) * 50 + 25,
          cy: Math.floor(i / 10) * 50 + 25,
          r: 20,
          fill: `hsl(${i * 7.2}, 70%, 50%)`,
          stroke: '#000000',
          strokeWidth: 1
        }))
      };

      const metrics = await benchmark.run(async () => {
        await generateTool.execute({
          document: complexDocument,
          optimize: false,
          validate: false
        });
      }, 'Complex SVG Generation');

      console.log('Complex SVG Generation Metrics:', metrics);

      assertPerformance(metrics, {
        maxAverageExecutionTime: 500,  // 500ms for complex SVGs
        maxP95ExecutionTime: 1000,     // 1s P95
        maxMemoryUsageMB: 100,
        minThroughputPerSecond: 2,     // Lower throughput for complex SVGs
        maxErrorRate: 0.01
      });
    });

    it('should scale reasonably with document complexity', async () => {
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) throw new Error('generate_svg tool not found');

      // Test with different complexity levels
      const createDocument = (elementCount: number) => ({
        viewBox: { x: 0, y: 0, width: 500, height: 500 },
        elements: Array.from({ length: elementCount }, (_, i) => ({
          type: 'rect',
          x: (i % 20) * 25,
          y: Math.floor(i / 20) * 25,
          width: 20,
          height: 20,
          fill: `hsl(${i * 3.6}, 50%, 50%)`
        }))
      });

      const metrics10 = await benchmark.run(async () => {
        await generateTool.execute({
          document: createDocument(10),
          optimize: false,
          validate: false
        });
      }, 'SVG with 10 elements');

      const metrics100 = await benchmark.run(async () => {
        await generateTool.execute({
          document: createDocument(100),
          optimize: false,
          validate: false
        });
      }, 'SVG with 100 elements');

      console.log('10 elements metrics:', metrics10);
      console.log('100 elements metrics:', metrics100);

      // Verify that 100 elements doesn't take more than 10x longer than 10 elements
      const scalingFactor = metrics100.averageExecutionTime / metrics10.averageExecutionTime;
      expect(scalingFactor).toBeLessThan(15); // Should scale reasonably
    });
  });

  describe('Validation Performance', () => {
    it('should validate SVGs within performance requirements', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const testDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            fill: '#000000'
          }
        ]
      };

      const metrics = await benchmark.run(async () => {
        await validateTool.execute({
          document: testDocument,
          preset: 'standard',
          includeRecommendations: false,
          includeQuickFixes: false
        });
      }, 'SVG Validation');

      console.log('SVG Validation Metrics:', metrics);

      assertPerformance(metrics, {
        maxAverageExecutionTime: 50,   // 50ms for validation
        maxP95ExecutionTime: 100,
        maxMemoryUsageMB: 30,
        minThroughputPerSecond: 20,    // Higher throughput for validation
        maxErrorRate: 0.01
      });
    });

    it('should handle comprehensive validation efficiently', async () => {
      const validateTool = server.getTools().find(t => t.name === 'validate_svg');
      if (!validateTool) throw new Error('validate_svg tool not found');

      const complexDocument = {
        viewBox: { x: 0, y: 0, width: 200, height: 200 },
        elements: [
          {
            type: 'g',
            children: Array.from({ length: 20 }, (_, i) => ({
              type: 'circle',
              cx: (i % 5) * 40 + 20,
              cy: Math.floor(i / 5) * 40 + 20,
              r: 15,
              fill: `hsl(${i * 18}, 60%, 50%)`
            }))
          }
        ]
      };

      const metrics = await benchmark.run(async () => {
        await validateTool.execute({
          document: complexDocument,
          preset: 'strict',
          includeRecommendations: true,
          includeQuickFixes: true
        });
      }, 'Comprehensive SVG Validation');

      console.log('Comprehensive SVG Validation Metrics:', metrics);

      assertPerformance(metrics, {
        maxAverageExecutionTime: 200,  // 200ms for comprehensive validation
        maxP95ExecutionTime: 400,
        maxMemoryUsageMB: 50,
        minThroughputPerSecond: 5,
        maxErrorRate: 0.01
      });
    });
  });

  describe('Optimization Performance', () => {
    it('should optimize SVGs within performance requirements', async () => {
      const optimizeTool = server.getTools().find(t => t.name === 'optimize_svg');
      if (!optimizeTool) throw new Error('optimize_svg tool not found');

      const unoptimizedDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [
          {
            type: 'rect',
            x: 0.123456789,
            y: 0.987654321,
            width: 100.00000001,
            height: 100.00000001,
            fill: '#000000'
          }
        ]
      };

      const metrics = await benchmark.run(async () => {
        await optimizeTool.execute({
          document: unoptimizedDocument,
          preset: 'balanced',
          options: {
            roundCoordinates: true,
            coordinatePrecision: 2
          }
        });
      }, 'SVG Optimization');

      console.log('SVG Optimization Metrics:', metrics);

      assertPerformance(metrics, {
        maxAverageExecutionTime: 100,
        maxP95ExecutionTime: 200,
        maxMemoryUsageMB: 40,
        minThroughputPerSecond: 10,
        maxErrorRate: 0.01
      });
    });
  });

  describe('Template Performance', () => {
    it('should list templates efficiently', async () => {
      const listTool = server.getTools().find(t => t.name === 'list_templates');
      if (!listTool) throw new Error('list_templates tool not found');

      const metrics = await benchmark.run(async () => {
        await listTool.execute({
          query: '',
          tags: [],
          category: undefined,
          author: undefined
        });
      }, 'Template Listing');

      console.log('Template Listing Metrics:', metrics);

      assertPerformance(metrics, {
        maxAverageExecutionTime: 20,   // Very fast for listing
        maxP95ExecutionTime: 50,
        maxMemoryUsageMB: 20,
        minThroughputPerSecond: 50,
        maxErrorRate: 0.01
      });
    });

    it('should instantiate templates efficiently', async () => {
      // First get a template
      const listTool = server.getTools().find(t => t.name === 'list_templates');
      const instantiateTool = server.getTools().find(t => t.name === 'instantiate_template');
      
      if (!listTool || !instantiateTool) {
        throw new Error('Required tools not found');
      }

      const listResult = await listTool.execute({});
      const templates = JSON.parse(listResult.content[0].text).templates;
      
      if (templates.length === 0) {
        throw new Error('No templates available for testing');
      }

      const template = templates[0];

      const metrics = await benchmark.run(async () => {
        await instantiateTool.execute({
          templateId: template.id,
          variables: {},
          format: 'svg'
        });
      }, 'Template Instantiation');

      console.log('Template Instantiation Metrics:', metrics);

      assertPerformance(metrics, {
        maxAverageExecutionTime: 50,
        maxP95ExecutionTime: 100,
        maxMemoryUsageMB: 30,
        minThroughputPerSecond: 20,
        maxErrorRate: 0.01
      });
    });
  });

  describe('Memory Efficiency', () => {
    it('should not leak memory during repeated operations', async () => {
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) throw new Error('generate_svg tool not found');

      const testDocument = {
        viewBox: { x: 0, y: 0, width: 100, height: 100 },
        elements: [
          {
            type: 'rect',
            x: 10,
            y: 10,
            width: 80,
            height: 80,
            fill: 'green'
          }
        ]
      };

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const initialMemory = process.memoryUsage().heapUsed;

      // Run many operations
      for (let i = 0; i < 100; i++) {
        await generateTool.execute({
          document: testDocument,
          optimize: false,
          validate: false
        });
      }

      // Force garbage collection again
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryGrowth = (finalMemory - initialMemory) / 1024 / 1024; // MB

      console.log(`Memory growth after 100 operations: ${memoryGrowth.toFixed(2)}MB`);

      // Memory growth should be minimal (less than 10MB)
      expect(memoryGrowth).toBeLessThan(10);
    });
  });

  describe('Stress Tests', () => {
    it('should handle maximum document size efficiently', async () => {
      const generateTool = server.getTools().find(t => t.name === 'generate_svg');
      if (!generateTool) throw new Error('generate_svg tool not found');

      // Create a document near the size limit
      const maxElements = 1000;
      const largeDocument = {
        viewBox: { x: 0, y: 0, width: 1000, height: 1000 },
        elements: Array.from({ length: maxElements }, (_, i) => ({
          type: 'circle',
          cx: Math.random() * 1000,
          cy: Math.random() * 1000,
          r: 2,
          fill: `hsl(${i * 0.36}, 70%, 50%)`
        }))
      };

      const metrics = await benchmark.run(async () => {
        await generateTool.execute({
          document: largeDocument,
          optimize: true,
          validate: false
        });
      }, 'Maximum Size Document');

      console.log('Maximum Size Document Metrics:', metrics);

      // More lenient requirements for stress test
      assertPerformance(metrics, {
        maxAverageExecutionTime: 2000,  // 2 seconds for very large documents
        maxP95ExecutionTime: 4000,
        maxMemoryUsageMB: 200,
        minThroughputPerSecond: 0.5,
        maxErrorRate: 0.05  // 5% error rate acceptable for stress test
      });
    });
  });
});
