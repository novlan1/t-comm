/**
 * 获取审核人
 * @param params 参数
 * @returns 审核人
 *
 * @example
 * ```ts
 * getAuditorFromRainbowConfig({
 *   rainbowConfig: { "pmd-mobile/match/*": "gg", "pmd-mobile/convert-cross": "gg" },
 *   checkKeyList: [ 'pmd-mobile/match/gp/gp-hor', 'pmd-mobile/match/gp' ],
 *   minimatch: require('minimatch'),
 *   minimatchKey: 'pmd-mobile/match/gp',
 * })
 * ```
 */
export function getAuditorFromRainbowConfig({
  rainbowConfig,
  checkKeyList,

  minimatch,
  minimatchKey,
}: {
  rainbowConfig: Record<string, string>;
  checkKeyList: string[];

  minimatch: Function;
  minimatchKey: string;
}): string {
  for (const key of checkKeyList) {
    if (rainbowConfig[key]) {
      return rainbowConfig[key];
    }
  }

  const matchedGlob = Object.keys(rainbowConfig).find(item => minimatch(minimatchKey, item));
  if (matchedGlob) {
    return rainbowConfig[matchedGlob];
  }
  return '';
}
