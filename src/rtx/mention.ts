
/**
 * 获取 rtx 拼接的提及字符串
 * @param rawStr 原始字符串，比如 `foo,bar`
 * @returns 处理后的字符串，比如 <@foo><@bar>
 */
export function getMentionRtx(rawStr = '') {
  if (!rawStr) {
    return '';
  }

  const result = rawStr
    .split(/,|;/)
    .map(item => `<@${item}>`)
    .join('');

  return result;
}
