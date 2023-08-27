import { MorsePwd } from '../morse-pwd';


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
