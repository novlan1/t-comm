import { compareVersion } from '../../src';

describe('compareVersion', () => {
  it('compareVersion', () => {
    expect(compareVersion('1.2.1', '1.1.1')).toBe(1);

    expect(compareVersion('1.1.1', '1.2.1')).toBe(-1);
    expect(compareVersion('^2.3.3', '3')).toBe(-1);
    expect(compareVersion('^3.3.3', '3')).toBe(1);
  });
});
