import type { IterativeComponentMap } from './types';


export function genIterativeComponentMap(usingComponentsMap: IterativeComponentMap) {
  Object.keys(usingComponentsMap).map((page) => {
    const compObj = usingComponentsMap[page];
    Object.keys(compObj).map((comp) => {
      if (usingComponentsMap[comp]) {
        compObj[comp] = usingComponentsMap[comp];
      }
    });
  });
}
