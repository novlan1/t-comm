import { merge } from '../../src';
// import merge from 'lodash-es/merge';

describe('merge', () => {
  it('merge', () => {
    expect(merge({ a: [{ b: 2 }] }, { a: [{ c: 2 }] })).toEqual({
      a: [{ b: 2 }, { c: 2 }],
    });
    expect(merge({ o: { a: 3 } }, { o: { b: 4 } })).toEqual({
      o: { a: 3, b: 4 },
    });
  });
});
