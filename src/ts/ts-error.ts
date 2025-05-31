export type GetTSErrorFilesProps = {
  command?: string;
  root?: string;
};


export type TsErrorFile = {
  file: string;
  line: number;
  column: number;
  code: string;
  message: string;
};


export function getTSErrorFiles(options?: GetTSErrorFilesProps): TsErrorFile[] {
  const command = options?.command ?? 'npx tsc --noEmit --pretty false --listEmittedFiles false || true';
  const root = options?.root ?? process.cwd();

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { execSync } = require('child_process');

  const res = execSync(command, {
    cwd: root,
    encoding: 'utf-8',
    stdio: 'pipe',
  });

  const result = parseTypeScriptErrors(res);

  console.log('[getTSErrorFiles]', result);
  return result;
}


function parseTypeScriptErrors(errorString: string): TsErrorFile[] {
  const errorLines = errorString.split('\n');
  const errors = [];

  for (const line of errorLines) {
    const fileMatch = line.match(/^(.*?)\((\d+),(\d+)\):\s*error\s*(TS\d+):\s*(.*)$/);
    if (!fileMatch) {
      continue;
    }

    const result = {
      file: fileMatch[1],
      line: +(fileMatch[2]),
      column: +(fileMatch[3]),
      code: fileMatch[4],
      message: fileMatch[5],
    };

    errors.push(result);
  }


  return errors;
}


