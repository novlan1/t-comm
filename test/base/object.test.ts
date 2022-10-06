import { toHumpObj, extend } from '../../src';

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
