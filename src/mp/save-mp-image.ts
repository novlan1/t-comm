const WRITE_PHOTO_ALBUM_SCOPE = 'scope.writePhotosAlbum';
const TIP_MAP = {
  saveImage: '保存到相册',
  saveImageSuccess: '已保存到相册',
  saveImageFail: '保存相册失败',
  saveImageFailOfAuth: '保存相册失败，请检查权限',
  authConfirmContent: '检测到您没打开保存图片权限，是否去设置打开？',
  authConfirmFailToast: '您没有授权，无法保存到相册',
};

type IOptions = Record<keyof typeof TIP_MAP, string>;
type IPromiseParam = {
  url: string, options: IOptions
};
type IPromiseResp = Promise<IPromiseParam>;


function authConfirm(options: IOptions) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      content: options.authConfirmContent,
      confirmText: '确认',
      cancelText: '取消',
      success(res: any) {
        if (res.confirm) {
          wx.openSetting({
            success(res: any) {
              if (res.authSetting[WRITE_PHOTO_ALBUM_SCOPE]) {
                resolve(true);
              } else {
                wx.showToast({
                  title: options.authConfirmFailToast,
                  icon: 'none',
                });
                reject();
              }
            },
          });
        } else {
          wx.showToast({
            title: options.authConfirmFailToast,
            icon: 'none',
          });
          reject();
        }
      },
    });
  });
}


function showSaveImageModal({
  url,
  options,
}: {
  url: string, options: IOptions
}): IPromiseResp {
  return new Promise((resolve, reject) => {
    wx.showActionSheet({
      itemList: [options.saveImage],
      success: () => {
        resolve({ url, options });
      },
      fail: (err: any) => {
        reject(err);
      },
    });
  });
}

// 授权
function checkWritePhotoAuth({ url, options }: IPromiseParam): IPromiseResp {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (settings: any) => {
        if (!settings.authSetting[WRITE_PHOTO_ALBUM_SCOPE]) {
          wx.authorize({
            scope: WRITE_PHOTO_ALBUM_SCOPE,
            success: () => {
              // 同意授权
              resolve({ url, options });
            },
            fail: () => {
              authConfirm(options)
                .then(() => {
                  resolve({ url, options });
                })
                .catch(reject);
            },
          });
        } else {
          // 已经有权限了
          resolve({ url, options });
        }
      },
    });
  });
}

// 转换图片格式为本地路径
function getImageLocalPath({ url, options }: IPromiseParam): Promise<{
  path: string;
  options: IOptions
}> {
  return  new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: url,
      success: (res: any) => {
        resolve({
          path: res.path,
          options,
        });
      },
      fail: (err: any) => {
        reject(err);
      },
    });
  });
}


function saveImageToAlbum({
  path,
  options,
}: {
  path: string;
  options: IOptions;
}) {
  const p4 = new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      filePath: path,
      success: () => {
        wx.showToast({
          title: options.saveImageSuccess,
        });
        resolve(true);
      },
      fail: (err: any) => {
        let message = options.saveImageFail;
        const { errMsg = '' } = err || {};
        if (errMsg.indexOf('fail system deny') > -1 || errMsg.indexOf('fail save error') > -1) {
          message = options.saveImageFailOfAuth;
        }

        wx.showToast({
          title: message,
          icon: 'none',
        });
        console.log(err);
        reject(err);
      },
    });
  });
  return p4;
}

/**
 * 小程序下保存图片
 * @param {string} url 图片地址
 * @param {object} options 提示选项
 * @example
 * ```ts
 * saveMpImage('https://xxx.png');
 * ```
 */
export function saveMpImage(url: string, options: Partial<IOptions> = TIP_MAP) {
  const newOptions = {
    ...TIP_MAP,
    ...options,
  };
  showSaveImageModal({ url, options: newOptions })
    .then(checkWritePhotoAuth)
    .then(getImageLocalPath)
    .then(saveImageToAlbum);
}
