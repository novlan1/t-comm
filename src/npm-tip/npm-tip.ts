import { readFileSync, statSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

const kMinutes = 60_1000;
const kDataFile = 't-comm-install.data';


function getNpmTipTemplate({
  prefix,
  link,
  postfix,
  feedbackTitle,
  feedbackList,
}) {
  return `${colorFactory(96)}${prefix} (${colorFactory(94)} ${link} ${colorFactory(96)}) ${postfix}${colorFactory()}\n\n`
  + `${colorFactory(96)}${feedbackTitle}${colorFactory()}\n`
  + `${feedbackList
    .map(feedback => `${colorFactory(96)}>${colorFactory(94)} ${feedback} ${colorFactory()}`)
    .join('\n')
  }\n`;
}


function getNpmTips({
  packageName,
  packageLink,
  packagePostfix,
  packagePostfixEn,
  feedbackList,
}) {
  const content = isUtf8Encoding()
    ? getNpmTipTemplate({
      prefix: `感谢您使用${packageName}`,
      link: packageLink,
      postfix: `${packagePostfix}！`,
      feedbackTitle: '如有任何疑问或建议，可通过下述渠道向我们反馈：',
      feedbackList,
    })
    : getNpmTipTemplate({
      prefix: `Thank you for using ${packageName}`,
      link: packageLink,
      postfix: `${packagePostfixEn}!`,
      feedbackTitle: 'If you have any issue or advice, you can give us feedback:',
      feedbackList,
    });


  return content;
}


function not(it?: string) {
  return !it || it === '0' || it === 'false';
}

function colorFactory(color?: number) {
  if (!process.stdout.hasColors()) {
    return '';
  }
  return `\u001B[${color ?? 0}m`;
}

function isUtf8Encoding() {
  const { env: { LANG, LC_CTYPE } } = process;
  const language = (LANG ?? LC_CTYPE ?? '').toLowerCase();

  if (language.includes('utf-8') || language.includes('utf8')) {
    return true;
  }

  if (process.platform === 'win32') {
    return true;
  }

  return false;
}

function isShowInfo(kContent) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { env: { ADBLOCK, CI, DISABLE_OPENCOLLECTIVE, OPEN_SOURCE_CONTRIBUTOR, npm_config_loglevel } } = process;
  const isSilent = typeof npm_config_loglevel === 'string' && ['silent', 'error', 'warn'].includes(npm_config_loglevel);
  if (not(ADBLOCK) && not(CI) && not(DISABLE_OPENCOLLECTIVE) && not(OPEN_SOURCE_CONTRIBUTOR) && !isSilent) {
    const file = join(tmpdir(), kDataFile);
    let contents: string[] = [];
    try {
      const delta = Date.now() - statSync(file).mtime.getTime();
      if (delta >= 0 && delta < 3 * kMinutes) {
        contents = JSON.parse(readFileSync(file, 'utf8')) as string[];
        // if (contents.includes(kContent)) {
        //   return false;
        // }
      }
    } catch {
      contents = [];
    }

    try {
      contents.push(kContent);
      writeFileSync(file, JSON.stringify(contents), 'utf8');
    } catch { /* (empty function) */ }

    return true;
  }

  return false;
}


export function npmInstallTip({
  packageName,
  packageLink,
  packagePostfix,
  packagePostfixEn,
  feedbackList,
}) {
  const content = getNpmTips({
    packageName,
    packageLink,
    packagePostfix,
    packagePostfixEn,
    feedbackList,
  });

  if (isShowInfo(content)) {
    console.log(content);
  }
}
