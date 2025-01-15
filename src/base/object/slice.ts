export function sliceObject<T>(info: Record<string, T>, max: number) {
  if (!info) {
    return {};
  }
  const keys = Object.keys(info);
  if (keys.length < max) {
    return info;
  }

  return keys.slice(0, max).reduce((acc: Record<string, T>, key) => {
    acc[key] = info[key];
    return acc;
  }, {});
}
