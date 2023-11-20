import { getHttpsUrl, getCdnUrl, getCompressImgUrl } from '../image/image';


let windowLoaded = false;
const stoppedImages: any = [];

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    windowLoaded = true;
    stoppedImages.forEach((img) => {
      // 因为被置空会导致前一次加载失败，重新加载
      if (img.el.getAttribute('lazy') !== 'loading' && img.src) {
        img.el.src = img.src;
      }
    });
  });
}


/**
 * 获取 vue-lazyload 插件参数
 * @param options 选项
 * @returns 插件参数
 */
export function getVLazyOptions(options: {
  loadingImg?: string
  errorImg?: string;
} = {}) {
  const { loadingImg, errorImg } = options;

  return {
    preLoad: 1.3,
    attempt: 2,
    filter: {
    // 设置加载中图片
      loading(listener) {
        if (loadingImg) {
          listener.loading = loadingImg;
        }
      },
      // 设置加载失败图片
      error(listener) {
        if (errorImg) {
          listener.error = errorImg;
        }
      },
      // 修改成https
      https(listener) {
        listener.src = getHttpsUrl(listener.src);
      },
      // 裁剪压缩
      compress(listener) {
      // 10.31去除filter中图片压缩，保留loading中即可，否则会导致重复刷新时无法加载
      // 11.13反馈微社区图片闪动，src和data-src不一致导致，上面的问题验证暂时没发现问题（重试次数修改为1了），放开解决闪动问题
        listener.src = getCompressImgUrl(
          listener.src,
          listener.el?.width ? listener.el.width : 0,
          listener.el?.height ? listener.el.height : 0,
        );
      },
      // 转换为cdn
      cdn(listener) {
        listener.src = getCdnUrl(listener.src);
      },
      // 拦截window.onload前的图片加载
      stopBeforeLoad(listener) {
        if (!windowLoaded) {
        // 保存被拦截的图片
          stoppedImages.push({ el: listener.el, src: listener.src });
          listener.stoppedSrc = listener.src;
          listener.src = '';
        }
      },
    },
    adapter: {
      error(listener) {
      // 被拦截的图片在onload之后失败，需要重试
        if (windowLoaded && listener.stoppedSrc && listener.stoppedSrc.length > 0) {
          listener.src = listener.stoppedSrc;
          listener.attempt = listener.attempt - 1;
          listener.load();
        }
      },
    },
  };
}

