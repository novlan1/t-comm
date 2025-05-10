import { deepSet } from '../../src';


describe('deepSet', () => {
  it('deepSet', () => {
    const obj = { a: { b: 1 } };
    deepSet('a.c', obj, 2);
    expect(obj).toMatchObject({ a: { b: 1, c: 2 } });
  });
});
