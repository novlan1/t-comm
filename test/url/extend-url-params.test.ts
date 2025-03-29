import { extendUrlParams } from '../../src';


describe('extendUrlParams', () => {
  it('地址是 hash 模式参数', () => {
    const res = extendUrlParams('http://www.test.com/#/detail?a=1&b=2&c=3', { d: 4 });
    expect(res).toBe('http://www.test.com/#/detail?a=1&b=2&c=3&d=4');
  });

  it('地址 history 模式参数并存', () => {
    const res = extendUrlParams('http://www.test.com?a=1&b=2&c=3', { d: 4 });
    expect(res).toBe('http://www.test.com/?a=1&b=2&c=3&d=4');
  });

  it('地址 history 模式参数并存 + 强制 history 模式返回', () => {
    const res = extendUrlParams('http://www.test.com?a=1&b=2&c=3', { d: 4 }, true);
    expect(res).toBe('http://www.test.com/?a=1&b=2&c=3&d=4');
  });

  it('hash 模式和 history 模式参数并存', () => {
    const res = extendUrlParams('http://www.test.com?a=1&b=2&c=3#/detail?d=4', { e: 5 });
    expect(res).toBe('http://www.test.com/#/detail?a=1&b=2&c=3&d=4&e=5');
  });


  it('地址是 hash 模式和 history 模式参数并存，且是多个参数', () => {
    const res = extendUrlParams('http://www.test.com?d=4&f=6#/detail?a=1&b=2&c=3', { e: 5, g: 7 });
    expect(res).toBe('http://www.test.com/#/detail?d=4&f=6&a=1&b=2&c=3&e=5&g=7');
  });
});
