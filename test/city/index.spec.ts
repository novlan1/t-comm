import {

  RAW_CITY_DATA,
  getAreaCode,
  getAreaData,
  getAreaDataAll,
  getAreaName,
  getCityName,
  getProvName,
} from '../../src/index';

describe('getAreaData', () => {
  const formatData = getAreaData();
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
    });
    expect(formatData[1]).toMatchObject({
      text: '天津',
      code: '12',
      children: [
        {
          text: '天津',
          code: '0',
        },
      ],
    });
  });

  it('more than one city', () => {
    expect(formatData[2]).toMatchObject({
      text: '河北',
      code: '13',
    });
    expect(formatData[2]?.children?.[0].text).toBe('石家庄');
    expect(formatData[2]?.children?.[0].code).toBe('1');
  });
});

describe('getAreaDataAll', () => {
  const formatDataAll = getAreaDataAll();

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
    });
    expect(formatDataAll[1]).toMatchObject({
      text: '北京',
      code: '11',
      children: [
        {
          text: '北京',
          code: '0',
        },
      ],
    });
  });

  it('proveice no limit data', () => {
    expect(formatDataAll[3]).toMatchObject({
      text: '河北',
      code: '13',
    });
    expect(formatDataAll[3]?.children?.[0].text).toBe('全省');
    expect(formatDataAll[3]?.children?.[0].code).toBe('0');
  });
});

describe('getAreaCode', () => {
  it('getAreaCode', () => {
    const res = getAreaCode('山东', '德州');
    expect(res).toStrictEqual(['37', '14']);
  });

  it('empty province', () => {
    const res = getAreaCode();
    expect(res).toStrictEqual([]);
  });

  it('empty city', () => {
    const res = getAreaCode('山东', '');
    expect(res).toStrictEqual(['37']);
  });
});

describe('getAreaName', () => {
  it('getAreaName', () => {
    const res = getAreaName(37, 14);
    expect(res).toStrictEqual(['山东', '德州']);
  });

  it('driect city', () => {
    const res = getAreaName(11);
    expect(res).toStrictEqual(['北京', '北京']);
  });

  it('not exist province', () => {
    const res = getAreaName(9999999);
    expect(res[0]).toBe('');
  });
});

describe('getProvName', () => {
  it('getProvName', () => {
    const res = getProvName(37);
    expect(res).toBe('山东');
  });
});

describe('getCityName', () => {
  it('getCityName', () => {
    const res = getCityName(37, 14);
    expect(res).toBe('德州');
  });

  it('direct city', () => {
    const res = getCityName(11);
    expect(res).toBe('北京');
  });
});

describe('RAW_CITY_DATA', () => {
  it('RAW_CITY_DATA', () => {
    expect(RAW_CITY_DATA).toMatchObject({
      provData: {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
      },
      cityData: {
        11: ['北京'],
        12: ['天津'],
        13: {
          1: '石家庄',
          2: '唐山',
          3: '秦皇岛',
          4: '邯郸',
          5: '邢台',
          6: '保定',
          7: '张家口',
          8: '承德',
          9: '沧州',
          10: '廊坊',
          11: '衡水',
        },
        14: {
          1: '太原',
          2: '大同',
          3: '阳泉',
        },
        65: {
          1: '乌鲁木齐',
          2: '克拉玛依',
          21: '吐鲁番',
          22: '哈密',
          23: '昌吉',
          27: '博尔塔拉',
          28: '巴音郭楞',
        },
      },
    });
  });
});
