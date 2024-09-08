/* eslint-disable */
import { B64, B64RE, _fromCC } from './config';

const re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;


const _tidyB64 = function (s: string) {
  return s.replace(/[^A-Za-z0-9\+\/]/g, '');
};

const cb_btou = function (cccc: string) {
  switch (cccc.length) {
    case 4:
      var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
              | ((0x3f & cccc.charCodeAt(1)) << 12)
              | ((0x3f & cccc.charCodeAt(2)) << 6)
              | (0x3f & cccc.charCodeAt(3)); var offset = cp - 0x10000;
      return (_fromCC((offset >>> 10) + 0xD800)
              + _fromCC((offset & 0x3FF) + 0xDC00));
    case 3:
      return _fromCC(((0x0f & cccc.charCodeAt(0)) << 12)
              | ((0x3f & cccc.charCodeAt(1)) << 6)
              | (0x3f & cccc.charCodeAt(2)));
    default:
      return _fromCC(((0x1f & cccc.charCodeAt(0)) << 6)
              | (0x3f & cccc.charCodeAt(1)));
  }
};

const btou = function (b: string) {
  return b.replace(re_btou, cb_btou);
};


const _unURI = function (a: string) {
  return _tidyB64(a.replace(/[-_]/g, m0 => (m0 == '-' ? '+' : '/')));
};


export const decode = (str: string) => btou(innerDecode(_unURI(str)));


// 小程序版本的atob
export const innerDecode = function (string: string) {
  string = String(string).replace(/[\t\n\f\r ]+/g, '');
  if (!B64RE.test(string)) throw new TypeError('Failed to execute \'atob\' on \'Window\': The string to be decoded is not correctly encoded.');
  string += '=='.slice(2 - (string.length & 3));
  let bitmap; let result = '';
  let r1; let r2; let i = 0;
  for (; i < string.length;) {
    bitmap = B64.indexOf(string.charAt(i++)) << 18 | B64.indexOf(string.charAt(i++)) << 12
      | (r1 = B64.indexOf(string.charAt(i++))) << 6 | (r2 = B64.indexOf(string.charAt(i++)));

    result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255)
      : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255)
        : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
  }
  return result;
};
