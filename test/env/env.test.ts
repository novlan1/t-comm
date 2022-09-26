import { getEnvUAType } from '../../src';

describe('getEnvUAType', () => {
  it('getEnvUAType', () => {
    expect(typeof getEnvUAType()).toBe('object');

    expect(getEnvUAType().isQQ).toBe(false);
  });
});
