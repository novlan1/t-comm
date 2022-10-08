/* eslint-disable @typescript-eslint/no-require-imports */
import { readEnvVariable } from './env-variable';

const npmTokenRoot = process.cwd();


function getNpmToken() {
  const NPM_TOKEN = 'NPM_TOKEN';
  const ENV_FILE = '.env.local';
  const path = require('path');

  const envFile = path.resolve(npmTokenRoot, ENV_FILE);
  const token = readEnvVariable(NPM_TOKEN, envFile);
  if (!token) {
    console.log(`${NPM_TOKEN} 不存在`);
    process.exit(1);
  }
  return token;
}

export function writeEnvTokenToNpmRC() {
  const NPM_RC_TPL = `registry=https://registry.npmjs.org/
//registry.npmjs.org/:always-auth=true
//registry.npmjs.org/:_authToken={{TOKEN}}`;

  const fs = require('fs');
  const path = require('path');

  const token = getNpmToken();
  const content = NPM_RC_TPL.replace('{{TOKEN}}', token);
  const npmRCFile = path.resolve(npmTokenRoot, '.npmrc');

  fs.writeFileSync(npmRCFile, content, {
    encoding: 'utf-8',
  });
}


