import { getEnvUAType } from '../../src'

describe('getEnvUAType', () => {
  it('', () => {
    expect(typeof getEnvUAType()).toBe('object')

    expect(getEnvUAType().isQQ).toBe(false)
  })
})
