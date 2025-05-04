
/**
 * 获取随机字符串
 * @param {number} length 字符串长度，默认 32
 * @returns {string} 字符串
 * @example
 * ```ts
 * randomString()
 *
 * randomString(16)
 * ```
 */
export function randomString(e = 32) {
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const a = t.length;
  let n = '';
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

/**
 * 获取随机字符串
 * @param {number} length 字符串长度，默认 32
 * @returns {string} 字符串
 * @example
 * ```ts
 * randomString()
 *
 * randomString(16)
 * ```
 */
export const getRandomString = randomString;
