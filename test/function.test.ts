import { toHumpObj } from '../src'

describe('toHumpObj', () => {
  it('', () => {
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
    }
    const expectRes = {
      aA: 'a',
      bB: [{ bbB: 'b' }],
      c: { ddD: 'd', e: { eeE: 'e' } },
    }
    expect(JSON.stringify(toHumpObj(obj))).toBe(JSON.stringify(expectRes))
  })
})
