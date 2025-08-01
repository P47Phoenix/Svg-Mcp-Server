// Sample test to verify Jest configuration
import { describe, it, expect } from '@jest/globals';

describe('Jest Configuration', () => {
  it('should run TypeScript tests', () => {
    const result = 'TypeScript + Jest is working';
    expect(result).toBe('TypeScript + Jest is working');
  });

  it('should support async tests', async () => {
    const promise = Promise.resolve('async works');
    await expect(promise).resolves.toBe('async works');
  });

  it('should have custom SVG matcher', () => {
    const validSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"></svg>';
    expect(validSvg).toBeValidSvg();
  });

  it('should have mocked console methods', () => {
    console.log('test message');
    expect(console.log).toHaveBeenCalledWith('test message');
  });
});
