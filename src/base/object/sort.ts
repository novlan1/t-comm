export function sortObjectByKey(obj: any) {
  if (!obj) {
    return obj;
  }

  const list = Object.keys(obj).map(key => ({
    value: obj[key],
    key,
  }));

  list.sort((a, b) => {
    if (a.key < b.key) return -1;
    if (a.key > b.key) return 1;
    return 0;
  });
  const result = list.reduce((acc: any, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
  return result;
}
