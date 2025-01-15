/* eslint-disable @typescript-eslint/no-require-imports */
import fs from 'fs';


/**
 * 用 dotenv-expand 加载环境变量
 * @param file 文件路径，默认 .env.local
 * @param param 参数
 *
 * @example
 * ```ts
 * loadEnv();
 *
 * loadEnv('.env');
 *
 * loadEnv('.env.local', {
 *   debug: false, // 是否打印日志，默认 true
 * });
 * ```
 */
export function loadDotenv(file = '.env.local', options?: {
  debug?: boolean
}) {
  const dotenv = require('dotenv');
  const dotenvExpand = require('dotenv-expand');
  if (!fs.existsSync(file)) {
    console.log(`>>> loadEnv ${file} 不存在`);
    return;
  }

  const myEnv = dotenv.config({ path: file });
  dotenvExpand.expand(myEnv);

  const debug = options?.debug ?? true;

  if (debug) {
    console.log(`>>> loadEnv ${file} success`);
  }
}
