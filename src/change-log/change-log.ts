import { replaceAllPolyfill } from '../base/string/replace-all';
import { writeFileSync, readFileSync } from '../fs/fs';


const replaceList = [
  {
    from: '🐛 Bug Fixes | Bug 修复',
    to: 'Bug Fixes 🐞',
  }, {
    from: '✨ Features | 新功能',
    to: 'Features 🎉',
  },
  {
    from: '✏️ Documentation | 文档',
    to: 'Documentation 📖',
  },
  {
    from: '♻️ Code Refactoring | 代码重构',
    to: 'Code Refactoring ♻️',
  },
  {
    from: '🚀 Chore | 构建/工程依赖/工具',
    to: 'Chore 🚀 ',
  },
  {
    from: '📦‍ Build System | 打包构建',
    to: 'Build System 📦‍',
  },
  {
    from: '✅ Tests | 测试',
    to: 'Tests ✅',
  },
  {
    from: '💄 Styles | 风格',
    to: 'Styles 💄',
  },
];

function replaceChangeLogKeywords(data = '') {
  replaceAllPolyfill();
  let newData = data;

  for (const item of replaceList) {
    const { from, to } = item;
    newData = newData.replaceAll(from, to);
  }
  return newData;
}


/**
 * 同步最新版本的更新日志
 * @param {object} params 参数
 * @param {string} params.changelogPath 源 change-log路径
 * @param {string} params.docChangelogPath 文档 change-log 路径
 * @param {string} params.packageJsonPath package.json 路径
 *
 * @example
 * ```ts
 * const DOC_CHANGE_LOG_PATH = './docs/CHANGELOG.md';
 * const SOURCE_CHANGE_LOG_PATH = './CHANGELOG.md';
 *
 * insertDocChangeLog({
 *   changelogPath: SOURCE_CHANGE_LOG_PATH,
 *   docChangeLog: DOC_CHANGE_LOG_PATH,
 *   packageJsonPath: './package.json',
 * });
 * ```
 */
export function insertDocChangeLog({
  changelogPath,
  docChangelogPath,
  packageJsonPath,
}: {
  changelogPath: string;
  docChangelogPath: string;
  packageJsonPath: string;
}) {
  const changeLog = readFileSync(changelogPath, false);
  const pkg = readFileSync(packageJsonPath, true);
  const { version } = pkg;

  // version = '1.0.31';
  console.log('[insertDocChangeLog] version: ', version);
  if (!version) return;

  const reg = new RegExp(`(\\n[#]+\\s*\\[${version}\\].*?\\n)(?=[#]+\\s*\\[\\d+\\.\\d+\\.\\d+)`, 's');

  const match = changeLog.match(reg);

  if (!match?.[1]) return;
  console.log('[insertDocChangeLog] match: ', match[1]);

  const docChangeLog = readFileSync(docChangelogPath);

  let newDocChangeLog = docChangeLog.replace(/(?=([#]{2,}))/, match[1]);
  newDocChangeLog = replaceChangeLogKeywords(newDocChangeLog);

  writeFileSync(docChangelogPath, newDocChangeLog);

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('child_process').execSync('git add .', {
    stdio: 'inherit',
  });
}

