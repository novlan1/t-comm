import * as fs from 'fs';

const DEFAULT_EXTRACT_REGEXP = /\$emit\('([\w]+)'/g;

function getEventList(filePath, extractRegexp) {
  const data = fs.readFileSync(filePath, {
    encoding: 'utf-8',
  });
  const eventList: Array<Record<string, any>> = [];

  let match = extractRegexp.exec(data);
  while (match) {
    eventList.push({
      name: match[1],
    });
    match = extractRegexp.exec(data);
  }
  return eventList;
}

function genTable(list) {
  const table = [
    '| 事件名 | 说明     | 参数 |',
    '| ------------------ | ---------------- | --------- |',
  ];
  list.forEach((item) => {
    const { name } = item;
    table.push(`| ${name}          |   |-   |`);
  });

  return table.join('\n');
}


/**
 * 提取 Vue 组件的 event
 * @param {obj} params 参数
 * @param {string} params.filePath 源文件地址
 * @param {string} [params.targetFilePath] 输出文件地址
 * @param {Regexp} [params.extractRegexp] 提取正则
 *
 * ```ts
 * extractEvent({
 *   filePath: 'xxx.vue',
 * })
 * ```
 */
export function extractEvent({
  filePath,
  targetFilePath = './log/extract-event.md',
  extractRegexp = DEFAULT_EXTRACT_REGEXP,
}) {
  const eventList = getEventList(filePath, extractRegexp);
  const table = genTable(eventList);

  fs.writeFileSync(targetFilePath, table, {
    encoding: 'utf-8',
  });
}
