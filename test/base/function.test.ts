import { parseFunction, cached } from '../../src';

describe('parseFunction', () => {
  it('parseFunction.string', () => {
    const func = parseFunction('() => {return 1}');
    expect(typeof func).toBe('function');
    expect(func()).toBe(1);
  });

  it('parseFunction.function', () => {
    const func = parseFunction(() => 1);
    expect(typeof func).toBe('function');
    expect(func()).toBe(1);
  });

  it('parseFunction.error', () => {
    const spyConsoleError = jest.spyOn(console, 'error');
    const func = parseFunction('()=');
    expect(func).toBe('');
    expect(spyConsoleError).toHaveBeenCalled();
  });
});


describe('cached', () => {
  it('cached', () => {
    function test(a: number) {
      return a + 2;
    }
    expect(cached(test)(1)).toBe(3);
  });
});
