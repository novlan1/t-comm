const { execSync } = require('child_process');
const path = require('path');

const ENV_FILE = '.env.local';
const BASH_FILE = path.resolve(__dirname, './deploy-github-page.sh');


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

  execSync(`sh ${BASH_FILE} ${token} ${repoName} ${userName} ${email} ${targetDir} "${branch}" "${commitMessage}"`, {
    cwd: process.cwd(),
    encoding: 'utf-8',
    stdio: 'inherit',
  });
}


module.exports = {
  deployGithubPage,
};
