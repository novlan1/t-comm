import { getQueryObj, composeUrlQuery } from '../../src';

describe('getQueryObj', () => {
  it('getQueryObj', () => {
    expect(getQueryObj('https://igame.qq.com?name=mike&age=18&feel=cold&from=china')).toEqual({
      name: 'mike',
      age: '18',
      feel: 'cold',
      from: 'china',
    });
  });
});

describe('composeUrlQuery', () => {
  it('composeUrlQuery', () => {
    expect(composeUrlQuery('https://baidu.com', {
      name: 'mike',
      feel: 'cold',
      age: '18',
      from: 'test',
    })).toBe('https://baidu.com?name=mike&feel=cold&age=18&from=test');
  });

  it('already has query', () => {
    expect(composeUrlQuery('https://baidu.com?gender=male', {
      name: 'mike',
      feel: 'cold',
      age: '18',
      from: 'test',
    })).toBe('https://baidu.com?gender=male&name=mike&feel=cold&age=18&from=test');
  });
});
