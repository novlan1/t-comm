import {
  getCityName,
  getProvName,
  getAreaName,
  getAreaCode,
  getAreaData,
  getAllAreaData,
} from '../../src'

describe('getAreaData', () => {
  const formatData = getAreaData()

  it('first object of area', () => {
    expect(formatData[0]).toMatchObject({
      text: '北京',
      code: '11',
      children: [
        {
          text: '北京',
          code: '0',
        },
      ],
    })
    expect(formatData[1]).toMatchObject({
      text: '天津',
      code: '12',
      children: [
        {
          text: '天津',
          code: '0',
        },
      ],
    })
  })
  it('more than one city', () => {
    expect(formatData[2]).toMatchObject({
      text: '河北',
      code: '13',
    })
    expect(formatData[2].children[0].text).toBe('石家庄')
    expect(formatData[2].children[0].code).toBe('1')
  })
})

describe('getAllAreaData', () => {
  const formatDataAll = getAllAreaData()

  it('country no limit data', () => {
    expect(formatDataAll[0]).toMatchObject({
      text: '全国',
      code: '0',
      children: [
        {
          text: '不限',
          code: '0',
        },
      ],
    })
    expect(formatDataAll[1]).toMatchObject({
      text: '北京',
      code: '11',
      children: [
        {
          text: '北京',
          code: '0',
        },
      ],
    })
  })

  it('province no limit data', () => {
    expect(formatDataAll[3]).toMatchObject({
      text: '河北',
      code: '13',
    })
    expect(formatDataAll[3].children[0].text).toBe('全省')
    expect(formatDataAll[3].children[0].code).toBe('0')
  })
})

describe('getAreaCode', () => {
  it('getAreaCode', () => {
    const res = getAreaCode('山东', '德州')
    expect(res).toStrictEqual(['37', '14'])
  })

  it('empty province', () => {
    const res = getAreaCode()
    expect(res).toStrictEqual([])
  })

  it('empty city', () => {
    const res = getAreaCode('山东', '')
    expect(res).toStrictEqual(['37'])
  })
})

describe('getCityName', () => {
  it('getCityName', () => {
    expect(getCityName(37, 14)).toBe('德州')
  })

  it('direct city', () => {
    expect(getCityName(11)).toBe('北京')
  })
})

describe('getProvName', () => {
  it('getProvName', () => {
    expect(getProvName(37)).toBe('山东')
  })
})

describe('getAreaName', () => {
  it('getAreaName', () => {
    expect(getAreaName(37, 14)).toStrictEqual(['山东', '德州'])
  })

  it('direct city', () => {
    expect(getAreaName(11)).toStrictEqual(['北京', '北京'])
    expect(getAreaName(11, 0)).toStrictEqual(['北京', '北京'])
  })

  it('not exist province', () => {
    expect(getAreaName(9999999)).toStrictEqual(['', ''])
  })
})
