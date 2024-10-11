export function sortByStr(list: Array<string | Record<string, string>>, key?: string, reverse = false) {
  list.sort((a, b) => {
    if (!key) {}
    const valueA = key ? a[key as keyof typeof a] : a;
    const valueB = key ? b[key as keyof typeof b] : b;

    if (reverse) {
      return (valueB as string).localeCompare(valueA as string);
    }
    return (valueA as string).localeCompare(valueB as string);
  });
}
