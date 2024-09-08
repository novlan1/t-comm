/**
 * 生成 alpha、beta 等这些预发布的版本
 * @param key 关键词
 * @returns 生成的版本
 */
export function getPreReleaseVersion(key = '') {
  if (!key) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { execSync } = require('child_process');

  const res = execSync('npm dist-tag ls', {
    cwd: process.cwd(),
    encoding: 'utf-8',
    stdio: 'pipe',
  });
  const obj = parseDistTagResult(res);
  return genVersion(obj, key);
}


export function genVersion(obj: Record<string, string> = {}, key = '') {
  if (!obj[key]) {
    const { latest } = obj as unknown as Record<any, string>;
    if (!latest) {
      return `0.0.1-${key}.1`;
    }
    return `${latest}-${key}.1`;
  }


  const last = obj[key];
  const list = last.split(`${key}.`);

  return `${list[0]}${key}.${+list[1] + 1}`;
}

function parseDistTagResult(str = ''): Record<string, string> {
  return str.trim()
    .split('\n')
    .reduce((acc, item) => {
      const str = item.trim();

      const temp = str.split(':');

      return {
        ...acc,
        [temp[0].trim()]: temp[1].trim(),
      };
    }, {});
}
