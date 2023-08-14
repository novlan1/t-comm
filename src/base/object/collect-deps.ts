type IDeps = Record<string, Array<string>>;

function excludeRepeatElements(obj: IDeps) {
  return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
    acc[key] = Array.from(new Set(obj[key])).filter(item => item !== key);
    return acc;
  }, {});
}


function realTraverse(list: Array<string>, map: IDeps, result: Array<string>, originKey: string) {
  for (const key of [...list]) {
    if (result.indexOf(key) > -1) {
      continue;
    }
    result.push(key);
    let before = map[key];

    if (before) {
      before = before.filter((item: string) => item !== originKey && list.indexOf(item) <= -1);
      realTraverse(before, map, result, originKey);
    }
  }
}

export function getFlattenedDeps(deps: IDeps) {
  deps = excludeRepeatElements(deps);
  const list = Object.keys(deps);
  const newDeps: Record<string, any> = {};

  for (const item of list) {
    const temp = [...deps[item]];
    const result: Array<string> = [];
    realTraverse([...temp], deps, result, item);
    newDeps[item] = result;
  }
  const res = excludeRepeatElements(newDeps);
  return res;
}
