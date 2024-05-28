import { transformGitToSSH } from './ssh';
import { execCommand } from '../node/node-command';
import * as path from 'path';


/**
 * 根据配置表，重新 clone 仓库
 * @param {Array<item>} list 列表
 * @param {string} item.root 路径
 * @param {string} item.origin origin
 */
export function reCloneGitRemote(list: Array<{
  root: string;
  origin: string;
}> = []) {
  list.forEach((item) => {
    const { root, origin } = item;
    const realOrigin = transformGitToSSH(origin.trim());

    console.log('[reCloneGitRemote] root: ', root);
    console.log('[reCloneGitRemote] origin: ', realOrigin);

    execCommand(`rm -rf ${root}`);
    const dir =  path.dirname(root);

    console.log('[reCloneGitRemote] dir: ', dir);
    try {
      execCommand(`git clone ${realOrigin}`, dir, 'inherit');
    } catch (err) {
      console.log('[reCloneGitRemote] err: ', err);
    }
  });
}
