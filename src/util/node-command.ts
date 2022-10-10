/* eslint-disable @typescript-eslint/no-require-imports */


/**
 * nodejs中调用 child_process.execSync 执行命令
 * @param {string} command 命令
 * @param {string} root 执行命令的目录
 * @returns {string} 命令执行结果
 */
export function execCommand(command: string, root?: string, stdio?: string): string {
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
      .split('\n')[0]
      ?.trim() || ''
  );
}


