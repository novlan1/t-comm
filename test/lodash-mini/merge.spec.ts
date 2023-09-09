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

  it('merge falsy', () => {
    expect(merge({
      isUseVueLoader: true,
      isVue3: false,
      useXSS: true,

      a: 1,
    }, {
      useXSS: false,
      a: null,
    })).toEqual({
      isUseVueLoader: true,
      isVue3: false,
      useXSS: false,
      a: null,
    });


    const {
      isUseVueLoader,
      isVue3,
      useXSS,
      terserFunctions,
    } = merge({}, {
      isUseVueLoader: true,
      isVue3: false,
      useXSS: true,
      terserFunctions: ['console.log'],
    }, {
      isVue3: true,
      useXSS: false,
      terserFunctions: [],
    });
    expect(isUseVueLoader).toBe(true);
    expect(isVue3).toBe(true);
    expect(useXSS).toBe(false);
    expect(terserFunctions).toMatchObject(['console.log']);
  });
});
