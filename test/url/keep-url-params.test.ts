import { keepUrlParams } from '../../src';


describe('keepUrlParams', () => {
  it('地址是 hash 模式参数', () => {
    const res = keepUrlParams('http://www.test.com/#/detail?a=1&b=2&c=3', ['a', 'b']);
    expect(res).toBe('http://www.test.com/#/detail?a=1&b=2');
  });

  it('地址 history模式参数并存', () => {
    const res = keepUrlParams('http://www.test.com?a=1&b=2&c=3', ['a', 'b']);
    expect(res).toBe('http://www.test.com/?a=1&b=2');
  });

  it('地址 history 模式参数并存 + 强制 history 模式返回', () => {
    const res = keepUrlParams('http://www.test.com?a=1&b=2&c=3', ['a', 'b'], true);
    expect(res).toBe('http://www.test.com/?a=1&b=2');
  });

  it('hash 模式和 history 模式参数并存', () => {
    const res = keepUrlParams('http://www.test.com?a=1&b=2&c=3#/detail?d=4', ['a', 'd']);
    expect(res).toBe('http://www.test.com/#/detail?a=1&d=4');
  });


  it('地址是 hash 模式和 history 模式参数并存，且是多个参数', () => {
    const res = keepUrlParams('http://www.test.com?d=4&f=6#/detail?a=1&b=2&c=3', ['a', 'd']);
    expect(res).toBe('http://www.test.com/#/detail?d=4&a=1');
  });
});
