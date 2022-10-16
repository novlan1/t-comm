import { isIdCard } from '../../src';

describe('isIdCard', () => {
  it('isIdCard', () => {
    expect(isIdCard(1123)).toBe(false);
    expect(isIdCard('34052419800101001X')).toBe(true);
  });
});
