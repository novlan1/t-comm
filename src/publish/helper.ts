import * as path from 'path';
import { readEnvVariable } from '../env-variable/env-variable';


export function getPublishRootDir() {
  const rootDir = process.cwd();
  return rootDir;
}


export function getPublishBashPath() {
  return path.resolve(__dirname, '../bin/publish.sh');
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
