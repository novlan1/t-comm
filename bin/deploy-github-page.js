const { execSync } = require('child_process');
const path = require('path');

const ENV_FILE = '.env.local';
const BASH_FILE = path.resolve(__dirname, './deploy-github-page.sh');
const BASH_FILE_INCREMENT = path.resolve(__dirname, './deploy-github-page-increment.sh');


function deployGithubPage(options) {
  require('dotenv').config({ path: ENV_FILE });
  const { env } = process;

  const repoName = options.repo || env.DEPLOY_GITHUB_PAGE_REPO_NAME;
  const userName = options.user || env.DEPLOY_GITHUB_PAGE_USER_NAME;
  const email = options.email || env.DEPLOY_GITHUB_PAGE_EMAIL;
  const targetDir = options.dir || env.DEPLOY_GITHUB_PAGE_TARGET_DIR;
  const token = options.token || env.DEPLOY_GITHUB_PAGE_TOKEN;
  const branch = options.branch || env.DEPLOY_GITHUB_PAGE_BRANCH;
  const commitMessage = options.message || env.DEPLOY_GITHUB_PAGE_COMMIT_MESSAGE || '';

  const isIncrement = (options.increment || env.DEPLOY_GITHUB_PAGE_COMMIT_INCREMENT) === '1';

  console.log('[DEPLOY]', {
    repoName,
    userName,
    email,
    targetDir,
    token,
    branch,
    commitMessage,
  });

  if (!repoName
     || !userName
     || !email
     || !targetDir
     || !token
     || !branch
  ) {
    console.error('[DEPLOY ERROR] 信息不全');
    return;
  }

  if (isIncrement) {
    const playgroundDir = options.playgroundDir || env.DEPLOY_GITHUB_PAGE_PLAYGROUND_DIR || '';
    const targetDirName = options.targetDirName || env.DEPLOY_GITHUB_PAGE_TARGE_DIR_NAME || '';

    if (!playgroundDir) {
      console.error('[DEPLOY ERROR] 请提供 playgroundDir');
      return;
    }
    if (!targetDirName) {
      console.error('[DEPLOY ERROR] 请提供 targetDirName');
      return;
    }

    execSync(`sh ${BASH_FILE_INCREMENT} ${token} ${repoName} ${userName} ${email} ${targetDir} "${branch}" "${commitMessage}" ${playgroundDir} ${targetDirName}`, {
      cwd: process.cwd(),
      encoding: 'utf-8',
      stdio: 'inherit',
    });
    return;
  }

  execSync(`sh ${BASH_FILE} ${token} ${repoName} ${userName} ${email} ${targetDir} "${branch}" "${commitMessage}"`, {
    cwd: process.cwd(),
    encoding: 'utf-8',
    stdio: 'inherit',
  });
}


module.exports = {
  deployGithubPage,
};
