
export function getAvailableDiskSize(options?: {
  mockLog: string;
}): number {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { execSync } = require('child_process');
  const command = 'df -P';

  let log = options?.mockLog || '';
  if (!log) {
    log = execSync(command, {
      stdio: 'pipe',
      encoding: 'utf-8',
    });
  }
  console.log('[log]', log);

  const list: Array<string> = log.split('\n');
  console.log('[list]', list);

  const detailList = list
    .map(item => item.trim())
    .filter(item => item)
    .slice(1)

    .map(item => item.split(/\s+/));

  console.log('[detailList]', detailList);

  const dataLog = detailList.find(item => item[5] === '/data');
  console.log('[dataLog]', dataLog);

  if (!dataLog) return 0;

  const available = +dataLog[3];
  console.log('[available]', available);

  return available;
}
