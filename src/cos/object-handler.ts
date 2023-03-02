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

  const toDeleteKeys = list.slice(keepNumber).reduce((acc, item) => {
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
