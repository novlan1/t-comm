
import { writeFileSync, readFileSync } from '../fs/fs';

const getComponentNameStr = (componentName: string) => `export default {\n  name: '${componentName}',`;

/**
 * 为 Vue 组件添加、修正 name 属性
 * @param {string} filePath 组件地址
 * @param {string} componentName 组件名称
 * @returns {string} 新的组件内容
 *
 * @example
 * ```ts
 * addNameForComponent('xxx.vue', 'PressUploader');
 * ```
 */
export function addNameForComponent(filePath: string, componentName: string) {
  const content = readFileSync(filePath);

  const result = content
    .replace(/export default {(?!\s+name)/, getComponentNameStr(componentName))
    .replace(/export default {\s+name: '(\w+)',/, (a: string, origin: string) => {
      console.log('[origin] ', origin);
      return getComponentNameStr(componentName);
    });

  writeFileSync(filePath, result);


  return result;
}
