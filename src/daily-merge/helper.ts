export const DEFAULT_WHITE_REG = /^release|develop|hotfix\/.+$/;

export function shouldInclude(branch = '', reg = DEFAULT_WHITE_REG) {
  return !reg.test(branch);
}
