import fs from 'fs';
import path from 'path';

import { traverseFolder } from '../node/fs-util';


/**
 * 统计页面总数、分包数目等
 * @param dist
 * @returns result
 *
 * @example
 * ```ts
 * getPageTotal('./dist/dev/mp-weixin')
 * ```
 */
export function getPageTotal(dist: string) {
  const appJson = path.resolve(dist, 'app.json');
  const result = {
    pageTotal: 0,
    subPackageTotal: 0,
  };

  if (!fs.existsSync(appJson)) {
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data = require(appJson);
  const { pages = [], subPackages = [] } = data;

  result.pageTotal = pages.length + subPackages.reduce((acc: number, item: {pages: string[]}) => {
    acc += item.pages?.length || 0;
    return acc;
  }, 0);

  result.subPackageTotal = subPackages.length;

  return result;
}


/**
 * 统计组件数目、wxml大小、wxss大小、js大小等
 * @param dist
 * @returns result
 *
 * @example
 * ```ts
 * getComponentInfo('./dist/dev/mp-weixin')
 * ```
 */
export function getComponentInfo(dist: string, config = {
  wxmlPostfix: '.wxml',
  wxssPostfix: '.wxss',
  vendorNames: ['common/vendor-1.js', 'common/vendor.js'],
}) {
  const result = {
    componentTotal: 0,
    wxsstTotal: 0,
    jsTotal: 0,

    wxmlSizeTotal: 0,
    wxssSizeTotal: 0,
    jsSizeTotal: 0,

    vendorJsSize: 0,
  };
  if (!fs.existsSync(dist)) {
    return result;
  }

  const isVendorJs = (file: string) => !!config.vendorNames?.find(item => file.endsWith(item));

  try {
    traverseFolder((tPath: string) => {
      const fileSize = fs.statSync(tPath).size;

      if (tPath.endsWith(config.wxmlPostfix)) {
        result.componentTotal += 1;
        result.wxmlSizeTotal += fileSize;
      }

      if (tPath.endsWith(config.wxssPostfix)) {
        result.wxsstTotal += 1;
        result.wxssSizeTotal += fileSize;
      }

      if (tPath.endsWith('.js')) {
        result.jsTotal += 1;
        result.jsSizeTotal += fileSize;
      }

      if (isVendorJs(tPath)) {
        result.vendorJsSize += fileSize;
      }
    }, dist);
  } catch (err) {
    console.log('traverseFolder.error: ', err);
  }

  return result;
}
