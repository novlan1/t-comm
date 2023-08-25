/**
 * polyfill for replaceAll
 *
 * @export
 *
 * @example
 *
 * replaceAllPolyfill()
 */
export function replaceAllPolyfill() {
  // @ts-ignore
  String.prototype.replaceAll = function (s1, s2) {
    let newStr = s1;
    if (typeof s1 === 'string') {
      newStr = s1.replace(/([+*?[\](){}^$|])/g, '\\$1');
    }

    return this.replace(new RegExp(newStr, 'gm'), s2 as string);
  };
}
