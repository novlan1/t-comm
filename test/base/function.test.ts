import { parseFunction, cached } from '../../src';

describe('parseFunction', () => {
  it('parseFunction', () => {
    const func = parseFunction('()=>console.log(1)');
    expect(typeof func).toBe('function');
  });

  it('not string', () => {
    expect(parseFunction(1)).toBe(1);
  });
});


describe('cached', () => {
  it('cached', () => {
    function test(a) {
      return a + 2;
    }
    expect(cached(test)(1)).toBe(3);
  });
});
