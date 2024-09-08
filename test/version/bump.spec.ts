import { genVersion } from '../../src/version/bump';

describe('genVersion', () => {
  it('genVersion', () => {
    expect(genVersion({
      alpha: '1.6.0-alpha.5',
      beta: '1.6.0-beta.6',
      latest: '1.5.127',
    }, 'beta')).toBe('1.6.0-beta.7');

    expect(genVersion({
      alpha: '1.6.0-alpha.5',
      beta: '1.6.0-beta.6',
      latest: '1.5.127',
    }, 'alpha')).toBe('1.6.0-alpha.6');

    expect(genVersion({
      alpha: '1.6.0-alpha.5',
      beta: '1.6.0-beta.6',
      latest: '1.5.127',
    }, 'next')).toBe('1.5.127-next.1');

    expect(genVersion({}, 'alpha')).toBe('0.0.1-alpha.1');
  });
});
