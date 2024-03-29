import * as fs from 'fs';

function getKeyValue(key: string, sourceLine: Array<string>) {
  let result;
  let ma;
  const re = new RegExp(`${key}\\s*=\\s*(.*?)(\\s|$)`);
  for (const line of sourceLine) {
    if (line.startsWith('#')) {
      // 忽略注释行
      continue;
    }
    ma = line.match(re);
    if (ma) {
      result = ma[1] || '';
      break;
    }
  }
  return result;
}


export function getEnvVariableMap(filepath: string) {
  let sourceStr = '';
  const re = new RegExp('(.*?)\\s*=\\s*(.*?)(\\s|$)');

  if (fs.existsSync(filepath)) {
    sourceStr = fs.readFileSync(filepath, 'utf-8');
  } else {
    sourceStr = filepath;
  }
  const sourceLine = sourceStr.split('\n');

  const result: Record<string, any> = {};

  for (const line of sourceLine) {
    if (line.startsWith('#')) {
      // 忽略注释行
      continue;
    }
    const match = line.match(re);
    if (match?.[1]) {
      result[match[1]] = match[2] || '';
    }
  }
  return result;
}


/**
 * 读取文件中环境变量的值，支持：
 * - NPM_TOKEN=xxx
 * - NPM_TOKEN = xxx
 * @param {string} key 环境变量的key
 * @param {string} filepath 保存环境变量的文件路径
 * @returns {string} 环境变量的值
 */
export function readEnvVariable(key: string, filepath: string): string {
  if (!fs.existsSync(filepath)) {
    console.log('[readEnvVariable] 文件不存在:', filepath, '，请先创建文件');
    return '';
  }

  try {
    const sourceStr = fs.readFileSync(filepath, 'utf-8');
    const sourceLine = sourceStr.split('\n');
    return getKeyValue(key, sourceLine)!;
  } catch (e) {
    console.log('[readEnvVariable] 打开文件失败:', filepath);
    process.exit(1);
  }
}
