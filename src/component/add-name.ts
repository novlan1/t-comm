
import * as fs from 'fs';

const getComponentNameStr = componentName => `export default {\n  name: '${componentName}',`;

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
export function addNameForComponent(filePath, componentName) {
  const content = fs.readFileSync(filePath, {
    encoding: 'utf-8',
  });

  const result = content
    .replace(/export default {(?!\s+name)/, getComponentNameStr(componentName))
    .replace(/export default {\s+name: '(\w+)',/, (a, origin) => {
      console.log('[origin] ', origin);
      return getComponentNameStr(componentName);
    });

  fs.writeFileSync(filePath, result, {
    encoding: 'utf-8',
  });

  return result;
}
