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
    expect(typeof getGitLastTag()).toBe('string');
  });
});

describe('getGitCommitsBeforeTag', () => {
  it('getGitCommitsBeforeTag', () => {
    const commits = getGitCommitsBeforeTag();
    expect(commits).toBe('0');
  });
});


describe('getGitTagTime', () => {
  it('getGitTagTime', () => {
    expect(getGitTagTime()).toBe('');
  });
});
