import { toHumpObj, extend, isObjectEqual, sortObjectByKey } from '../../src';

describe('sortObjectByKey', () => {
  it('sortObjectByKey', () => {
    const obj = {
      b: 2,
      a: 1,
      c: {
        d: 5,
      },
    };

    expect(JSON.stringify(sortObjectByKey(obj))).toBe(JSON.stringify({
      a: 1,
      b: 2,
      c: {
        d: 5,
      },
    }));
  });
});

describe('toHumpObj', () => {
  it('toHumpObj', () => {
    const obj = {
      a_a: 'a',
      b_b: [
        {
          bb_b: 'b',
        },
      ],
      c: {
        dd_d: 'd',
        e: {
          ee_e: 'e',
        },
      },
    };
    const expectRes = {
      aA: 'a',
      bB: [{ bbB: 'b' }],
      c: { ddD: 'd', e: { eeE: 'e' } },
    };
    expect(JSON.stringify(toHumpObj(obj))).toBe(JSON.stringify(expectRes));
  });
});

describe('extend', () => {
  it('extend', () => {
    expect(extend({ name: 'lee' }, { age: 3 })).toEqual({
      name: 'lee',
      age: 3,
    });
  });
});


describe('isObjectEqual', () => {
  it('isObjectEqual', () => {
    expect(isObjectEqual(true, false)).toBe(false);
    expect(isObjectEqual(0, false)).toBe(false);
    expect(isObjectEqual(1, '1')).toBe(false);

    expect(isObjectEqual(null, null)).toBe(true);
    expect(isObjectEqual(null, undefined)).toBe(false);
    expect(isObjectEqual(null, false)).toBe(false);
    expect(isObjectEqual(null, '')).toBe(false);
    expect(isObjectEqual(null, [])).toBe(false);

    expect(isObjectEqual(undefined, undefined)).toBe(true);
    expect(isObjectEqual(undefined, false)).toBe(false);
    expect(isObjectEqual(undefined, '')).toBe(false);
    expect(isObjectEqual(undefined, [])).toBe(false);

    expect(isObjectEqual([], [])).toBe(true);
    expect(isObjectEqual([1], [1])).toBe(true);
    expect(isObjectEqual([{ a: { b: 1 } }], [{ a: { b: 1 } }])).toBe(true);
    expect(isObjectEqual([{ a: { b: 1 } }], [{ a: { b: 2 } }])).toBe(false);

    expect(isObjectEqual({}, {})).toBe(true);
    expect(isObjectEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(isObjectEqual({ a: 1 }, { a: 2 })).toBe(false);
  });
});
