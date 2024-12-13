export function parseComponentPath(filePath: string, relativePath: string) {
  const REG = /(\/|^)[^/]+$/; // `abc/xxx` 中的 `/xxx`
  const SAME_REG = /^\.\//; // 以 `./` 开头
  const DIFF_REG = /^\.\.\//;// 以 `../` 开头

  const generatePath: (list: string[]) => string = (list: string[]) => list.filter(item => item).join('/');

  if (filePath.startsWith('/')) {
    return filePath.replace(/^\//, '');
  }
  if (relativePath.startsWith('/')) {
    return relativePath.replace(/^\//, '');
  }

  let tempResult = filePath;
  tempResult = tempResult.replace(REG, '');

  if (SAME_REG.test(relativePath)) {
    return generatePath([tempResult, relativePath.replace(SAME_REG, '')]);
  }

  let tempRelative = relativePath;
  while (DIFF_REG.test(tempRelative)) {
    tempResult = tempResult.replace(REG, '');
    tempRelative = tempRelative.replace(DIFF_REG, '');
  }


  return generatePath([tempResult, tempRelative]);
}
