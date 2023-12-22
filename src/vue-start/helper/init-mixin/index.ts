import type { AppOptionsType } from '../../types';

export function initMixin(app: any, options: AppOptionsType) {
  // 混入项目自己的mixin
  if (options.projectMixins) {
    app.mixin(options.projectMixins);
  }
}
