export function getStylelintLinebreaksRules(value = 'unix') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const os = require('os');
  const platform = os.platform();

  if (platform === 'linux') {
    return {};
  }
  return {
    linebreaks: value,
  };
}
