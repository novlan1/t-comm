/**
 * 生成 CSV 文件内容，可以用于 fs.writeFileSync 输出
 *
 * 第一行为表头
 * @param {Array<Array<string>>} dataList 二维数据列表
 * @returns 生成的字符串
 * @example
 *
 * ```ts
 * generateCSV([['a','b'], ['1', '2']]);
 * ```
 */
export function generateCSV(dataList: Array<Array<string>>) {
  const result: string[] = [];
  if (!dataList?.[0].length) {
    return '';
  }

  dataList.forEach((line, lineIndex) => {
    line.forEach((text, index) => {
      if (lineIndex === 0 && index === 0) {
        result.push(`\ufeff${text},`);
      } else if (index === line.length - 1) {
        result.push(`${text}\n`);
      } else {
        result.push(`${text},`);
      }
    });
  });

  return result.join('');
}


/**
 * 生成 CSV 所需数据，可用于传递给 generateCSV 方法
 *
 * @param {Array<Record<string, string | number | boolean>>} list 数据列表
 * @param {Record<string, string>} headMap 数据项的 key 和表头标题的映射关系
 * @returns 二维数组，第一行是表头
 *
 * @example
 * ```ts
 * generateCSVData([
 *   {
 *     file: 'a.js',
 *     size: 88,
 *   },
 *  {
 *     file: 'b.js',
 *     size: 66,
 *   }
 * ], { file: '文件名称', size: '文件大小' })
 *
 *
 * // [['文件名称', '文件大小'], ['a.js', 88], ['b.js', 66]]
 * ```
 */
export function generateCSVData(list: Array<Record<string, string | number | boolean>>, headMap: Record<string, string>) {
  const dataList = list.map((item: Record<string, any>) => Object.keys(headMap).map(key => item[key]));
  return [
    Object.values(headMap),
    ...dataList,
  ];
}
