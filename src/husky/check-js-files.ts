import { execSync } from 'child_process';

import { CHECK_JS_WHITE_DIR, SUB_PROJECT_CONFIG_JS_REG } from './config';


export function checkJSFiles(options = {
  whiteDir: CHECK_JS_WHITE_DIR,
  excludeReg: SUB_PROJECT_CONFIG_JS_REG,
  log: false,
}) {
  const whiteDir = options?.whiteDir ?? CHECK_JS_WHITE_DIR;
  const excludeReg = options?.excludeReg ?? SUB_PROJECT_CONFIG_JS_REG;
  const log = options?.log ?? false;


  const stagedFiles = execSync('git diff --cached --name-only --diff-filter=d', { encoding: 'utf-8' })
    .split('\n')
    .filter(Boolean);

  if (log) {
    console.log('[stagedFiles]', stagedFiles);
  }


  const hasJsFiles = stagedFiles
    .filter(item => whiteDir?.find(prefix => item.startsWith(prefix)))
    .filter(item => !excludeReg?.test(item))
    .some(file => /\.(js|jsx)$/.test(file));

  if (hasJsFiles) {
    console.error('❌ 错误：禁止提交 .js 文件，请使用 .ts 或 .tsx！');
    process.exit(1); // 阻止提交
  }

  if (log) {
    console.log('✅ 允许提交（无 .js 文件）');
  }
}


