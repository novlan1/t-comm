import {
  getCOSBucketList,
  deleteCOSMultipleObject,
} from './cos';

export async function deleteCOSLongAgoObject({
  secretId,
  secretKey,
  bucket,
  region,
  prefix,
  keepNumber = 1,
}: {
  secretId: string;
  secretKey: string;
  bucket: string;
  region: string;
  prefix: string;
  keepNumber?: number;
}) {
  let list = await getCOSBucketList({
    secretId,
    secretKey,
    bucket,
    region,
    prefix,
  });

  const reg = new RegExp(`^${prefix}[^/]*$`);
  // 排除文件夹、子文件夹中内容
  list = list.filter(item => !item.Key.endsWith('/') && reg.test(item.Key));
  list.sort((a, b) => new Date(b.LastModified).getTime() - new Date(a.LastModified).getTime());

  const toDeleteKeys = list.slice(keepNumber).reduce((acc: Array<string>, item) => {
    acc.push(item.Key);
    return acc;
  }, []);

  console.log('[deleteCOSLongAgoObject] toDeleteKeys: ', toDeleteKeys);
  if (!toDeleteKeys?.length) return;

  return await deleteCOSMultipleObject({
    secretId,
    secretKey,
    bucket,
    region,
    keys: toDeleteKeys,
  });
}


export async function deleteCOSEmptyFolder({
  secretId,
  secretKey,
  bucket,
  region,
  prefix,
}: {
  secretId: string;
  secretKey: string;
  bucket: string;
  region: string;
  prefix: string;
}) {
  const list = await getCOSBucketList({
    secretId,
    secretKey,
    bucket,
    region,
    prefix,
  });

  const keys = list.map(item => item.Key);
  const emptyKeys = keys.filter(item => item.endsWith('/') && !keys.find(key => new RegExp(`^${item}.+`).test(key)));

  console.log('[deleteCOSEmptyFolder] emptyKeys: ', emptyKeys);

  return await deleteCOSMultipleObject({
    secretId,
    secretKey,
    bucket,
    region,
    keys: emptyKeys,
  });
}
