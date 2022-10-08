/* eslint-disable @typescript-eslint/no-require-imports */
function getKeyValue(key, sourceLine) {
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

// 获取模块名称
export function readEnvVariable(key, filepath) {
  const fs = require('fs');
  if (!fs.lstatSync(filepath)) {
    console.log('文件不存在:', filepath, '，请先创建文件');
    process.exit(1);
  }
  try {
    const sourceStr = fs.readFileSync(filepath, 'utf-8');
    const sourceLine = sourceStr.split('\n');
    return getKeyValue(key, sourceLine);
  } catch (e) {
    console.log('打开文件失败:', filepath);
    process.exit(1);
  }
}
