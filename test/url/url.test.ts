import { getQueryObj, composeUrlQuery, getUrlPara } from '../../src';

describe('getQueryObj', () => {
  it('getQueryObj', () => {
    expect(getQueryObj('https://igame.qq.com?name=mike&age=18&feel=cold&from=china')).toEqual({
      name: 'mike',
      age: '18',
      feel: 'cold',
      from: 'china',
    });

    expect(getQueryObj('name=mike&age=18&feel=cold&from=china')).toEqual({
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


describe('getUrlPara', () => {
  it('getUrlPara', () => {
    expect(getUrlPara('gender', '?gender=male&name=mike&feel=cold&age=18&from=test')).toBe('male');
    expect(getUrlPara('from', '?gender=male&name=mike&feel=cold&age=18&from=test')).toBe('test');
    expect(getUrlPara('age', '?gender=male&name=mike&feel=cold&age=18&from=test')).toBe('18');

    expect(getUrlPara('other', '?gender=male&name=mike&feel=cold&age=18&from=test')).toBe('');
    expect(getUrlPara('other')).toBe('');
  });
});
