export const getVisibilityChangeMixin = (showCallback?: Function, hiddenCallback?: Function) => ({
  mounted() {
    // @ts-ignore
    window.addEventListener('visibilitychange', this._watchVisibleChange);
  },
  destroyed() {
    // @ts-ignore
    window.removeEventListener('visibilitychange', this._watchVisibleChange);
  },
  methods: {
    _watchVisibleChange() {
      if (document.visibilityState !== 'hidden') {
        showCallback?.call(this);
      } else {
        hiddenCallback?.call(this);
      }
    },
  },
});
