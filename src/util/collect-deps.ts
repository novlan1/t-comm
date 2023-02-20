function excludeRepeatElements(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = Array.from(new Set(obj[key])).filter(item => item !== key);
    return acc;
  }, {});
}


function realTraverse(list, map, result, originKey) {
  for (const key of [...list]) {
    if (result.indexOf(key) > -1) {
      continue;
    }
    result.push(key);
    let before = map[key];

    if (before) {
      before = before.filter(item => item !== originKey && list.indexOf(item) <= -1);
      realTraverse(before, map, result, originKey);
    }
  }
}

export function getFlattenedDeps(deps) {
  deps = excludeRepeatElements(deps);
  const list = Object.keys(deps);
  const newDeps = {};

  for (const item of list) {
    const temp = [...deps[item]];
    const result = [];
    realTraverse([...temp], deps, result, item);
    newDeps[item] = result;
  }
  const res = excludeRepeatElements(newDeps);
  return res;
}
