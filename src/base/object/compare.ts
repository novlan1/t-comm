
import { isObjectEqual } from './equal';

export function compareTwoObj(originObj: Record<string, any> = {}, newObj: Record<string, any> = {}) {
  const res: {
    ADDED: Array<string>;
    UPDATED: Array<string>;
    DELETED: Array<string>;
    originObj: object;
    newObj: object;
  } = {
    ADDED: [],
    UPDATED: [],
    DELETED: [],
    originObj,
    newObj,
  };

  Object.keys(originObj).map((key) => {
    if (newObj[key] === undefined) {
      res.DELETED.push(key);
    } else if (!isObjectEqual(newObj[key], originObj[key])) {
      res.UPDATED.push(key);
    }
  });

  Object.keys(newObj).map((key) => {
    if (originObj[key] === undefined) {
      res.ADDED.push(key);
    }
  });
  return res;
}
