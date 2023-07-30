/* eslint-disable no-restricted-syntax */
const getRawType = (val: any) => Object.prototype.toString.call(val).slice(8, -1);
const isPlainObject = (val: any) => getRawType(val) === 'Object';

const isPlainObjectOrArray = (val: any) => isPlainObject(val) || Array.isArray(val);

export const merge = (object: any, ...sources: any) => {
  for (const source of sources) {
    for (const key in source) {
      if (source[key] === undefined && key in object) {
        continue;
      }
      if (isPlainObjectOrArray(source[key])) {
        if (isPlainObjectOrArray(object[key]) && getRawType(object[key]) === getRawType(source[key])) {
          if (isPlainObject(object[key])) {
            merge(object[key], source[key]);
          } else {
            object[key] = object[key].concat(source[key]);
          }
        } else {
          object[key] = source[key];
        }
      } else {
        object[key] = source[key];
      }
    }
  }
  return object;
};
