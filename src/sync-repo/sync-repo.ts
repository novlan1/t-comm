import { execCommand } from '../node/node-command';

import type { ReplaceContentOption } from './types';


function checkValidReplaceList(list: ReplaceContentOption['list']) {
  const fail = list?.find((item: string[]) => item.length !== 2);
  if (fail) {
    throw new Error('替换数组不合法：', { cause: fail });
  }
}


function transformString(str = '') {
  return str.replace(/(\/|")/g, '\\$1');
}


export function replaceContent({
  replaceList,
  targetProject,
}: {
  replaceList: ReplaceContentOption[];
  targetProject: string;
}) {
  for (const item of replaceList) {
    const { dirList, to, from, list } = item;

    if (!dirList?.length) continue;

    if (list?.length) {
      checkValidReplaceList(list);

      list.forEach((inner: string[]) => {
        replaceEachContent({
          dirList,
          to: transformString(inner[1]),
          from: transformString(inner[0]),
          targetProject,
        });
      });
      continue;
    }

    if (!from || !to) continue;

    replaceEachContent({
      dirList,
      to: transformString(to),
      from: transformString(from),
      targetProject,
    });
  }
}


export function execCommandInTarget(command: string, targetProject: string) {
  execCommand(command, targetProject, 'inherit');
}


export function replaceEachContent({
  dirList,
  to,
  from,
  targetProject,
}: {
  dirList: ReplaceContentOption['dirList'];
  to: ReplaceContentOption['to'];
  from: ReplaceContentOption['from'];
  targetProject: string;
}) {
  for (const dir of dirList) {
    try {
      // sed -i "" 's/@tencent\/press-ui/press-ui/g' README.md
      // find . | xargs grep string # 查找当前目录下文件内容包含字符串string的文件

      // 报错：RE error: illegal byte sequence'
      // 解决办法：export LC_COLLATE='C'
      // export LC_CTYPE='C'

      // 参考：https://blog.csdn.net/wqhjfree/article/details/39032533
      log(`正在替换 ${from} to ${to}`);
      const command = `sed -i '' "s/${from}/${to}/g" \`grep -rl "${from}" ${dir}\`  || true`;
      execCommandInTarget(command, targetProject);
    } catch (err) {
      console.log('replaceEachContent.err', err);
    }
  }
}


export function log(content: string, ...args: string[]) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const symbols = require('log-symbols');
  console.log(`${symbols.info} ${content}`, ...args);
}


