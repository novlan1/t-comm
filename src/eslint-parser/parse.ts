
export function parseEslintError({
  lintReportFile,
}) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const report = require(lintReportFile) || {};
  const errors = (report.results || []).filter(item => !!item.errorCount);

  const total = errors.reduce((acc, item) => acc + item.errorCount, 0);

  const errorMap = errors
    .reduce((acc, item) => {
      acc.push(...item.messages.map(msg => ({
        ...msg,
        filePath: item.filePath,
        errorCount: item.errorCount,
      })));
      return acc;
    }, [])
    .reduce((acc, item) => {
      if (!acc[item.ruleId]) {
        item.number = 1;
        acc[item.ruleId] = item;
      } else {
        acc[item.ruleId].number += 1;
      }
      return acc;
    }, {});

  return {
    errorMap,
    total,
  };
}

