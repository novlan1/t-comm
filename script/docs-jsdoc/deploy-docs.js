const { execSync } = require('child_process');

const ENV_FILE = '.env.local';
const CLI_FILE = './bin/cli';
const DEPLOY_CONFIG = {
  repo: 'docs',
  targetDir: './docs/.vuepress/dist/',
  branch: 'main',

  commitMessage: 'docs: update docs of t-comm',
  playgroundDir: './log/deploy-github-pages-playground',
  targetDirName: 't-comm',
};


function main() {
  require('dotenv').config({ path: ENV_FILE });

  execSync(`node ${CLI_FILE} deploy:github --repo ${DEPLOY_CONFIG.repo} \
    --dir ${DEPLOY_CONFIG.targetDir} \
    --branch ${DEPLOY_CONFIG.branch} \
    --increment 1 \
    --message ${DEPLOY_CONFIG.commitMessage} \
    --playgroundDir ${DEPLOY_CONFIG.playgroundDir} \
    --targetDirName ${DEPLOY_CONFIG.targetDirName}
    `, {
    stdio: 'inherit',
  });
}

main();
