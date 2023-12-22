import { isWindows } from '../validate/validate';

/**
 * 格式化路径
 * @param path 文件路径，或目录路径
 * @returns 格式化后的路径
 * @example
 * ```ts
 * normalizePath('xxx/xxx/xxx');
 *
 * normalizePath('xxx\\xxx\\xxx');
 * ```
 */
export const normalizePath = (path: string) => (isWindows() ? path.replace(/\\/g, '/') : path);
