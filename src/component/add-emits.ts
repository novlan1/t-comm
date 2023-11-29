import * as fs from 'fs';
import { getMatchListFromReg } from '../base/regexp/regexp';

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
export function addEmitsForComponent(filePath, fileContent = '') {
  let content = fileContent;
  if (!content) {
    content = fs.readFileSync(filePath, {
      encoding: 'utf-8',
    });
  }

  if (/emits:\s*\[/.test(content)) return;

  const emits = getEmitList(content);

  if (!emits.length) return;

  const newSource = content.replace(
    /(?=\s\sdata\(\)\s*\{)/,
    getEmitsStr(emits),
  );

  fs.writeFileSync(filePath, newSource, {
    encoding: 'utf-8',
  });

  return newSource;
}


function getEmitList(source) {
  const reg = /emit\('([^',]+)'/g;
  const emits = getMatchListFromReg(source, reg);

  const array = Array.from(new Set(emits));
  array.sort();

  return array;
}


function getEmitsStr(emits) {
  const emitsStr = emits.map(item => `'${item}'`).join(',\n    ');

  return  [
    '  emits: [',
    `    ${emitsStr},`,
    '  ],\n',
  ].join('\n');
}

