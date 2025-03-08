import fs from 'fs';
import path from 'path';
import { execCommand } from '../node/node-command';


export function checkGitClean(dir: string) {
  if (!fs.existsSync(dir)) {
    console.error(`Not Exist ${dir}`);
    return;
  }

  const list = fs.readdirSync(dir);
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const chalk = require('chalk');


  list.forEach((file) => {
    const subDir = path.resolve(dir, file);
    const dotGit = path.resolve(subDir, '.git');
    const isGitRepo = fs.existsSync(dotGit);

    if (!isGitRepo) {
      // console.log(`Not Git Repo:  ${subDir}`);
    } else {
      const res = execCommand('git status | grep -c "nothing to commit, working tree clean" || true', subDir, 'pipe');
      if (res != '1') {
        console.log(chalk.red('[not clean] '), subDir);
      }
      const isNotPush =  execCommand('git status | grep -c "Your branch is ahead of" || true', subDir, 'pipe');
      if (isNotPush == '1') {
        console.log(chalk.blue('[not push]'), subDir);
      }
    }
  });
}
