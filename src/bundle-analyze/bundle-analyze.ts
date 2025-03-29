import * as fs from 'fs';
import * as path from 'path';

import { getMatchListFromReg } from '../base/regexp/regexp';


function getHtmlContent(buildPath: string) {
  const htmlPath = path.resolve(buildPath, 'index.html');
  const content = fs.readFileSync(htmlPath, {
    encoding: 'utf-8',
  });
  return content;
}


/**
 *
 * result示例：
 *
 * [
 *   'static/js/chunk-vendors.59912eed.js',
 *   'static/js/index.8ec239e5.js',
 *   'static/index.b0707a6a.css'
 * ]
 *
 * @ignore
 */
function getEntryFiles(content: string, domain: string) {
  const scriptReg = new RegExp(`<script .*?src="${domain}/?(.+?)".*?/?>`, 'g');
  const cssReg = new RegExp(`<link .*?href="${domain}/?(.+?)".*?/?>`, 'g');

  const result = [
    ...getMatchListFromReg(content, scriptReg),
    ...getMatchListFromReg(content, cssReg),
  ];

  console.log('[getEntryFiles] result', result);
  return result;
}

function getBundleSize(list: Array<string>, buildPath: string) {
  return list.map((item) => {
    const filePath = path.resolve(buildPath, item);
    console.log('[getBundleSize] filePath', filePath);

    const isExist = fs.existsSync(filePath);
    if (isExist) {
      const stat = fs.statSync(filePath);
      return {
        file: item,
        size: stat.size,
        time: new Date(stat.ctime).getTime(),
      };
    }
  }).filter(item => item);
}

/**
 * 分析首页Bundle信息
 *
 * @export
 * @param config 配置
 * @param {string} config.domain 域名
 * @param {string} config.buildPath 打包路径
 * @returns {*}
 *
 * @example
 * ```ts
 * analyzeIndexBundle({
 *   domain: '',
 *   buildPath: '',
 * })
 * ```
 */
export function analyzeIndexBundle({ domain, buildPath }: {
  domain: string;
  buildPath: string;
}) {
  const content = getHtmlContent(buildPath);
  const fileList = getEntryFiles(content, domain);
  const bundleSizeList = getBundleSize(fileList, buildPath);
  return bundleSizeList;
}

