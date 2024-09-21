import path from 'path';
import { readFileSync } from '../';

/**
 * 获取依赖列表
 * @param dir 目录
 * @returns dependenciesList
 */
export function getDeps(dir: string) {
  const data = readFileSync(path.resolve(dir, 'package.json'), true);

  return Object.keys({
    ...data.dependencies,
  });
}
