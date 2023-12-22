/**
 * 移除CSS
 *
 * @param {string} href - CSS链接
 *
 * @example
 *
 * removeCss('https://xxx.css')
 */
export function removeCss(href: string) {
  const links = document.getElementsByTagName('link');
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < links.length; i++) {
    if (links[i]?.href && links[i].href.indexOf(href) !== -1) {
      (links[i].parentNode as HTMLElement).removeChild(links[i]);
    }
  }
}


function loadStyle(url: string, urlClass: string) {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  link.className = urlClass; // 'load-style';
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
}


/**
 * 加载多个样式文件，并在加载前移除具有相同类名的文件
 * @param {array} urls 外链地址列表
 * @param {string} urlClass 外链类名
 *
 * @example
 *
 * ```ts
 * loadStyles(['https://a.com/b.css'], 'load-style');
 * ```
 */
export function loadStyles(urls: Array<string>, urlClass: string) {
  // 先删除其他的
  Array.prototype.slice.call(document.getElementsByClassName(urlClass)).forEach(item => item.remove());
  // loadJs('https://image-1251917893.file.myqcloud.com/igame/common/js/adapter.js');
  [...urls].forEach((url) => {
    loadStyle(url, urlClass);
  });
}


/**
 * 加载样式代码块，会将样式代码包裹在 style 标签内，并加载到当前页面中
 * @param {string} code 样式代码
 * @param {string} className 类名
 *
 * @example
 *
 * ```ts
 * loadCssCode(
 *   '.press__cover { color: red; }',
 *   'load-css-code'
 * );
 * ```
 */
export function loadCssCode(code: string, className: string) {
  Array.prototype.slice.call(document.getElementsByClassName(className)).forEach(item => item.remove());

  const style: HTMLStyleElement = document.createElement('style');
  style.className = className;// 'load-css-code';
  style.type = 'text/css';
  // @ts-ignore
  style.rel = 'stylesheet';

  try {
    // for Chrome Firefox Opera Safari
    style.appendChild(document.createTextNode(code));
  } catch (ex) {
    // for IE
    // @ts-ignore
    style.styleSheet.cssText = code;
  }
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(style);
}


