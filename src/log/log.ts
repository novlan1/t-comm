export function consoleLog(shouldLog: boolean, ...args: any[]) {
  if (!shouldLog) return;
  console.log(...args);
}


export function consoleInfo(shouldLog: boolean, ...args: any[]) {
  if (!shouldLog) return;
  console.info(...args);
}
