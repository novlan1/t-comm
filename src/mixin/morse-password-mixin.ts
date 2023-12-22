import { MorsePwd } from '../morse-pwd';


/**
 * 摩斯密码的 Vue mixin，方便实用
 * @param {array} pwd 密钥
 * @param {Function} cb 回到函数
 * @returns 换入内容
 * @example
 * ```ts
 * getMorsePwdMixin([1, 1, 1, 1, 1], function () {
 *   if (isInIFrame()) return;
 *   this.onShowLaunchApp();
 * }),
 * ```
 */
export const getMorsePwdMixin = (pwd: number[], cb: Function) => ({
  data() {
    return {
      morsePwd: null,
    };
  },
  mounted() {
    const envType = 'MP';

    this.morsePwd = MorsePwd.init({
      pwd,
      cb: () => {
        if (typeof cb === 'function') {
          cb.call(this);
        }
      },
      envType,
    } as any);
  },
  beforeDestroy() {
    this.morsePwd.clear();
  },
  methods: {
    onMorsePwdLongPress() {
      (this as any).morsePwd.longPress();
    },
    onMorsePwdClick() {
      (this as any).morsePwd.click();
    },
  },
} as any);

export const morsePwdMixin = getMorsePwdMixin;
