import { removeUrlParams } from '../../src';


describe('comm:removeUrlParams', () => {
  it('地址是 hash 模式参数', () => {
    const res = removeUrlParams('http://www.test.com/#/detail?a=1&b=2&c=3', ['a', 'b']);
    expect(res).toBe('http://www.test.com/#/detail?c=3');
  });

  it('地址 history模式参数并存', () => {
    const res = removeUrlParams('http://www.test.com/?a=1&b=2&c=3', ['a', 'b']);
    expect(res).toBe('http://www.test.com/?c=3');
  });

  it('地址 history模式参数并存 + 强制history模式返回', () => {
    const res = removeUrlParams('http://www.test.com/?a=1&b=2&c=3', ['a', 'b']);
    expect(res).toBe('http://www.test.com/?c=3');
  });

  // it('hash 模式和history模式参数并存', () => {
  //   const res = removeUrlParams('http://www.test.com/?a=1&b=2&c=3#/detail?d=4', ['a', 'd']);
  //   expect(res).toBe('http://www.test.com/#/detail?b=2&c=3');
  // });


  // it('地址是 hash 模式和history模式参数并存，且是多个参数', () => {
  //   const res = removeUrlParams('http://www.test.com/?d=4&f=6#/detail?a=1&b=2&c=3', ['a', 'd']);
  //   expect(res).toBe('http://www.test.com/#/detail?f=6&b=2&c=3');
  // });
});
