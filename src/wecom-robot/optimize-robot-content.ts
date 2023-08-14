export function optimizeRobotContent({
  content = '',
  maxLen = 3500,
  concatFn = (more: number | string) => `\n\n\n...已省略${more}行...`,
}) {
  if (content.length <= maxLen) {
    return content;
  }

  const list = content.split('\n');
  const totalLen = list.length;

  for (let i = totalLen;i >= 0;i--) {
    const newContent = list.slice(0, i).join('\n');
    const len = newContent.length;

    if (len <= maxLen) {
      const more = totalLen - i;
      let extra = '';

      if (typeof concatFn === 'function') {
        extra = concatFn(more);
      }

      return `${newContent}${extra}`;
    }
  }
  return '';
}
