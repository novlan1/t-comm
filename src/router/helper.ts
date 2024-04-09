/**
 * 根据路由跳转时的参数，提取 path 和其他参数
 * @param route $router.push 或者 $router.replace 的参数
 * @returns 解析结果
 */
export function getRouterFuncPath(route: any) {
  let rawPath;
  let rawOther: any = {};

  if (typeof route === 'object' && route.path) {
    rawPath = route.path;
    const { path, ...other } = route;
    rawOther = other;
  } else if (typeof route === 'string') {
    rawPath = route;
  }

  return {
    path: rawPath,
    other: rawOther,
  };
}
