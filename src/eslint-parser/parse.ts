
export function parseEslintError({
  lintReportFile,
}: {
  lintReportFile: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const report = require(lintReportFile) || {};
  const errors = (report.results || []).filter((item: any) => !!item.errorCount);

  const total = errors.reduce((acc: any, item: any) => acc + item.errorCount, 0);

  const errorMap = errors
    .reduce((acc: any, item: any) => {
      acc.push(...item.messages
        .filter((item: any) => item.severity == 2)
        .map((msg: any) => ({
          ...msg,
          filePath: item.filePath,
          errorCount: item.errorCount,
        })));
      return acc;
    }, [])
    .reduce((acc: any, item: any) => {
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

