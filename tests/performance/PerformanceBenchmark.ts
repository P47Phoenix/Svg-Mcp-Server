/**
 * Performance Testing Configuration
 * Task #12: Comprehensive Testing Infrastructure
 */

export interface PerformanceTestConfig {
  warmupIterations: number;
  benchmarkIterations: number;
  timeoutMs: number;
  maxMemoryMB: number;
  concurrentRequests: number;
}

export const defaultPerformanceConfig: PerformanceTestConfig = {
  warmupIterations: 10,
  benchmarkIterations: 100,
  timeoutMs: 5000,
  maxMemoryMB: 512,
  concurrentRequests: 10
};

export interface PerformanceMetrics {
  averageExecutionTime: number;
  minExecutionTime: number;
  maxExecutionTime: number;
  p95ExecutionTime: number;
  p99ExecutionTime: number;
  memoryUsageMB: number;
  throughputPerSecond: number;
  errorRate: number;
}

export class PerformanceBenchmark {
  private config: PerformanceTestConfig;
  private results: number[] = [];
  private errors: number = 0;

  constructor(config: Partial<PerformanceTestConfig> = {}) {
    this.config = { ...defaultPerformanceConfig, ...config };
  }

  async run<T>(
    testFunction: () => Promise<T>,
    testName: string
  ): Promise<PerformanceMetrics> {
    console.log(`Starting performance benchmark: ${testName}`);
    
    // Warmup phase
    console.log(`Warmup phase: ${this.config.warmupIterations} iterations`);
    for (let i = 0; i < this.config.warmupIterations; i++) {
      try {
        await testFunction();
      } catch (error) {
        // Ignore warmup errors
      }
    }

    // Benchmark phase
    console.log(`Benchmark phase: ${this.config.benchmarkIterations} iterations`);
    this.results = [];
    this.errors = 0;

    const startMemory = this.getMemoryUsage();
    const startTime = Date.now();

    for (let i = 0; i < this.config.benchmarkIterations; i++) {
      const iterationStart = performance.now();
      
      try {
        await Promise.race([
          testFunction(),
          this.timeout(this.config.timeoutMs)
        ]);
        
        const iterationEnd = performance.now();
        this.results.push(iterationEnd - iterationStart);
      } catch (error) {
        this.errors++;
        console.warn(`Iteration ${i + 1} failed:`, error);
      }
    }

    const endTime = Date.now();
    const endMemory = this.getMemoryUsage();

    return this.calculateMetrics(
      startTime,
      endTime,
      endMemory - startMemory
    );
  }

  async runConcurrent<T>(
    testFunction: () => Promise<T>,
    testName: string
  ): Promise<PerformanceMetrics> {
    console.log(`Starting concurrent performance benchmark: ${testName}`);
    
    const iterations = Math.floor(this.config.benchmarkIterations / this.config.concurrentRequests);
    const batches: Promise<void>[] = [];
    
    this.results = [];
    this.errors = 0;

    const startMemory = this.getMemoryUsage();
    const startTime = Date.now();

    for (let batch = 0; batch < iterations; batch++) {
      const batchPromises = Array.from({ length: this.config.concurrentRequests }, async () => {
        const iterationStart = performance.now();
        
        try {
          await Promise.race([
            testFunction(),
            this.timeout(this.config.timeoutMs)
          ]);
          
          const iterationEnd = performance.now();
          this.results.push(iterationEnd - iterationStart);
        } catch (error) {
          this.errors++;
        }
      });

      batches.push(Promise.all(batchPromises).then(() => {}));
    }

    await Promise.all(batches);

    const endTime = Date.now();
    const endMemory = this.getMemoryUsage();

    return this.calculateMetrics(
      startTime,
      endTime,
      endMemory - startMemory
    );
  }

  private calculateMetrics(
    startTime: number,
    endTime: number,
    memoryDelta: number
  ): PerformanceMetrics {
    if (this.results.length === 0) {
      throw new Error('No successful benchmark results');
    }

    const sortedResults = [...this.results].sort((a, b) => a - b);
    const totalTime = endTime - startTime;
    const successfulIterations = this.results.length;
    
    return {
      averageExecutionTime: this.results.reduce((sum, time) => sum + time, 0) / this.results.length,
      minExecutionTime: sortedResults[0],
      maxExecutionTime: sortedResults[sortedResults.length - 1],
      p95ExecutionTime: sortedResults[Math.floor(sortedResults.length * 0.95)],
      p99ExecutionTime: sortedResults[Math.floor(sortedResults.length * 0.99)],
      memoryUsageMB: memoryDelta,
      throughputPerSecond: (successfulIterations / totalTime) * 1000,
      errorRate: this.errors / (successfulIterations + this.errors)
    };
  }

  private async timeout(ms: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Operation timed out')), ms);
    });
  }

  private getMemoryUsage(): number {
    const memUsage = process.memoryUsage();
    return memUsage.heapUsed / 1024 / 1024; // Convert to MB
  }

  static async compare(
    testA: () => Promise<any>,
    testB: () => Promise<any>,
    testNameA: string,
    testNameB: string,
    config?: Partial<PerformanceTestConfig>
  ): Promise<{
    testA: PerformanceMetrics;
    testB: PerformanceMetrics;
    comparison: {
      speedupFactor: number;
      memoryDifference: number;
      throughputImprovement: number;
    };
  }> {
    const benchmark = new PerformanceBenchmark(config);
    
    const metricsA = await benchmark.run(testA, testNameA);
    const metricsB = await benchmark.run(testB, testNameB);

    return {
      testA: metricsA,
      testB: metricsB,
      comparison: {
        speedupFactor: metricsA.averageExecutionTime / metricsB.averageExecutionTime,
        memoryDifference: metricsB.memoryUsageMB - metricsA.memoryUsageMB,
        throughputImprovement: (metricsB.throughputPerSecond - metricsA.throughputPerSecond) / metricsA.throughputPerSecond
      }
    };
  }
}

export function assertPerformance(
  metrics: PerformanceMetrics,
  requirements: Partial<{
    maxAverageExecutionTime: number;
    maxP95ExecutionTime: number;
    maxMemoryUsageMB: number;
    minThroughputPerSecond: number;
    maxErrorRate: number;
  }>
): void {
  if (requirements.maxAverageExecutionTime !== undefined) {
    if (metrics.averageExecutionTime > requirements.maxAverageExecutionTime) {
      throw new Error(
        `Average execution time ${metrics.averageExecutionTime.toFixed(2)}ms exceeds requirement ${requirements.maxAverageExecutionTime}ms`
      );
    }
  }

  if (requirements.maxP95ExecutionTime !== undefined) {
    if (metrics.p95ExecutionTime > requirements.maxP95ExecutionTime) {
      throw new Error(
        `P95 execution time ${metrics.p95ExecutionTime.toFixed(2)}ms exceeds requirement ${requirements.maxP95ExecutionTime}ms`
      );
    }
  }

  if (requirements.maxMemoryUsageMB !== undefined) {
    if (metrics.memoryUsageMB > requirements.maxMemoryUsageMB) {
      throw new Error(
        `Memory usage ${metrics.memoryUsageMB.toFixed(2)}MB exceeds requirement ${requirements.maxMemoryUsageMB}MB`
      );
    }
  }

  if (requirements.minThroughputPerSecond !== undefined) {
    if (metrics.throughputPerSecond < requirements.minThroughputPerSecond) {
      throw new Error(
        `Throughput ${metrics.throughputPerSecond.toFixed(2)} ops/sec below requirement ${requirements.minThroughputPerSecond} ops/sec`
      );
    }
  }

  if (requirements.maxErrorRate !== undefined) {
    if (metrics.errorRate > requirements.maxErrorRate) {
      throw new Error(
        `Error rate ${(metrics.errorRate * 100).toFixed(2)}% exceeds requirement ${(requirements.maxErrorRate * 100).toFixed(2)}%`
      );
    }
  }
}
