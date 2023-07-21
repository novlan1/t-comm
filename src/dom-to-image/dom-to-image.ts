import { loadJS } from '../loader/loader';
const html2canvasJSLink = 'https://image-1251917893.file.myqcloud.com/commjs/html2canvas.min.js';


/**
 * Dom转化为图片
 * @param {string} trigger  Dom的id
 * @param {string} imageElId  需要展示的图片的id
 *
 * @example
 * Dom2Image.convertDomToImage("app", "appImage");
 */
export function convertDomToImage(trigger: string, imageElId: string, callback: Function) {
  const opts: {
    useCORS: boolean;
    backgroundColor: string;
    scale?: number
    canvas?: HTMLCanvasElement
    width?: number
    height?: number
  } = {
    useCORS: true, // （图片跨域相关）
    // y: window.pageYOffset // 解决scroll导致截图失败，
    backgroundColor: 'transparent',
  };
  const imgDom = document.getElementById(trigger);
  if (imgDom) { // 放大canvas，避免截图模糊
    const canvas = document.createElement('canvas');
    const scale = 3;
    const width = imgDom.offsetWidth;
    const height = imgDom.offsetHeight;
    canvas.width = width * scale;
    canvas.height = height * scale;

    opts.scale = scale;
    opts.canvas = canvas;
    opts.width = width;
    opts.height = height;
  }

  loadJS(html2canvasJSLink).then(() => {
    // eslint-disable-next-line no-undef
    const triggerDom = document.getElementById(trigger);
    if (triggerDom) {
      window?.html2canvas(triggerDom, opts).then((canvas: any) => {
        const base64ImgSrc = canvas.toDataURL('image/png');
        const img = document.getElementById(imageElId) as HTMLImageElement;
        if (img) {
          img.src = base64ImgSrc;
        }
        if (callback && typeof callback === 'function') {
          callback(base64ImgSrc);
        }
      })
        .catch((error: any) => {
          console.warn('[convertDomToImage] error: ', error);
        });
    }
  });
}

/**
 * 解决图片跨域问题，将网络图片URL转为base64 URL。
 * @param {string} src 网络图片URL
 * @returns {Promise} Promise对象返回base64 URL
 *
 * @example
 * Dom2Image.urlToBase64("http://test.com/image.png").then(url=>{});
 */
export function urlToBase64(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    // 兼容不同格式的url，加随机数防止走缓存
    if (src.indexOf('?') === -1) {
      src = `${src}?t=${new Date().getTime()}`;
    } else {
      src = `${src}&t=${new Date().getTime()}`;
    }

    img.setAttribute('crossOrigin', 'anonymous');
    img.src = src;

    img.onload = () => {
      const canvas = convertImageToCanvas(img);
      const url = canvas.toDataURL('image/png');
      resolve(url);
    };

    img.onerror = () => {
      resolve('');
    };
  });
}

interface ICanvas extends HTMLCanvasElement {
  dpi: number;
}

/**
 * image url转canvas
 * @param image {Image} 图片src
 * @returns canvas
 */
export function convertImageToCanvas(image: HTMLImageElement) {
  const canvas = document.createElement('canvas') as ICanvas;
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.dpi = window.devicePixelRatio;
  canvas.getContext('2d')?.drawImage(image, 0, 0, image.width, image.height);
  return canvas;
}


