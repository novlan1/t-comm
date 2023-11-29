import * as fs from 'fs';
import { hyphenate } from '../base/string/string';


const DEFAULT_EXTRACT_REGEXP = /([\w]+):\s*\{\s+type:\s*([\w]+),\s+default:\s(.*),/g;


function parseDefaultValue(value) {
  if (value.indexOf('=>') > -1) {
    value = value
      .replace(/\(\)\s*=>\s*\(?/, '').replace(/\)?$/, '')
      .trim();
  }

  if (['\'\'', '[]', '{}'].indexOf(value) > -1) {
    return '-';
  }

  value = value.replace(/^'|'$/g, '');
  return `\`${value}\``;
}

function getPropsList(filePath, extractRegexp) {
  const data = fs.readFileSync(filePath, {
    encoding: 'utf-8',
  });
  const propsList: Array<Record<string, any>> = [];

  let match = extractRegexp.exec(data);
  while (match) {
    propsList.push({
      name: hyphenate(match[1]),
      type: (match[2]).toLocaleLowerCase(),
      defaultValue: parseDefaultValue(match[3]),
    });
    match = extractRegexp.exec(data);
  }

  return propsList;
}

function genTable(list) {
  const table = [
    '| 参数               | 说明             | 类型      | 默认值 |',
    '| ------------------ | ---------------- | --------- | ------ |',
  ];
  list.forEach((item) => {
    const { name, type, defaultValue } = item;
    table.push(`| ${name}  |    | _${type}_   | ${defaultValue}   |`);
  });

  return table.join('\n');
}


/**
 * 提取 Vue 组件的 props
 * @param {obj} params 参数
 * @param {string} params.filePath 源文件地址
 * @param {string} [params.targetFilePath] 输出文件地址
 * @param {Regexp} [params.extractRegexp] 提取正则
 *
 * ```ts
 * extractProps({
 *   filePath: 'xxx.vue',
 * })
 * ```
 */
export function extractProps({
  filePath,
  targetFilePath = './log/extract-props.md',
  extractRegexp = DEFAULT_EXTRACT_REGEXP,
}) {
  const propsList = getPropsList(filePath, extractRegexp);
  const table = genTable(propsList);

  fs.writeFileSync(targetFilePath, table, {
    encoding: 'utf-8',
  });
}

