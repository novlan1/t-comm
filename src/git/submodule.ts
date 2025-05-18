import * as fs from 'fs';

import { readFileSync } from '../fs/fs';


export function getSubmodulePathList(file = '.gitmodules'): string[] {
  if (!fs.existsSync(file)) {
    return [];
  }

  const content = readFileSync(file);

  const pathReg = /(?<=path\s*=\s*)([^\s]+)/g;

  const match = content.match(pathReg) || [];

  return match || [];
}

