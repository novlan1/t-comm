import { shouldInclude } from '../../src/daily-merge/helper';

describe('shouldExclude', () => {
  it('shouldExclude', () => {
    expect(shouldInclude('release')).toBe(false);
    expect(shouldInclude('develop')).toBe(false);
    expect(shouldInclude('hotfix/abc-adf-123')).toBe(false);

    expect(shouldInclude('feature/manager-hp')).toBe(true);
    expect(shouldInclude('123123-a')).toBe(true);
    expect(shouldInclude('abc-d')).toBe(true);
  });
});
