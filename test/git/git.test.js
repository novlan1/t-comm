import {
  getGitCurBranch,
  getGitCommitInfo,
  getGitLastTag,
  getGitCommitsBeforeTag,
  getGitTagTime,
} from '../../src';

describe('getGitCurBranch', () => {
  it('getGitCurBranch', () => {
    expect(getGitCurBranch()).toBe('master');
  });
});


describe('getGitCommitInfo', () => {
  it('getGitCommitInfo', () => {
    expect(getGitCommitInfo()).toMatchObject({
      branch: 'master',
      author: 'novlan1',
    });
  });
});

describe('getGitLastTag', () => {
  it('getGitLastTag', () => {
    expect(getGitLastTag()).not.toBe('');

    expect(getGitLastTag().startsWith('v')).toBe(true);
  });
});

describe('getGitCommitsBeforeTag', () => {
  it('getGitCommitsBeforeTag', () => {
    const commits = getGitCommitsBeforeTag('v0.1.0');
    expect(commits).not.toBe(0);
    expect(+commits).toBeGreaterThan(30);
  });
});


describe('getGitTagTime', () => {
  it('getGitTagTime', () => {
    const time = getGitTagTime('v0.1.0');
    expect(time).toBe('2022-09-26 16:53:15 +0800');

    expect(getGitTagTime()).toBe('');
  });
});
