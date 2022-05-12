/**
 * 移除CSS
 *
 * @param href - CSS链接
 *
 * @example
 * ```ts
 * removeCss('https://xxx.css')
 * ```
 */
export function removeCss(href) {
  const links = document.getElementsByTagName('link')
  for (let i = 0; i < links.length; i++) {
    if (links[i] && links[i].href && links[i].href.indexOf(href) !== -1) {
      ;(links[i].parentNode as HTMLElement).removeChild(links[i])
    }
  }
}
