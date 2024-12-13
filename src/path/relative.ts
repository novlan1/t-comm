import path from 'path';


/**
 * A引用B时，拿引用路径
 * @param pathA 路径A
 * @param pathB 路径B
 * @returns 相对路径
 * @example
 * ```ts
 * getRelativePath('a', 'b');
 *
 * // './b'
 * ```
 */
export function getRelativePath(pathA: string, pathB: string) {
  const result = path.relative(path.join(pathA, '..'), pathB);

  if (!result.startsWith('.')) {
    return `./${result}`;
  }
  return result;
}
