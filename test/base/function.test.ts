import { parseFunction } from '../../src';

describe('parseFunction', () => {
  it('parseFunction', () => {
    const func = parseFunction('()=>console.log(1)');
    expect(typeof func).toBe('function');
  });

  it('not string', () => {
    expect(parseFunction(1)).toBe(1);
  });
});
