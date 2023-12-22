import { getPreReleaseTag } from '../../src';

describe('getPreReleaseTag', () => {
  it('getPreReleaseTag', () => {
    expect(getPreReleaseTag('1.1.1')).toBe('');
    expect(getPreReleaseTag('1.1.1-beta.0')).toBe('beta');
    expect(getPreReleaseTag('1.1.1-alpha.0')).toBe('alpha');
    expect(getPreReleaseTag('10.10.10-rc.0')).toBe('rc');
  });
});
