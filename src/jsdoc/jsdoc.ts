/* eslint-disable @typescript-eslint/no-require-imports */
import { timeStampFormat } from '../date/time';


const DEFAULT_EXTRA_CSS = `
.nav-separator {
  color: hsl(207, 1%, 60%);
  font-size: 12px;
  display: block;
}
`;

function getSeparatorStr(content) {
  const maxLen = 14;
  const lastLen = parseInt(`${maxLen - (content.length) / 2}`, 10);
  const fill = Array.from({ length: lastLen })
    .map(() => '-')
    .join('');

  return `${fill}   ${content}   ${fill}`;
}


/**
 * 处理jsdoc的脚本
 * 1. 增加导航栏的分隔符
 * 2. 增加css
 * 3. 处理footer
 */
export class JsDocHandler {
  extraCss: string;
  author: string;
  docsPath: string;
  fs;
  path;

  constructor(options: {
    docsPath?: string
    author?: string
    extraCss?: string
  } = {}) {
    const {
      docsPath = './docs',
      author =  '',
      extraCss = DEFAULT_EXTRA_CSS,
    } = options;
    this.docsPath = docsPath;
    this.author = author;
    this.extraCss = extraCss;
    this.fs = this.getFs();
    this.path = this.getPath();
  }

  init(options) {
    const handler = new JsDocHandler(options);
    handler.run();
  }

  run() {
    const sourceMap = this.getGlobalSourceMap();
    this.handleEveryHtml(sourceMap, this.author);
    this.appendCSS(this.extraCss);
    this.finished();
  }

  getPath() {
    return require('path');
  }

  getFs() {
    return require('fs');
  }

  getGlobalSourceMap() {
    console.log('Parsing nav list of global.html ...');
    const file = 'global.html';
    const sourceMap = this.getSourceMap(file);
    return this.parseSourceMap(sourceMap);
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
  getSourceMap(file) {
    const html = this.path.resolve(this.docsPath, file);
    const content = this.fs.readFileSync(html, {
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

  handleEveryHtml(sourceMap, author) {
    const files = this.fs.readdirSync(this.docsPath);
    files.forEach((file) => {
      if (file.endsWith('.html')) {
        const filePath =  this.path.resolve(this.docsPath, file);
        const content = this.fs.readFileSync(filePath, {
          encoding: 'utf-8',
        });
        const html = this.getParsedHtml(content, sourceMap, author);

        this.fs.writeFileSync(filePath, html, {
          encoding: 'utf-8',
        });
      }
    });
  }

  parseSourceMap(sourceMap) {
    return Object.keys(sourceMap).reduce((acc, key) => {
      const value = sourceMap[key];
      acc[key] = getSeparatorStr(value);
      return acc;
    }, {});
  }

  getParsedHtml(content, sourceMap, author) {
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
    const timezone = new Date().getTimezoneOffset() / -60;
    const footerContent = `Documentation generated on ${timeStampFormat(Date.now(), 'yyyy-MM-dd hh:mm:ss')} GMT+0${timezone}00 ${author && ` by ${author}`}.`;
    $('footer').html(footerContent);
    return $.html();
  }


  appendCSS(extra) {
    console.log('Appending extra css ...');

    const css = this.path.resolve(this.docsPath, 'styles/jsdoc.css');

    const content = this.fs.readFileSync(css, {
      encoding: 'utf-8',
    });

    this.fs.writeFileSync(css, `${content} \n${extra}`, {
      encoding: 'utf-8',
    });
  }

  finished() {
    console.log('Finished jsdoc local script.');
  }
}
