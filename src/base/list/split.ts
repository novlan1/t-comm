export function getStrListLength(list: Array<string>) {
  return list.reduce((acc, item) => acc + item.length, 0);
}

export function splitLongList(list: Array<string>, threshold = 3800, max = 3) {
  const strLen = getStrListLength(list);
  if (strLen <= threshold) {
    return [list];
  }
  const result = [];
  let temp = [];
  for (let i = 0; i < list.length;i++) {
    const item = list[i];
    temp.push(item);

    const tempLen = getStrListLength(temp);
    if (tempLen >= threshold) {
      result.push(temp);
      temp = [];

      if (result.length >= max - 1) {
        temp = list.slice(i + 1);
        break;
      }
    }
  }
  result.push(temp);
  return result;
}
