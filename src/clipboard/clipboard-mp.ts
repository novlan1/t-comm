
/**
 * 小程序粘贴
 *
 * @param {string} text 待复制的文本
 * @returns {Promise<void>}
 */
export function clipboardMp(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (wx) {
      wx.setClipboardData({
        data: `${text}`,
        success: () => {
          resolve();
        },
        fail: (error: any) => {
          console.log(error);
          reject();
        },
      });
    } else {
      reject();
    }
  });
}

