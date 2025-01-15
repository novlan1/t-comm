/* eslint-disable @typescript-eslint/no-require-imports */


/**
 * 启动 uni-app 项目
 * @param options 参数
 *
 * @example
 * ```ts
 * startUniProject();
 *
 * startUniProject({
 *   debug: false, // 默认为 true，会打印参数
 * })
 * ```
 */
export function startUniProject(options?: {
  debug?: boolean
}) {
  const { spawnSync } = require('child_process');
  const isWindows = require('os').platform() === 'win32';

  let command = isWindows ? 'npm.cmd' : 'npm';
  const realArgv = process.argv.slice(2);
  const debug = options?.debug ?? true;

  if (debug) {
    console.log('>>> startUniProject realArgv: ', realArgv);
  }

  let otherArgv = ['run', ...realArgv];

  if (realArgv[0] === 'uni') {
    command = isWindows ? 'npx.cmd' : 'npx';
    otherArgv = realArgv;
  }

  spawnSync(command, otherArgv, { stdio: 'inherit', shell: true });
}
