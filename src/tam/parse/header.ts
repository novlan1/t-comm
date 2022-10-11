/**
 * 获取表格数据的表头
 * @param {Array<object>} tableData 表格数据
 * @param {object} tableHeaderMap 表格表头Map
 * @returns {Array<string>} 表头列表
 */
export function getTableHeaders(tableData: Array<object> = [], tableHeaderMap: object = {}): Array<string> {
  if (!tableData.length) {
    return [];
  }

  const list = Object.keys(tableData[0] || {});
  return list.map(item => tableHeaderMap[item]?.name || item);
}
