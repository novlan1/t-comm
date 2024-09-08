/* eslint-disable */
import { B64, _fromCC } from './config';
const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;

const utob = function (u: string) {
  return u.replace(re_utob, cb_utob);
};


const cb_utob = function (c: string) {
  if (c.length < 2) {
    var cc: any = c.charCodeAt(0);
    return cc < 0x80 ? c
      : cc < 0x800 ? (_fromCC(0xc0 | (cc >>> 6))
              + _fromCC(0x80 | (cc & 0x3f)))
        : (_fromCC(0xe0 | ((cc >>> 12) & 0x0f))
                  + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
                  + _fromCC(0x80 | (cc & 0x3f)));
  }

  var cc: any = 0x10000
          + (c.charCodeAt(0) - 0xD800) * 0x400
          + (c.charCodeAt(1) - 0xDC00);
  return (_fromCC(0xf0 | ((cc >>> 18) & 0x07))
          + _fromCC(0x80 | ((cc >>> 12) & 0x3f))
          + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
          + _fromCC(0x80 | (cc & 0x3f)));
};

export const encode = (str: string) => innerEncode(utob(str));


// 小程序版本的btoa
export const innerEncode = function (string: string) {
  string = String(string);
  let bitmap; let a; let b; let c;
  let result = '';
  let i = 0;
  const rest = string.length % 3;

  for (; i < string.length;) {
    if ((a = string.charCodeAt(i++)) > 255
      || (b = string.charCodeAt(i++)) > 255
      || (c = string.charCodeAt(i++)) > 255) throw new TypeError('Failed to execute \'btoa\' on \'Window\': The string to be encoded contains characters outside of the Latin1 range.');

    bitmap = (a << 16) | (b << 8) | c;
    result += B64.charAt(bitmap >> 18 & 63) + B64.charAt(bitmap >> 12 & 63)
      + B64.charAt(bitmap >> 6 & 63) + B64.charAt(bitmap & 63);
  }

  return rest ? result.slice(0, rest - 3) + '==='.substring(rest) : result;
};
