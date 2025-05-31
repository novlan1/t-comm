import {
  getRandomNumber,
  random,
} from '../../src';

describe('getRandomNumber', () => {
  it('getRandomNumber', () => {
    expect(getRandomNumber(10, 20)).toBeLessThan(20);
    expect(getRandomNumber(10, 20)).toBeGreaterThan(10);
    expect(getRandomNumber(1, 100)).toBeGreaterThan(1);
  });
});

describe('random', () => {
  it('random', () => {
    expect(random(0, 19)).toBeLessThan(20);
    expect(random(0, 0)).toBe(0);
  });
});
