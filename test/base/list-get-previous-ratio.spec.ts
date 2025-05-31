import {
  getPreviousRatio,
} from '../../src';

describe('getPreviousRatio', () => {
  const preDataMap = {
    'mj-match': {
      Project: 'mj-match',
      Request: 4,
      Score: 91.81,
      FirstLoadTime: 178,
      WholePageTime: 1035,
      ParseDomTime: 484,
      DNSLinkTime: 0,
      DOMTime: 414,
      TCP: 0,
      HTTP: 275,
      BackEnd: 60,
      CGIFailNum: 0,
      ErrorLogNum: 0,
      CGIRequestNum: 83,
    },
    'another-project': {
      Project: 'another-project',
      Request: 10,
      Score: 85.5,
    },
  };

  it('should calculate ratio and previousValue for numeric values with corresponding preData', () => {
    const data = [
      {
        Project: { value: 'mj-match', name: 'Project' },
        Request: {
          value: 854,
          name: 'Request',
          idx: 19,
          lastIdx: 19,
          isMax: false,
          isMin: false,
          isSecondMax: false,
          isSecondMin: true,
        },
      },
    ];

    getPreviousRatio(data, preDataMap);

    expect(data).toEqual([
      {
        Project: { value: 'mj-match', name: 'Project' },
        Request: {
          value: 854,
          name: 'Request',
          idx: 19,
          lastIdx: 19,
          isMax: false,
          isMin: false,
          isSecondMax: false,
          isSecondMin: true,
          previousValue: 4,
          ratio: '+999+%', // 根据你的 getUnitPreviousRatio 实现，这里假设是 +999%
        },
      },
    ]);
  });

  it('should not modify non-numeric values', () => {
    const data = [
      {
        Project: { value: 'mj-match', name: 'Project' },
        Score: {
          value: 'high', // 非数值
          name: 'Score',
        },
      },
    ];

    const originalData = JSON.parse(JSON.stringify(data)); // 深拷贝原始数据

    getPreviousRatio(data, preDataMap);

    expect(data).toEqual(originalData); // 数据不应被修改
  });

  it('should handle cases where preDataMap does not have corresponding values', () => {
    const data = [
      {
        Project: { value: 'unknown-project', name: 'Project' },
        Request: {
          value: 854,
          name: 'Request',
        },
      },
    ];

    getPreviousRatio(data, preDataMap);

    expect(data).toEqual([
      {
        Project: { value: 'unknown-project', name: 'Project' },
        Request: {
          value: 854,
          name: 'Request',
          ratio: '', // 根据你的实现，这里可能是空字符串
          // previousValue 可能不存在或为 undefined，取决于你的实现
        },
      },
    ]);
  });

  it('should handle empty data array', () => {
    const data: any[] = [];
    const originalData = JSON.parse(JSON.stringify(data));

    getPreviousRatio(data, preDataMap);

    expect(data).toEqual(originalData);
  });

  it('should handle empty preDataMap', () => {
    const data = [
      {
        Project: { value: 'mj-match', name: 'Project' },
        Request: {
          value: 854,
          name: 'Request',
        },
      },
    ];

    getPreviousRatio(data, {});

    // 根据你的实现，ratio 可能是空字符串，previousValue 可能不存在
    expect(data).toEqual([
      {
        Project: { value: 'mj-match', name: 'Project' },
        Request: {
          value: 854,
          name: 'Request',
          ratio: '', // 或其他默认值
          // previousValue 可能不存在
        },
      },
    ]);
  });

  it('should handle cases where uniqKey does not match any value in data', () => {
    const data = [
      {
        ProjectName: { value: 'mj-match', name: 'Project' }, // uniqKey 是 'Project'，但这里用 'ProjectName'
        Request: {
          value: 854,
          name: 'Request',
        },
      },
    ];

    getPreviousRatio(data, preDataMap);

    // 根据你的实现，ratio 可能是空字符串，因为无法找到 uniqVal
    expect(data).toEqual([
      {
        ProjectName: { value: 'mj-match', name: 'Project' },
        Request: {
          value: 854,
          name: 'Request',
          ratio: '', // 或其他默认值
          // previousValue 可能不存在
        },
      },
    ]);
  });

  it('should handle multiple items in data array', () => {
    const data = [
      {
        Project: { value: 'mj-match', name: 'Project' },
        Request: {
          value: 854,
          name: 'Request',
        },
        Score: {
          value: 90,
          name: 'Score',
        },
      },
      {
        Project: { value: 'another-project', name: 'Project' },
        Request: {
          value: 15,
          name: 'Request',
        },
      },
    ];

    getPreviousRatio(data, preDataMap);

    expect(data).toEqual([
      {
        Project: { value: 'mj-match', name: 'Project' },
        Request: {
          value: 854,
          name: 'Request',
          ratio: '+999+%', // 假设 getUnitPreviousRatio(854, 4) 返回 '+999%'
          previousValue: 4,
        },
        Score: {
          value: 90,
          name: 'Score',
          ratio: '-2.0%', // 假设 getUnitPreviousRatio(90, 85.5) 返回 '+5.29%'
          previousValue: 91.81,
        },
      },
      {
        Project: { value: 'another-project', name: 'Project' },
        Request: {
          value: 15,
          name: 'Request',
          ratio: '+50.0%', // 假设 getUnitPreviousRatio(15, 10) 返回 '+50%'
          previousValue: 10,
        },
      },
    ]);
  });
});
