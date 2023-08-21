export function replaceAllPolyfill() {
  // @ts-ignore
  String.prototype.replaceAll = function (s1, s2) {
    const newStr = s1.replace(/([+*?[\](){}^$|])/g, '\\$1');

    return this.replace(new RegExp(newStr, 'gm'), s2 as string);
  };
}
