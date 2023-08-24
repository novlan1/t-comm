/**
 * 检查字符串长度
 *
 * @export
 * @param {string} [str] 字符串
 * @param {number} [num] 长度
 * @returns {boolean}
 */
export function checkStringLength(str = '', num = 30) {
  let len = 0;
  const character = `${str}`;

  for (let i = 0; i < character.length; i++) {
    if (character.charAt(i).match(/[\u4e00-\u9fa5]/g) != null) len += 2;
    else len += 1;
  }
  if (len > num) return false;
  return true;
}
