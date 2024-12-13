import type { ComponentMapList } from './types';


export function flattenUsingComponentMap(rawMap: Record<string, any>): ComponentMapList {
  const res: ComponentMapList = {};

  function cursive(componentsMap = {}, components: Array<string> = [], fathers: Array<string>) {
    const keys = Object.keys(componentsMap);
    for (const key of keys) {
      if (fathers.includes(key)) {
        // 防止递归调用，即防止子孙和祖先相同
        continue;
      }

      const subComponentsMap = rawMap[key];

      if (subComponentsMap) {
        const innerKeys = Object.keys(subComponentsMap);

        innerKeys.forEach((innerKey) => {
          if (!fathers.includes(innerKey)) {
            // 防止递归调用
            components.push(innerKey);
          }
        });

        cursive(subComponentsMap, components, [...fathers, key]);
      }
    }
  }

  Object.keys(rawMap).map((key) => {
    let components: Array<string> = [];
    const componentsMap = rawMap[key];

    if (componentsMap) {
      components.push(...Object.keys(componentsMap));
      components = Array.from(new Set(components));
    }
    cursive(componentsMap, components, [key]);

    res[key] = components;
  });

  return res;
}

