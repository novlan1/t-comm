import { loader } from './little-loader';


export function loadJS(url: string) {
  return new Promise((resolve) => {
    loader(url, () => {
      resolve(1);
    });
  });
}


/**
 * 动态加载CSS
 * @param {string} url CSS链接
 * @example
 *
 * loadCSS('xxx.css')
 */
export function loadCSS(url: string) {
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
