import { updateTencentSheet, updateTencentSheetImage } from '../tencent-doc/sheet';
import { uploadTencentDocImage } from '../tencent-doc/tencent-doc';

import type { ISecretInfo } from '../tencent-doc/types';


export async function updateQQMpResultToSheetV0({
  accessToken,
  clientId,
  openId,

  bookId,
  sheetId,

  startRow,

  qqMpQRCodePath,
  result,
}: ISecretInfo & {

  bookId: string;
  sheetId: string;

  startRow: number;
  startColumn?: number;

  qqMpQRCodePath: string;
  result: Record<string, any>;
}) {
  const uploadImageResult = await uploadTencentDocImage({
    accessToken,
    clientId,
    openId,
    image: qqMpQRCodePath,
  });

  console.log('[CI] upload image result: ', uploadImageResult);

  if (uploadImageResult?.ret != 0) {
    return uploadImageResult;
  }

  const updateImageResult = await updateTencentSheetImage({
    accessToken,
    clientId,
    openId,
    bookId,
    insertImages: {
      sheetID: sheetId,
      images: [
        {
          type: 1,
          imageID: uploadImageResult.data.imageID,
          width: 100,
          height: 100,
          row: startRow,
          col: 1,
          offsetX: null,
          offsetY: null,
          clip_info: null,
        },
      ],
    },
  });

  console.log('[CI] update sheet image result: ', updateImageResult);

  if (updateImageResult?.ret != 0) {
    return updateImageResult;
  }

  const {
    time,
    branch,
    env,
    robot,
    version,
    lastCommit,
    link,
  } = result;
  const updateTextResult = await updateTencentSheet({
    accessToken,
    clientId,
    openId,
    bookId,
    range: `${sheetId}!B${startRow}:H${startRow}`,
    values: [[
      time,
      branch,
      env,
      robot,
      version,
      lastCommit,
      link,
    ]],

  });
  console.log('[CI] update sheet text result: ', updateTextResult);

  return updateTextResult;
}
