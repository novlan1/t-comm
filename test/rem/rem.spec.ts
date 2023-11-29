import { transFormRem } from '../../src';

describe('transFormRem', () => {
  it('transFormRem', () => {
    expect(transFormRem('1.22rem')).toBe('122rpx');

    expect(transFormRem('1.22rem', 50, 'px')).toBe('61px');

    expect(transFormRem('.21rem', 50, 'px')).toBe('10.50px');
  });
});
