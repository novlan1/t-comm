import { genQueryToStr } from '../../src';


describe('genQueryToStr', () => {
  it('genQueryToStr', () => {
    expect(genQueryToStr({
      a: 1,
      b: 2,
    })).toBe('a=1&b=2');
  });
});
