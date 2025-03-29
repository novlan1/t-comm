import path from 'path';

import chalk from 'chalk';
import conventionalChangelog from 'conventional-changelog';
import fse from 'fs-extra';
import { series } from 'gulp';

import { buildByRollup } from './script/gulp/build-by-rollup-up';
import { clearLibFile } from './script/gulp/clear-lib';
import { generateDts } from './script/gulp/generate-dts';


type TaskFunc = (cb: Function) => void;

const log = {
  progress: (text: string) => {
    console.log(chalk.green(text));
  },
  error: (text: string) => {
    console.log(chalk.red(text));
  },
};

const paths = {
  root: path.join(__dirname, '/'),
  lib: path.join(__dirname, '/lib'),
};


const complete: TaskFunc = (cb) => {
  log.progress('---- end ----');
  cb();
};


// 构建过程
// 1. 删除 lib 文件夹
// 2. rollup 打包
// 3. api-extractor 生成统一的声明文件, 删除多余的声明文件
// 4. 完成
export const build: any = series(
  clearLibFile,
  buildByRollup,
  generateDts,
  complete,
);

// 自定义生成 changelog
export async function changelog(cb: Function) {
  const changelogPath: string = path.join(paths.root, 'CHANGELOG.md');

  // 对命令 conventional-changelog -p angular -i CHANGELOG.md -w -r 0
  // @ts-ignore
  const changelogPipe = await conventionalChangelog({
    // preset: 'angular',
    // releaseCount: 0,
  });
  changelogPipe.setEncoding('utf8');

  const resultArray = ['# 工具库更新日志\n\n'];
  changelogPipe.on('data', (chunk: any) => {
    // 原来的 commits 路径是进入提交列表
    chunk = chunk.replace(/\/commits\//g, '/commit/');
    resultArray.push(chunk);
  });

  changelogPipe.on('end', async () => {
    await fse.createWriteStream(changelogPath).write(resultArray.join(''));
    cb();
  });
}


