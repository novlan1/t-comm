const { execSync } = require('child_process');

const ENV_FILE = '.env.local';
const REPO = 't-comm';
const TARGET_DIR = 'docs/.vuepress/dist';


function main() {
  require('dotenv').config({ path: ENV_FILE });

  execSync(`node ./bin/cli deploy:github --repo ${REPO} --dir ${TARGET_DIR}`, {
    stdio: 'inherit',
  });
}

main();
