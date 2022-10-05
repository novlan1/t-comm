import { toUnicodeAt, toUnicode } from '../../src';

/**
 * toUnicodeAt
 */
describe('toUnicodeAt', () => {
  it('ABC => \\u0041', () => {
    expect(toUnicodeAt('ABC')).toBe('\\u0041');
  });
  it('ABC, 1 => \\u0042', () => {
    expect(toUnicodeAt('ABC', 1)).toBe('\\u0042');
  });
});

/**
 * toUnicode
 */
describe('toUnicode', () => {
  it('ABC => \\u0041\\u0042\\u0043', () => {
    expect(toUnicode('ABC')).toBe('\\u0041\\u0042\\u0043');
  });
});
