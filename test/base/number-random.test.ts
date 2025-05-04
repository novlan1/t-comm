import {
  getRandomNumber,
} from '../../src';

describe('getRandomNumber', () => {
  it('getRandomNumber', () => {
    expect(getRandomNumber(10, 20)).toBeLessThan(20);
    expect(getRandomNumber(10, 20)).toBeGreaterThan(10);
    expect(getRandomNumber(1, 100)).toBeGreaterThan(1);
  });
});
