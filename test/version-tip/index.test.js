import { shouldGenVersion } from '../../src';

describe('shouldGenVersion', () => {
  it('shouldGenVersion', () => {
    expect(typeof shouldGenVersion()).toBe('number');
    expect(shouldGenVersion()).toBeLessThan(3);
  });
});
