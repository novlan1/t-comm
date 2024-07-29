export const consoleImage = function (url: string) {
  const image = new Image();
  image.onload = function (this: any) {
    // @ts-ignore
    const isChromium = navigator.userAgent.match(/chrome|chromium|crios/i) && !!window.chrome;
    const style = [
      'font-size: 0px;',
      !isChromium ? `line-height: ${this.height}px;` : '',
      `padding: ${this.height / 2}px ${this.width / 2}px;`,
      `background: url(${url}) center center no-repeat;`,
      'background-size: contain;',
    ].join(' ');
    console.log('%c ', style);
  };
  image.src = url;
};

/**
 * 获取图片，并转 base64
 *
 * @param url 图片链接
 * @returns 获取结果
 * @example
 * ```ts
 * getBase64FromUrl(imgUrl).then(consoleImage);
 * ```
 */
export async function getBase64FromUrl(url: string) {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
    reader.onerror = reject;
  });
}

