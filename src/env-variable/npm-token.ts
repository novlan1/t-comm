import * as path from 'path';

import { readEnvVariable } from '../env-variable/env-variable';
import { writeFileSync } from '../fs/fs';

const npmTokenRoot = process.cwd();


function getNpmToken() {
  const NPM_TOKEN = 'NPM_TOKEN';
  const ENV_FILE = '.env.local';

  const envFile = path.resolve(npmTokenRoot, ENV_FILE);
  const token = readEnvVariable(NPM_TOKEN, envFile);
  if (!token) {
    console.log(`${NPM_TOKEN} 不存在`);
    process.exit(1);
  }
  return token;
}


/**
 * 将 .env.local 中 NPM_TOKEN 的值写入到 .npmrc 中
 */
export function writeEnvTokenToNpmRC() {
  const NPM_RC_TPL = `registry=https://registry.npmjs.org/
//registry.npmjs.org/:always-auth=true
//registry.npmjs.org/:_authToken={{TOKEN}}`;


  const token = getNpmToken();
  const content = NPM_RC_TPL.replace('{{TOKEN}}', token);
  const npmRCFile = path.resolve(npmTokenRoot, '.npmrc');

  writeFileSync(npmRCFile, content);
}


