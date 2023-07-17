/* eslint-disable @typescript-eslint/no-require-imports */
import { timeStampFormat } from '../time/time';

type ICheerIO = any;
type IJSDocOptions = {
  docsPath?: string
  author?: string
  extraCss?: string
  extraScript?: string
  navHandler?: Function
  isHandleNav?: boolean;
};


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

function getSeparatorStr(content: string) {
  const maxLen = 14;
  const lastLen = parseInt(`${maxLen - (content.length) / 2}`, 10);
  const fill = Array.from({ length: lastLen })
    .map(() => '-')
    .join('');

  return `${fill}   ${content}   ${fill}`;
}

/**
 * 删除重复的部分
 * @ignore
 */
function deleteRepeatedSections($: ICheerIO) {
  const sections = $('section');
  let last = '';
  sections.map((_: any, section: any) => {
    const html = $(section).html()
      .trim();
    if (html === last) {
      $(section).remove();
    } else {
      last = html;
    }
  });
  return $;
}

/**
 * 替换footer
 * @ignore
 * @param $ cheerio
 * @param author 作者
 */
function replaceFooter($: ICheerIO, author: string) {
  const timezone = new Date().getTimezoneOffset() / -60;
  const footerContent = `Documentation generated on ${timeStampFormat(Date.now(), 'yyyy-MM-dd hh:mm:ss')} GMT+0${timezone}00 ${author && ` by ${author}`}.`;
  $('footer').html(footerContent);
}


/**
 * 找到 Modules 下的导航列表
 * @ignore
 * @param $ cheerio
 */
function findModuleNav($: ICheerIO) {
  const titles = $('body nav h3');
  let res;
  titles.map((_: any, title: any) => {
    if ($(title).html()
      .trim() === 'Modules') {
      res = $(title).next();
    }
  });
  return res;
}


/**
 * 获取nav头部，比如 tools/url => tools
 * @ignore
 */
function getNavPrefix(nav = '') {
  if (nav.indexOf('/') < 0) {
    return '';
  }
  return nav.split('/')[0];
}

/**
 * 给 Modules 下的导航列表插入分隔符
 * @ignore
 * @param $ cheerio
 */
function insertModuleNavSeparator($: ICheerIO) {
  const module = findModuleNav($);
  if (!module) return;

  let last = '';
  $(module).children('li')
    .map((_: any, li: any) => {
      const nav = $(li).children('a')
        ?.html()
        ?.trim();
      const prefix = getNavPrefix(nav);

      if (prefix && last !== prefix) {
        $(li).before(`<li class="nav-separator">${getSeparatorStr(prefix)}</li>`);
      }

      if (prefix) {
        last = prefix;

        const navList = nav.split('/');
        $(li).children('a')
          .html(navList.slice(1).join('/'));
      }
    });
}


/**
 * 插入分隔符
 * @ignore
 */
function insertNavSeparator($: ICheerIO, sourceMap: Record<string, string>) {
  const naves = $('nav > ul li');
  let cur = '';

  naves.map((_: any, dom: any) => {
    const nav = $(dom).find('a')
      .attr('href')
      ?.trim();
    if (nav && sourceMap[nav] && cur !==  sourceMap[nav]) {
      $(dom).before(`<li class="nav-separator">${sourceMap[nav]}</li>`);
      cur =  sourceMap[nav];
    }
  });
}

/**
 * 插入script
 * @ignore
 */
function insertScript($: any, script = '') {
  if (!script) return;
  $('head').children()
    .last()
    .after(script);
}


/**
 * 默认处理source的方法，默认仅去掉的文件名
 * @ignore
 * @param source 文件路径
 * @returns 处理后的数据
 */
function defaultNavHandler(source: string) {
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
  static init(options: IJSDocOptions) {
    const handler = new JsDocHandler(options);
    handler.run();
    return handler;
  }

  extraCss: string;
  extraScript: string;
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
   * @param {string} [options.extraScript] 额外插入的script
   * @param {Function} [options.navHandler] 处理API所在文件的方法
   * @param {boolean} [options.isHandleNav] 是否处理导航栏，即插入文件名进行分隔，默认为false
   */
  constructor(options: IJSDocOptions = {}) {
    const {
      docsPath = './docs',
      author =  '',
      extraCss = DEFAULT_EXTRA_CSS,
      extraScript = '',
      navHandler = defaultNavHandler,
      isHandleNav = false,
    } = options;

    this.docsPath = docsPath;
    this.author = author;
    this.extraCss = extraCss;
    this.extraScript = extraScript;
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
    console.log('[Jsdoc] Parsing nav list of global.html ...');
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
  getSourceMap(file: string) {
    const html = this.path.resolve(this.docsPath, file);
    const content = this.fs.readFileSync(html, {
      encoding: 'utf-8',
    });

    const cheerio = require('cheerio');
    const $ = cheerio.load(content);
    const sourceMap: Record<string, string> = {};
    const names = $('#main section article h4.name');

    names.map((_: any, dom: any) => {
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

  handleEveryHtml(sourceMap: Record<string, string>, author: string) {
    const files = this.fs.readdirSync(this.docsPath);
    files.forEach((file: string) => {
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

  parseSourceMap(sourceMap: Record<string, any>) {
    return Object.keys(sourceMap).reduce((acc: Record<string, string>, key) => {
      const value = sourceMap[key];
      acc[key] = getSeparatorStr(value);
      return acc;
    }, {});
  }


  getParsedHtml(content: string, sourceMap: Record<string, string>, author: string) {
    const cheerio = require('cheerio');
    const $ = cheerio.load(content);
    const { extraScript } = this;

    // 删除重复selection
    deleteRepeatedSections($);

    // 插入分隔符
    insertNavSeparator($, sourceMap);

    // Modules下的导航栏插入分隔符
    insertModuleNavSeparator($);

    // 插入script
    insertScript($, extraScript);

    // 处理footer
    replaceFooter($, author);
    return $.html();
  }


  appendCSS(extra: string) {
    console.log('[Jsdoc] Appending extra css ...');

    const css = this.path.resolve(this.docsPath, 'styles/jsdoc.css');

    const content = this.fs.readFileSync(css, {
      encoding: 'utf-8',
    });

    this.fs.writeFileSync(css, `${content} \n${extra}`, {
      encoding: 'utf-8',
    });
  }

  finished() {
    console.log('[Jsdoc] Finished jsdoc local script.');
  }
}

export {
  JsDocHandler,
};

