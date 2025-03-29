import {
  flattenPreData,
  getKeyValuesMap,
  getMaxAndMinIdx,
  isListAllEqual,
} from '../../src';


describe('isListAllEqual', () => {
  it('isListAllEqual', () => {
    expect(isListAllEqual([1, 1, 1, 1, 1, 1])).toBe(true);
    expect(isListAllEqual([1, 1, 1, 1, 1, 2])).toBe(false);
  });
});


describe('getKeyValuesMap', () => {
  it('getKeyValuesMap', () => {
    expect(typeof getKeyValuesMap([])).toBe('object');
    expect(Object.keys(getKeyValuesMap([])).length).toBe(0);
  });

  it('not empty', () => {
    const data = [
      {
        Project: {
          value: 'x',
        },
      }, {
        Project: {
          value: 'y',
        },
      }];
    expect(getKeyValuesMap(data)).toMatchObject({
      Project: ['x', 'y'],
    });
  });

  it('do not have value property', () => {
    const data = [
      {
        Project: 'x',
      }, {
        Project: 'y',
      }];
    expect(getKeyValuesMap(data)).toMatchObject({
      Project: ['x', 'y'],
    });
  });
});


describe('getMaxAndMinIdx', () => {
  it('getMaxAndMinIdx', () => {
    const res = getMaxAndMinIdx([
      {
        ProjectName: { name: 'ProjectName', value: '麻将赛事' },
        PagePv: { name: 'PagePv', value: 2877 },
      }, {
        ProjectName: { name: 'ProjectName', value: '斗地主赛事' },
        PagePv: { name: 'PagePv', value: 7 },
      },
    ]);

    expect(res).toEqual([
      {
        ProjectName: { name: 'ProjectName', value: '麻将赛事' },
        PagePv: {
          name: 'PagePv',
          value: 2877,
          idx: 0,
          lastIdx: 0,
          isMax: true,
          isMin: false,
          isSecondMax: false,
          isSecondMin: true,
        },
      },
      {
        ProjectName: { name: 'ProjectName', value: '斗地主赛事' },
        PagePv: {
          name: 'PagePv',
          value: 7,
          idx: 1,
          lastIdx: 1,
          isMax: false,
          isMin: true,
          isSecondMax: true,
          isSecondMin: false,
        },
      },
    ]);
  });
});

describe('flattenPreData', () => {
  it('flattenPreData', () => {
    expect(flattenPreData([{
      ProjectName: { name: 'ProjectName', value: '研发平台' },
      PagePv: { name: 'PagePv', value: 152 },
      PageUv: { name: 'PageUv', value: 7 },
      Score: { name: 'Score', value: 93.92 },
      PageDuration: { name: 'PageDuration', value: 1281.58 },
      PageError: { name: 'PageError', value: 2 },
    }], 'ProjectName')).toEqual({
      研发平台: {
        ProjectName: '研发平台',
        PagePv: 152,
        PageUv: 7,
        Score: 93.92,
        PageDuration: 1281.58,
        PageError: 2,
      },
    });
  });
});
