const exportObj = {
  JSMAP: {},
};

/**
 * 动态加载JS
 * @param url - JS链接
 * @param options - defer/async/crossorigin选项
 * @returns Promise
 * @example
 *
 * loadJS('xx.js').then(() => {})
 */
export function loadJS(url, options) {
  return new Promise((resolve, reject) => {
    if (typeof exportObj.JSMAP[url] === 'undefined') {
      exportObj.JSMAP[url] = 0;

      const c: any = document.createElement('script');
      if (options?.defer) c.setAttribute('defer', 'defer');
      if (options?.async) c.setAttribute('async', 'async');
      if (options?.crossorigin) c.setAttribute('crossorigin', 'crossorigin');

      const e = document.body || document.getElementsByTagName('head')[0];
      c.onerror = function () {
        reject();
      };
      if (c.readyState) {
        c.onreadystatechange = function () {
          if (c.readyState === 'loaded' || c.readyState === 'complete') {
            c.onreadystatechange = null;
            exportObj.JSMAP[url] += 1;
            resolve(1);
          }
        };
      } else {
        c.onload = function () {
          exportObj.JSMAP[url] += 1;
          resolve(1);
        };
      }
      c.src = url;
      e.appendChild(c);
    } else {
      const tc = setInterval(() => {
        if (exportObj.JSMAP[url]) {
          clearInterval(tc);
          resolve(1);
        }
      }, 20);
    }
  });
}

/**
 * 动态加载CSS
 * @param url CSS链接
 * @example
 *
 * loadCSS('xxx.css')
 */
export function loadCSS(url) {
  let addSign = true;
  const links = document.getElementsByTagName('link');
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < links.length; i++) {
    if (links[i]?.href && links[i].href.indexOf(url) !== -1) {
      addSign = false;
    }
  }
  if (addSign) {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}
