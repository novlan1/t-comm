import { getMatchListFromReg } from '../base/regexp/regexp';
import { readFileSync, writeFileSync } from '../fs/fs';


/**
 * 为 Vue 组件添加 emits 属性
 * @param {string} filePath 组件地址
 * @param {string} [fileContent] 组件内容
 * @returns {string} 新的组件内容
 *
 * @example
 * ```ts
 * addNameForComponent('xxx.vue');
 * ```
 */
export function addEmitsForComponent(filePath: string, fileContent = '') {
  let content = fileContent;
  if (!content) {
    content = readFileSync(filePath, false);
  }

  if (/emits:\s*\[/.test(content)) return;

  const emits = getEmitList(content);

  if (!emits.length) return;

  const newSource = content.replace(
    /(?=\s\sdata\(\)\s*\{)/,
    getEmitsStr(emits),
  );

  writeFileSync(filePath, newSource);

  return newSource;
}


function getEmitList(source: string) {
  const reg = /emit\('([^',]+)'/g;
  const emits = getMatchListFromReg(source, reg);

  const array = Array.from(new Set(emits));
  array.sort();

  return array;
}


function getEmitsStr(emits: Array<string>) {
  const emitsStr = emits.map(item => `'${item}'`).join(',\n    ');

  return  [
    '  emits: [',
    `    ${emitsStr},`,
    '  ],\n',
  ].join('\n');
}

