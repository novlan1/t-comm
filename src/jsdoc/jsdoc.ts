/* eslint-disable @typescript-eslint/no-require-imports */
import { timeStampFormat } from '../date/time';

function getFs() {
  return require('fs');
}

function getPath() {
  return require('path');
}

let DOCS_DIR = './docs';

function setDocsDir(docsPath) {
  if (docsPath) {
    DOCS_DIR = docsPath;
  }
}


function getGlobalSourceMap() {
  console.log('Parsing nav list of global.html ...');
  const file = 'global.html';
  const sourceMap = getSourceMap(file);
  return parseSourceMap(sourceMap);
}


function handleEveryHtml(sourceMap, author) {
  const files = getFs().readdirSync(DOCS_DIR);
  files.forEach((file) => {
    if (file.endsWith('.html')) {
      const filePath =  getPath().resolve(DOCS_DIR, file);
      const content = getFs().readFileSync(filePath, {
        encoding: 'utf-8',
      });
      const html = getParsedHtml(content, sourceMap, author);

      getFs().writeFileSync(filePath, html, {
        encoding: 'utf-8',
      });
    }
  });
}

/**
 * 获取sourceMap，形如：
 * ```ts
 * {
 *   NUMBER_CHI_MAP: 'base/number/number.ts',
 *   parseFunction: 'base/function/function.ts',
 *   flatten: 'base/list/list.ts',
 * }
 * ```
 * @private
 * @param {string} content
 * @return {object} sourceMap
 */
function getSourceMap(file) {
  const html = getPath().resolve(DOCS_DIR, file);
  const content = getFs().readFileSync(html, {
    encoding: 'utf-8',
  });

  const cheerio = require('cheerio');
  const $ = cheerio.load(content);
  const sourceMap = {};
  const names = $('#main section article h4.name');

  names.map((_, dom) => {
    const id = $(dom).attr('id');
    let source = $(dom).next()
      .find('dd.tag-source ul.dummy li a')
      .html()
      .trim();

    const list = source.split('/');
    source = list.slice(0, list.length - 1).join('/');

    sourceMap[`${file}#${id}`] = source;
  });

  return sourceMap;
}


function parseSourceMap(sourceMap) {
  return Object.keys(sourceMap).reduce((acc, key) => {
    const value = sourceMap[key];
    acc[key] = getSeparatorStr(value);
    return acc;
  }, {});
}

function getParsedHtml(content, sourceMap, author) {
  const cheerio = require('cheerio');
  const $ = cheerio.load(content);
  const naves = $('nav > ul li');
  let cur = '';

  // 插入分隔符
  naves.map((_, dom) => {
    const nav = $(dom).find('a')
      .attr('href')
      ?.trim();
    if (nav && sourceMap[nav] && cur !==  sourceMap[nav]) {
      $(dom).before(`<li class="nav-separator">${sourceMap[nav]}</li>`);
      cur =  sourceMap[nav];
    }
  });

  // 处理footer
  const footerContent = `Documentation generated on ${timeStampFormat(Date.now(), 'yyyy-MM-dd hh:mm:ss')} GMT+0800 (中国标准时间)${author && ` by ${author}`}.`;
  $('footer').html(footerContent);
  return $.html();
}

function getSeparatorStr(content) {
  const maxLen = 14;
  const lastLen = parseInt(`${maxLen - (content.length) / 2}`, 10);
  const fill = Array.from({ length: lastLen })
    .map(() => '-')
    .join('');

  return `${fill}   ${content}   ${fill}`;
}

function appendCSS(extra) {
  console.log('Appending extra css ...');
  const css = getPath().resolve(DOCS_DIR, 'styles/jsdoc.css');
  const content = getFs().readFileSync(css, {
    encoding: 'utf-8',
  });
  getFs().writeFileSync(css, `${content} \n${extra}`, {
    encoding: 'utf-8',
  });
}

function finished() {
  console.log('Finished jsdoc local script.');
}


/**
 * 处理jsdoc的脚本
 * 1. 增加导航栏的分隔符
 * 2. 增加css
 * 3. 处理footer
 */
export function handleJsDoc(docsPath, author = '') {
  setDocsDir(docsPath);

  const sourceMap = getGlobalSourceMap();

  handleEveryHtml(sourceMap, author);

  appendCSS(`
  .nav-separator {
    color: hsl(207, 1%, 60%);
    font-size: 12px;
    display: block;
  }
  `);
  finished();
}


