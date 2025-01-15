/* eslint-disable @typescript-eslint/no-require-imports */


/**
 * nodejs 中调用 child_process.execSync 执行命令，
 * 这个方法会对输出结果截断，只返回第一行内容
 * @param {string} command 命令
 * @param {string} root 执行命令的目录
 * @param {string | object} stdio 结果输出，默认为 pipe
 * @returns {string} 命令执行结果
 */
export function execCommand(command: string, root?: string, options?: string | {
  stdio?: string;
  line?: number;
}): string {
  if (!root) {
    root = process.cwd();
  }
  const { execSync } = require('child_process');

  let innerOptions: {
    stdio?: string;
    line?: number;
  } = {};

  if (typeof options === 'string') {
    innerOptions = {
      stdio: options,
    };
  } else if (typeof options === 'object') {
    innerOptions = options;
  }

  const stdio = innerOptions?.stdio ?? 'pipe';
  const line = innerOptions?.line ?? 0;

  const res = execSync(command, {
    cwd: root || process.cwd(),
    encoding: 'utf-8',
    stdio: stdio || 'pipe',
  });

  if (line > -1) {
    return res?.split('\n')[line]
      ?.trim() || '';
  }

  return res;
}


/**
 * nodejs中调用 child_process.execSync 执行命令
 * @param {string} command 命令
 * @param {string} root 执行命令的目录
 * @param {string} stdio 结果输出，默认为 pipe
 * @returns {string} 命令执行结果
 */
export function execCommandAll(command: string, root?: string, stdio?: string): string {
  if (!root) {
    root = process.cwd();
  }
  const { execSync } = require('child_process');
  return (
    execSync(command, {
      cwd: root || process.cwd(),
      encoding: 'utf-8',
      stdio: stdio || 'pipe',
    })
      ?.split('\n')[0]
      ?.trim() || ''
  );
}
