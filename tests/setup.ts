// Jest setup file for global test configuration
import { jest } from '@jest/globals';

// Increase test timeout for longer operations
jest.setTimeout(30000);

// Mock console methods in tests to avoid noise
const originalConsole = { ...console };

beforeEach(() => {
  // Reset console mocks before each test
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
  console.info = jest.fn();
  console.debug = jest.fn();
});

afterEach(() => {
  // Restore console after each test
  Object.assign(console, originalConsole);
});

// Global test helpers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidSvg(): R;
    }
  }
}

// Custom Jest matcher for SVG validation
expect.extend({
  toBeValidSvg(received: string) {
    const isSvg = received.includes('<svg') && received.includes('</svg>');
    const hasViewBox = received.includes('viewBox');
    const hasNamespace = received.includes('xmlns');
    
    if (isSvg && hasViewBox && hasNamespace) {
      return {
        message: () => `Expected ${received} not to be a valid SVG`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${received} to be a valid SVG with viewBox and xmlns`,
        pass: false,
      };
    }
  },
});

// Environment setup
process.env.NODE_ENV = 'test';
