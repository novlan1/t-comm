
/**
 * 转化 rem 单位
 * @param {string} content 输入内容
 * @param {number} factor 转化比例，默认 100
 * @param {string} unit 转化单位，默认 rpx
 * @returns {string} 转化后的结果
 *
 * @example
 * ```ts
 * transFormRem('1.22rem')
 * // 122rpx
 *
 * transFormRem('1.22rem', 50, 'px')
 * // 61px
 *
 * transFormRem('.21rem', 50, 'px')
 * // 10.50px
 * ```
 */
export function transFormRem(content: string, factor = 100, unit = 'rpx') {
  if (content == null) {
    return content;
  }
  const pattern = new RegExp('([0-9.]*[0-9]+)([\\s]*)(rem)', 'g');
  let match: any = undefined;

  const records: Array<any> = [];

  // eslint-disable-next-line no-cond-assign
  while (match = pattern.exec(content)) {
    const keyword = match[0];
    const number = parseFloat(match[1]);
    records.push({
      index: match.index,
      length: keyword.length,
      keyword,
      number,
    });
  }

  if (records.length > 0) {
    let buffer = `${content}`;
    for (const record of records) {
      let number = (record.number * factor).toFixed(2);
      if (+number == parseInt(number, 10)) {
        // 去掉无效的小数点，比如：28.00
        number = `${parseInt(number, 10)}`;
      }
      buffer = buffer.replace(record.keyword, `${number}${unit}`);
    }
    return buffer;
  }

  return content;
}


