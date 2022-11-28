import { isPlainObject } from '../validate';

function cursiveGetDeps({
  list,
  parentList,
  storeMap,
  parsedMap = {},

  parseExistFn,
  filterFn,
}) {
  return list.map((child) => {
    // 记录处理后的文件，直接返回
    if (parsedMap[child]) {
      if (typeof parseExistFn === 'function') {
        return parseExistFn(child, parsedMap);
      }
      // 返回整体
      return parsedMap[child];

      // 直接跳过
      // return null

      // 返回标记，适用于依赖太多，文件爆炸情况
      // return {
      //   name: `EXIST_${child}`,
      //   children: [],
      // };
    }
    // 过滤node_modules
    if (typeof filterFn === 'function') {
      const filterRes = filterFn(child);
      // 只有 undefined 才不处理，也就是 null、0、[] 这些都被处理
      if (filterRes !== undefined) {
        return filterRes;
      }
      // 直接跳过
      // return null;

      // 返回标记
      // return {
      //   name: 'NODE_MODULES',
      //   children: [],
      // };
    }
    // console.log();
    // console.log(`[DEP] 处理${child}`);

    let rawChild = storeMap[child] || [];

    if (rawChild.indexOf(child) > -1) {
      // console.log(`[DEP] 存在循环引用 ${child} 子元素包含自己`);
      rawChild = rawChild.filter(item => item !== child);
    }

    if (parentList) {
      rawChild = rawChild.filter((item) => {
        if (parentList && parentList.indexOf(item) > -1) {
          // console.log(`[DEP] 存在循环引用 ${child} 子元素引用了祖先元素 ${item}`);
        }
        return parentList.indexOf(item) <= -1;
      });
    }

    const obj = {
      name: child,
      children: [],
    };

    if (!parentList) {
      parentList = [child];
    } else {
      parentList = [...parentList, child];
    }

    const res = cursiveGetDeps({
      list: rawChild,
      parentList,
      storeMap,
      parsedMap,
      parseExistFn,
      filterFn,
    });

    obj.children = res;

    parsedMap[child] = obj;

    return obj;
  }).filter(item => item);
}


/**
 * 递归收集依赖
 * @param {Object} deps 待处理的对象
 * @example
 *
 * const deps = {
 *   a: ['b'],
 *   b: ['g', 'a'],
 *   g: ['p'],
 *   p: ['d', 'a', 'p', 'b'],
 * };
 *
 * const res = collectNestedDeps(deps);
 * console.log(res);
 *
 * // 结果如下：
 * [
 *   {
 *     name: 'a',
 *     children: [
 *       {
 *         name: 'b',
 *         children: [
 *           {
 *             name: 'g',
 *             children: [
 *               {
 *                 name: 'p',
 *                 children: [
 *                   {
 *                     name: 'd',
 *                     children: [],
 *                   },
 *                 ],
 *               },
 *             ],
 *           },
 *         ],
 *       },
 *     ],
 *   },
 *   {
 *     name: 'b',
 *     children: [
 *       {
 *         name: 'g',
 *         children: [
 *           {
 *             name: 'p',
 *             children: [
 *               {
 *                 name: 'd',
 *                 children: [],
 *               },
 *             ],
 *           },
 *         ],
 *       },
 *     ],
 *   },
 *   {
 *     name: 'g',
 *     children: [
 *       {
 *         name: 'p',
 *         children: [
 *           {
 *             name: 'd',
 *             children: [],
 *           },
 *         ],
 *       },
 *     ],
 *   },
 *   {
 *     name: 'p',
 *     children: [
 *       {
 *         name: 'd',
 *         children: [],
 *       },
 *     ],
 *   },
 * ];
 *
 *
 */
export function collectNestedDeps({
  deps,
  parseExistFn,
  filterFn,
}: {
  deps: Object
  parseExistFn?: Function
  filterFn?: Function

}) {
  if (!isPlainObject(deps)) {
    throw new Error('deps 需要为对象');
  }

  const list = Object.keys(deps);

  const parsedMap = {};

  const depMap = cursiveGetDeps({
    list,
    parentList: null,
    storeMap: deps,
    parsedMap,
    parseExistFn,
    filterFn,
  });

  return depMap;
}


function cursiveFlattenDeps(depList, list) {
  for (const item of depList) {
    list.push(item.name);
    cursiveFlattenDeps(item.children, list);
  }
}


export function getFlattenedDeps(deps) {
  const depList = collectNestedDeps({ deps });
  const obj = {};

  for (const item of depList) {
    const list = [];
    cursiveFlattenDeps(item.children, list);
    obj[item.name] = Array.from(new Set(list));
  }

  return obj;
}
