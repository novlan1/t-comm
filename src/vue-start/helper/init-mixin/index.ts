import type { AppOptionsType } from '../../types';

export function initMixin(app, options: AppOptionsType) {
  // 混入项目自己的mixin
  if (options.projectMixins) {
    app.mixin(options.projectMixins);
  }
}
