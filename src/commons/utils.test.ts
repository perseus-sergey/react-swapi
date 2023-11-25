import { describe, it, expect } from 'vitest';
import { bigNumberCommaSeparate, getCurrentUrl, getUrlParam } from './utils';

describe('bigNumberCommaSeparate tests', () => {
  it('expect equal', () => {
    const value = 2000000;
    expect(bigNumberCommaSeparate(value)).toBe('2.000.000');
  });

  it('expect equal', () => {
    const value = 123000000;
    expect(bigNumberCommaSeparate(value)).toBe('123.000.000');
  });

  it('expect equal', () => {
    const value = 123;
    expect(bigNumberCommaSeparate(value)).toBe('123');
  });
});

describe('getCurrentUrl tests', () => {
  it('expect equal', () => {
    const url = 'http://localhost:5173/?q=search-value&page=1';
    expect(getCurrentUrl(url)).toBe('/?q=search-value&page=1');
  });

  it('expect equal', () => {
    const url = 'http://localhost:5173/planet/2/?q=yes&page=1';
    expect(getCurrentUrl(url)).toBe('/?q=yes&page=1');
  });

  it('expect null', () => {
    const url = 'http://localhost:5173';
    expect(getCurrentUrl(url)).toBe(null);
  });
});

describe('getUrlParam tests', () => {
  it('expect equal', () => {
    const paramName = 'q';
    const uRLSearchParams = '?q=test&page=2';
    expect(getUrlParam(paramName, uRLSearchParams)).toBe('test');
  });

  it('expect equal', () => {
    const paramName = 'page';
    const uRLSearchParams = '?q=test&page=2';
    expect(getUrlParam(paramName, uRLSearchParams)).toBe('2');
  });

  it('expect equal', () => {
    const paramName = 'page';
    const uRLSearchParams = '?q=';
    expect(getUrlParam(paramName, uRLSearchParams)).toBe('');
  });
});
