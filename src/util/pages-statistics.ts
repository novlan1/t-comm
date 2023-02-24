import { traverseFolder } from './fs-util';
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * 统计页面个数
 * @example
 * statisticsPages('dist/build/mp-weixin/app.json')
 */
export function statisticsPages(pagesJsonPath) {
  const path = require('path');
  const pagesJson = require(path.resolve(process.cwd(), pagesJsonPath));
  const { pages = [], subPackages = [] } = pagesJson;
  const res = pages.length + subPackages.reduce((acc, item) => acc + item.pages.length, 0);
  console.log('[statisticsPages]', res);
  return res;
}


/**
 * 统计组件个数
 * @example
 * statisticsComponent('dist/build/mp-weixin');
 */
export function statisticsComponent(dir) {
  const fs = require('fs');
  const array: Array<any> = [];

  if (fs.existsSync(dir)) {
    traverseFolder((file) => {
      if (file.endsWith('.wxml')) {
        array.push(file);
      }
    }, dir);
  }
  console.log('[statisticsComponent]', array.length);
  return array.length;
}


