import { formatBite } from '../../src';

describe('formatBite', () => {
  it('formatBite', () => {
    expect(formatBite(1)).toBe('1B');
    expect(formatBite(10)).toBe('10B');
    expect(formatBite(100)).toBe('100B');
    expect(formatBite(1000)).toBe('1000B');

    expect(formatBite(10000)).toBe('9.77KB');
    expect(formatBite(100000)).toBe('97.66KB');
    expect(formatBite(1000000)).toBe('976.56KB');

    expect(formatBite(10000000)).toBe('9.54MB');
    expect(formatBite(10000000000000)).toBe('9.09TB');
    expect(formatBite(100000000000000000000)).toBe('86.74EB');

    expect(formatBite(8606582)).toBe('8.21MB');
    expect(formatBite(2048249)).toBe('1.95MB');
  });
});
