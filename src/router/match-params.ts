export function matchParams(rawPath = '', params: Record<string, string> = {}) {
  return rawPath.replace(/:(\w+)\???(?=$|\/)/g, (a, b) => {
    if (params[b]) {
      return params[b];
    }
    return '';
  });
}

/**
 * 小程序下，获取对应的 H5 路由信息
 * @param {Object} route 路由信息
 * @returns H5 Url
 * @example
 * ```ts
 * getH5CurrentUrl(this.$route);
 * ```
 */
export function getH5CurrentUrl(route: {
  name?: string;
  meta?: {
    rawPath?: Array<string>;
  };
  params: Record<string, string>
}) {
  const { name = '', meta, params  } = route;
  const { rawPath = [] } = meta || {};
  if (!Object.keys(params).length || !rawPath.length) {
    return `/${name}`;
  }
  return matchParams(rawPath[0], params);
}
