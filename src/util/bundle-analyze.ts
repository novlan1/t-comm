import * as path from 'path';
import * as fs from 'fs';


function getHtmlContent(buildPath: string) {
  const htmlPath = path.resolve(buildPath, 'index.html');
  const content = fs.readFileSync(htmlPath, {
    encoding: 'utf-8',
  });
  return content;
}

function getSourceFromReg(content: string, reg: RegExp) {
  let match = reg.exec(content);
  const result: Array<string> = [];

  while (match) {
    result.push(match[1]);
    match = reg.exec(content);
  }
  return result;
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
 */
function getEntryFiles(content: string, domain: string) {
  const scriptReg = new RegExp(`<script .*?src="${domain}/?(.+?)".*?/?>`, 'g');
  const cssReg = new RegExp(`<link .*?href="${domain}/?(.+?)".*?/?>`, 'g');

  const result = [
    ...getSourceFromReg(content, scriptReg),
    ...getSourceFromReg(content, cssReg),
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

export function analyzeIndexBundle({ domain, buildPath }: {
  domain: string;
  buildPath: string;
}) {
  const content = getHtmlContent(buildPath);
  const fileList = getEntryFiles(content, domain);
  const bundleSizeList = getBundleSize(fileList, buildPath);
  return bundleSizeList;
}

