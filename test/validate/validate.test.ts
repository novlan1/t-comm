import { isExternal, isQQNumber } from '../../src';

describe('isExternal', () => {
  it('isExternal', () => {
    expect(isExternal('ttt')).toBe(false);
    expect(isExternal('http://baidu.com')).toBe(true);
  });
});

describe('isQQNumber', () => {
  it('isQQNumber', () => {
    expect(isQQNumber('ddd')).toBe(false);
    expect(isQQNumber(777777)).toBe(true);
  });
});
