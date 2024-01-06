import { callJsSetFullScreen, callJsReSetFullScreen } from '../msdk/msdk';


/**
 * msdk 浏览器全屏方法，点击外链时可全屏，返回时退出全屏
 * @example
 * ```ts
 * mixins: [getMsdkFullScreen()],
 * ```
 */
export function getMsdkFullScreen() {
  return {
    onShow() {
      callJsSetFullScreen();
    },
    methods: {
      callJsReSetFullScreen() {
        callJsReSetFullScreen();
      },
    },
  };
}
