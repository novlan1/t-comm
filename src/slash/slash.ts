export function removeFirstSlash(key = '') {
  if (key.startsWith('/')) {
    return key.slice(1);
  }
  return key;
}


export function removeFirstAndLastSlash(str = '') {
  return str.replace(/^\/|\/$/g, '');
}
