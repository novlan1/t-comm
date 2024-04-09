export function sortObjectByKey<T extends string | number, F>(obj: Record<T, F>): Record<T, F> {
  if (!obj) {
    return obj;
  }

  const list = Object.keys(obj).map((key: string) => ({
    value: obj[key as T],
    key,
  }));

  list.sort((a, b) => {
    if (a.key < b.key) return -1;
    if (a.key > b.key) return 1;
    return 0;
  });
  const result = list.reduce((acc: Record<T, F>, item) => {
    acc[item.key as T] = item.value;
    return acc;
  }, {} as any);
  return result;
}
