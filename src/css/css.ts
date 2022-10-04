/**
 * 移除CSS
 *
 * @param {string} href - CSS链接
 *
 * @example
 *
 * removeCss('https://xxx.css')
 */
export function removeCss(href) {
  const links = document.getElementsByTagName('link');
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < links.length; i++) {
    if (links[i]?.href && links[i].href.indexOf(href) !== -1) {
      (links[i].parentNode as HTMLElement).removeChild(links[i]);
    }
  }
}
