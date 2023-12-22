/**
 * 处理图片尺寸，即去掉单位 px/rem，将 string 类型转为 number 类型
 * rem 单位的话，会将数值乘以根元素的 fontSize，以获取对应的 px 值
 * @param {Number | String} size 输入单位
 * @returns {Number} 处理后的数值
 *
 * @example
 *
 * handleImgUnit(3)
 * // 3
 *
 * handleImgUnit('10')
 * // 10
 *
 * handleImgUnit('30px')
 * // 30
 *
 * handleImgUnit('5rem')
 * // 250
 *
 * document.documentElement.style.fontSize = '10px';
 * handleImgUnit('5rem')
 * // 50
 */
export const handleImgUnit = function (size: string | number) {
  if (!size || typeof size === 'number') {
    return size;
  }
  if (size.indexOf('px') === -1 && size.indexOf('rem') === -1) {
    return parseFloat(size);
  }

  if (size.indexOf('px') > -1) {
    return parseFloat(size.replace('px', ''));
  }

  let baseFontSize = 50;
  try {
    baseFontSize = parseFloat(document.documentElement.style.fontSize.replace('px', ''));
    if (isNaN(baseFontSize)) {
      baseFontSize = 50;
    }
  } catch (e) {
    console.log('err', e);
  }

  if (size.indexOf('rem') > -1) {
    return parseFloat(size.replace('rem', '')) * baseFontSize;
  }
};

const zhizhu = 'game.gtimg.cn';
const youtu = 'image.myqcloud.com';
const wxlogo = 'wx.qlogo.cn';
const thirdqq = 'thirdqq.qlogo.cn';
const thirdwx = 'thirdwx.qlogo.cn';
const qqlogo = 'q.qlogo.cn';
const ossweb = 'ossweb-img.qq.com';

const cdnMap = new Map([
  ['igame-10037599.cos.ap-shanghai.myqcloud.com', 'igame-10037599.file.myqcloud.com'],
  ['image-1251917893.cos.ap-guangzhou.myqcloud.com', 'image-1251917893.file.myqcloud.com'],
  ['igame-10037599.image.myqcloud.com', 'igame-10037599.file.myqcloud.com'],
]);

const isTencentPic = function (url: string) {
  return url && (url.indexOf(zhizhu) !== -1
    || url.indexOf(youtu) !== -1
    || url.indexOf(wxlogo) !== -1
    || url.indexOf(thirdqq) !== -1
    || url.indexOf(qqlogo) !== -1
    || url.indexOf(thirdwx) !== -1
    || url.indexOf(ossweb) !== -1);
};

const TENCENT_CLOUD_PICS = [
  '.myqcloud.com/',
  'cyberimage.sgameglobal.com/',
];


const startWithHttp = function (url: string) {
  const http = /http:/;
  return http.test(url);
};


/**
 * 将图片地址由 http 替换为 https 协议
 * @param url 图片地址
 * @returns 新的地址
 */
export const getHttpsUrl = function (url: string) {
  if (startWithHttp(url) && isTencentPic(url)) {
    url = url.replace('http', 'https');
  }
  return url;
};

/**
 * 获取 cdn 链接
 * @param {string} url 图片地址
 * @returns 新的地址
 */
export function getCdnUrl(url = ''): string {
  if (url) {
    const domainStr = url.split('/');
    if (domainStr && domainStr.length > 2) {
      const domain = domainStr[2];
      if (cdnMap.has(domain)) {
        url = url.replace(domain, cdnMap.get(domain)!);
      }
      return url;
    }
  } else {
    return url;
  }
  return '';
}


function getCompressTencentImgSize(imageWidth: number, imageHeight: number) {
  let width = 0;
  let height = 0;
  if (imageWidth && imageHeight) {
    width = imageWidth > 0 ? (imageWidth * 2) : 0;
    height = imageHeight > 0 ? (imageHeight * 2) : 0;
  }

  // width和height都按10取整，解决图片大小微微改变的时候，图片闪烁的问题
  width = formatInt(width, 1, true);
  height = formatInt(height, 1, true);

  // 有时候图片没设置长宽，导致图片100%时图片过大，选择宽度优先
  if (width > 200 && height > 200 && width === height) {
    height = 0;
  }

  if (width < 10 && height < 10) {
    width = 0;
    height = 0;
  }

  return {
    width,
    height,
  };
}


function getCompressTencentImgUrl(url: string, imageWidth: number, imageHeight: number) {
  // 如果是腾讯云的图片实现按需加载（1倍的时候感觉图片有点糊，放大到2倍）
  const isTencentCloudPic = url
    && TENCENT_CLOUD_PICS.some(item => url.indexOf(item) !== -1)
    && url.indexOf('?') === -1;

  if (!isTencentCloudPic) {
    return url;
  }
  const { width, height } = getCompressTencentImgSize(imageWidth, imageHeight);

  if (width > 150 || height > 150) {
    url = `${url}?imageMogr2/format/yjpeg/quality/80/thumbnail/!${width > 0 ? width.toString() : ''}x${height > 0 ? height.toString() : ''}r`;
  } else if (width > 0 || height > 0) {
    url = `${url}?imageMogr2/thumbnail/!${width > 0 ? width.toString() : ''}x${height > 0 ? height.toString() : ''}r`;
  }
  return url;
}

/**
 * 获取压缩后的图片
 * @param {string} url 图片地址
 * @param {number} [imageWidth=0] 宽度
 * @param {number} [imageHeight=0] 高度
 * @returns 新的 url 地址
 */
export function getCompressImgUrl(
  url: string | { width?: number; height?: number; url?: string; replace?: Function },
  imageWidth = 0,
  imageHeight = 0,
): string {
  // 游戏内无法加载http，统一替换
  url = url?.replace?.('http:', 'https:');

  if (typeof url === 'object') {
    imageWidth = url.width ? url.width : 0;
    imageHeight = url.height ? url.height : 0;
    url = url.url ? url.url : '';
  }

  url = getCompressTencentImgUrl(url as string, imageWidth, imageHeight);
  return url as string;
}

const formatInt = function (num: number, prec = 2, ceil = true) {
  const len = String(num).length;
  if (len <= prec) {
    return num;
  }

  const mult = Math.pow(10, prec);
  return ceil
    ? Math.ceil(num / mult) * mult
    : Math.floor(num / mult) * mult;
};


/**
 * 压缩图片，会依次执行 getHttpsUrl, getCdnUrl, getCompressImgUrl
 * @param {string} url 图片地址
 * @param {number} [imageWidth=0] 宽度
 * @param {number} [imageHeight=0] 高度
 * @returns 新的 url 地址
 */
export const tinyImage = function (url: string, imageWidth = 0, imageHeight = 0) {
  url = getHttpsUrl(url);
  url = getCdnUrl(url);
  url = getCompressImgUrl(url, imageWidth, imageHeight);
  return url;
};


const supportsWebp = ({
  createImageBitmap,
  Image,
}: {
  createImageBitmap: Function;
  Image: any
}) => {
  if (!createImageBitmap || !Image) return Promise.resolve(false);

  return new Promise((resolve) => {
    // 加载一个1x1的空白图片，看下是否支持webP
    const image = new Image();
    image.onload = () => {
      createImageBitmap(image)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    };
    image.onerror = () => {
      resolve(false);
    };
    image.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  });
};


/**
 * 判断当前浏览器是否支持 webp
 * @returns {Promise<boolean> }是否支持
 */
export const isSupportedWebp = () => {
  let memo: any = null;
  return () => {
    if (!memo) {
      memo = supportsWebp(window);
    }
    return memo;
  };
};

