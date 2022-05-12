import { isExternal, isQQNumber } from '../../src'

describe('isExternal', () => {
  it('', () => {
    expect(isExternal('ttt')).toBe(false)
    expect(isExternal('http://baidu.com')).toBe(true)
  })
})

describe('isQQNumber', () => {
  it('', () => {
    expect(isQQNumber('ddd')).toBe(false)
    expect(isQQNumber(777777)).toBe(true)
  })
})
