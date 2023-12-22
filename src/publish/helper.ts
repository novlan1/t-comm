import * as path from 'path';
import * as fs from 'fs';
import { readEnvVariable } from '../env-variable/env-variable';


export function getPublishRootDir() {
  const rootDir = process.cwd();
  return rootDir;
}

function findPublishSh(dir: string) {
  const FILE_NAME = 'publish.sh';
  const file = path.resolve(dir, FILE_NAME);

  if (fs.existsSync(file)) {
    return file;
  }
}


export function getPublishBashPath() {
  return findPublishSh(path.resolve(__dirname, '..'))
  || findPublishSh(path.resolve(__dirname, '../bin'))
  || findPublishSh(path.resolve(__dirname, '../../bin')) || 'ERROR_FILE';
}


export function getPublishEnvValue(key: string) {
  const rootDir = getPublishRootDir();
  const localEnvPath = path.join(rootDir, '.env.local');
  const envPath = path.join(rootDir, '.env');


  const envValue = readEnvVariable(key, envPath);
  const localEnvValue = readEnvVariable(key, localEnvPath);


  return localEnvValue || envValue || '';
}


export function getPublishModuleName(dir = '') {
  return dir.split('/')[1] || '';
}
