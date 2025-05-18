import path from 'path';

import { getSubmodulePathList } from '../git/submodule';
import { execCommand } from '../node/node-command';


function getSubmodulePathStr(file: string): string {
  const submodules = getSubmodulePathList(file);
  const str = `\n${submodules.map(item => `${item}/*`).join('\n')}`;
  return str;
}


export function ignoreSubmoduleInESLint(root = process.cwd()) {
  const str = getSubmodulePathStr(path.resolve(root, '.gitmodules'));

  execCommand(`echo "${str}" >> .eslintignore`, root, 'inherit');
}

export function ignoreSubmoduleInStyleLint(root = process.cwd()) {
  const str = getSubmodulePathStr(path.resolve(root, '.gitmodules'));

  execCommand(`echo "${str}" >> .stylelintignore`, root, 'inherit');
}
