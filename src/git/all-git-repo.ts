import * as fs from 'fs';

import { isDirectory } from '../fs/fs';
import { execCommand } from '../node/node-command';


/**
 * 获取所有 git 仓库
 *
 * @export
 * @param {string} root 根路径
 * @returns {array} 路径列表
 * @example
 * ```ts
 * getAllGitRepo('/root/yang');
 *
 * [
 *   {
 *     root: '/root',
 *     origin: 'git@git.address',
 *   }
 * ]
 * ```
 */
export function getAllGitRepo(root: string) {
  const gitList: Array<string> = [];
  getAllGitRoots(root, gitList);
  const gitOriginList = getGitOrigin(gitList);

  return gitOriginList;
}


function getAllGitRoots(root: string, gitList: Array<string>) {
  const list = fs.readdirSync(root);

  list.forEach((item) => {
    const filePath = `${root}/${item}`;

    if (isDirectory(filePath)) {
      const gitPath = `${filePath}/.git`;

      if (fs.existsSync(gitPath)) {
        gitList.push(filePath);
      } else {
        getAllGitRoots(filePath, gitList);
      }
    }
  });
}

function getGitOrigin(gitList: Array<string>) {
  const gitOriginList = gitList.map((item) => {
    const res = execCommand('git remote -v', item);
    console.log('[getGitOrigin] res: ', res);
    const origin = parseItemOrigin(res);

    return {
      root: item,
      origin,
    };
  });

  return gitOriginList;
}


function parseItemOrigin(result = '') {
  const reg = /\s+(git@.*\.git)/;
  const httpReg = /\s+(http.*)\s*\(/;

  const match = result.match(reg);
  const httpMatch = result.match(httpReg);

  return (match?.[1] || httpMatch?.[1] || '').trim();
}

