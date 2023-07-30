import { get } from '../../src';

describe('lodashGet', () => {
  it('lodashGet', () => {
    expect(get({ a: null }, 'a.b.c', 3)).toBe(3);
    expect(get({ a: undefined }, 'a', 3)).toBe(3);
    expect(get({ a: null }, 'a', 3)).toBe(null);

    expect(get({ a: [{ b: 1 }] }, 'a[0].b', 3)).toBe(1);
    expect(get({ a: { b: { c: { d: 1 } } } }, 'a.b.c.d', 3)).toBe(1);
  });
});
