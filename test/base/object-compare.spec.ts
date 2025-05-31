import { compareTwoObj } from '../../src';


describe('compareTwoObj', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly identify added, updated, and deleted properties', () => {
    const originObj = {
      name: 'Alice',
      age: 25,
      address: {
        city: 'New York',
        zip: '10001',
      },
    };

    const newObj = {
      name: 'Bob',
      age: 25,
      address: {
        city: 'Los Angeles',
        zip: '90001',
      },
      email: 'bob@example.com',
    };

    const result = compareTwoObj(originObj, newObj);

    expect(result).toEqual({
      ADDED: ['email'],
      UPDATED: ['name', 'address'], // address 是对象，isObjectEqual 应返回 false
      DELETED: [],
      originObj,
      newObj,
    });

    // 验证 isObjectEqual 的行为是否符合预期
    // 注意：这里我们不直接测试 isObjectEqual，而是通过 compareTwoObj 的结果间接验证
  });

  it('should handle empty objects', () => {
    const originObj = {};
    const newObj = {};

    const result = compareTwoObj(originObj, newObj);

    expect(result).toEqual({
      ADDED: [],
      UPDATED: [],
      DELETED: [],
      originObj,
      newObj,
    });
  });

  it('should handle when objects are identical', () => {
    const originObj = {
      name: 'Alice',
      age: 25,
    };

    const newObj = {
      name: 'Alice',
      age: 25,
    };

    const result = compareTwoObj(originObj, newObj);

    expect(result).toEqual({
      ADDED: [],
      UPDATED: [],
      DELETED: [],
      originObj,
      newObj,
    });
  });

  it('should handle nested objects correctly', () => {
    const originObj = {
      user: {
        name: 'Alice',
        profile: {
          age: 25,
          city: 'New York',
        },
      },
    };

    const newObj = {
      user: {
        name: 'Bob',
        profile: {
          age: 25,
          city: 'Los Angeles',
        },
      },
    };

    const result = compareTwoObj(originObj, newObj);

    expect(result).toEqual({
      ADDED: [],
      UPDATED: ['user'], // user 是对象，isObjectEqual 应返回 false
      DELETED: [],
      originObj,
      newObj,
    });
  });

  it('should handle arrays in objects', () => {
    const originObj = {
      items: [1, 2, 3],
    };

    const newObj = {
      items: [1, 2, 4],
    };

    const result = compareTwoObj(originObj, newObj);

    // 根据 isObjectEqual 的实现，数组是通过 toString() 比较的
    // 所以 [1, 2, 3] 和 [1, 2, 4] 的 toString() 结果不同，应该返回 false
    expect(result).toEqual({
      ADDED: [],
      UPDATED: ['items'],
      DELETED: [],
      originObj,
      newObj,
    });
  });

  it('should handle arrays with same elements but different order', () => {
    const originObj = {
      items: [1, 2, 3],
    };

    const newObj = {
      items: [3, 2, 1],
    };

    // 根据 isObjectEqual 的实现，数组是通过 toString() 比较的
    // 所以 [1, 2, 3] 和 [3, 2, 1] 的 toString() 结果不同，应该返回 false
    expect(compareTwoObj(originObj, newObj)).toEqual({
      ADDED: [],
      UPDATED: ['items'],
      DELETED: [],
      originObj,
      newObj,
    });
  });

  it('should handle functions in objects (should not compare)', () => {
    const originObj = {
      func: () => console.log('Hello'),
    };

    const newObj = {
      func: () => console.log('World'),
    };

    expect(compareTwoObj(originObj, newObj)).toEqual({
      ADDED: [],
      UPDATED: [],
      DELETED: [],
      originObj,
      newObj,
    });
  });

  it('should handle null and undefined', () => {
    const originObj = {
      value: null,
    };

    const newObj = {
      value: undefined,
    };

    // 根据 isObjectEqual 的实现，null 和 undefined 不相等
    expect(compareTwoObj(originObj, newObj)).toEqual({
      ADDED: [],
      UPDATED: [],
      DELETED: ['value'],
      originObj,
      newObj,
    });
  });

  it('should handle primitive values', () => {
    const originObj = {
      value: 42,
    };

    const newObj = {
      value: 42,
    };

    expect(compareTwoObj(originObj, newObj)).toEqual({
      ADDED: [],
      UPDATED: [],
      DELETED: [],
      originObj,
      newObj,
    });
  });

  it('should handle Date objects', () => {
    const originObj = {
      date: new Date('2023-01-01'),
    };

    const newObj = {
      date: new Date('2023-01-01'),
    };

    expect(compareTwoObj(originObj, newObj)).toEqual({
      ADDED: [],
      UPDATED: [],
      DELETED: [],
      originObj,
      newObj,
    });
  });
});
