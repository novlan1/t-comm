/* eslint-disable @typescript-eslint/no-require-imports */
import { timeStampFormat } from '../date/time';


const DEFAULT_EXTRA_CSS = `
.nav-separator {
  color: hsl(207, 1%, 60%);
  font-size: 12px;
  display: block;
}

nav ul a, nav ul a:active {
  font-size: 14px;
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
 * 默认处理source的方法，默认仅去掉的文件名
 * @private
 * @param source 文件路径
 * @returns 处理后的数据
 */
function defaultNavHandler(source) {
  const list = source.split('/');
  return list.slice(0, list.length - 1).join('/');
}


class JsDocHandler {
  /**
   * 初始化并运行
   * @static
   * @param {object} options 配置
   * @param {string} [options.docsPath] 文档所在目录位置，默认为`./docs`
   * @param {string} [options.author] 作者，默认为空
   * @param {string} [options.extraCss] 额外插入的css，默认为`.nav-separator`的一些样式
   * @param {string} [options.navHandler] 处理API所在文件的方法
   * @param {boolean} [options.isHandleNav] 是否处理导航栏，即插入文件名进行分隔，默认为false
   * @returns {object} JsDocHandler实例
   * @example
   *
   * JsDocHandler.init({
   *   author: 'novlan1',
   *   docsPath: './docs',
   *   extraCss: '.some-class{}',
   *   navHandler(nav) {
   *
   *   }
   * })
   *
   */
  static init(options) {
    const handler = new JsDocHandler(options);
    handler.run();
    return handler;
  }

  extraCss: string;
  author: string;
  docsPath: string;
  navHandler: Function;
  isHandleNav: boolean;
  fs;
  path;

  /**
   * 处理jsdoc的脚本
   * 1. 增加导航栏的分隔符
   * 2. 增加css
   * 3. 处理footer
   * @constructor
   * @param {object} options 配置
   * @param {string} [options.docsPath] 文档所在目录位置，默认为`./docs`
   * @param {string} [options.author] 作者，默认为空
   * @param {string} [options.extraCss] 额外插入的css，默认为`.nav-separator`的一些样式
   * @param {Function} [options.navHandler] 处理API所在文件的方法
   * @param {boolean} [options.isHandleNav] 是否处理导航栏，即插入文件名进行分隔，默认为false
   */
  constructor(options: {
    docsPath?: string
    author?: string
    extraCss?: string
    navHandler?: Function
    isHandleNav?: boolean;
  } = {}) {
    const {
      docsPath = './docs',
      author =  '',
      extraCss = DEFAULT_EXTRA_CSS,
      navHandler = defaultNavHandler,
      isHandleNav = false,
    } = options;

    this.docsPath = docsPath;
    this.author = author;
    this.extraCss = extraCss;
    this.navHandler = navHandler;
    this.isHandleNav = isHandleNav;
    this.fs = this.getFs();
    this.path = this.getPath();
  }

  run() {
    let sourceMap = {};
    if (this.isHandleNav) {
      sourceMap = this.getGlobalSourceMap();
    }
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

      source = this.navHandler(source);

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

export {
  JsDocHandler,
};
