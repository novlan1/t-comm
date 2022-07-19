/**
 * 生成version
 * @param execFile - child_process模块
 * @param needPush - 1 需要push，0 不需要
 * @example
 *
 * ```ts
 * genVersion({
     execFile: require('child_process').execFile,
     path: require('path'),
     needPush: 1,
   })
 * ```
 */
export function genVersion({ path, execFile, needPush = 0 }) {
  const bashFile = path.resolve(__dirname, './gen-version.bash')

  return new Promise((resolve, reject) => {
    execFile('bash', [bashFile, needPush], (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
}
