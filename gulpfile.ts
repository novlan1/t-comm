/* eslint-disable @typescript-eslint/no-misused-promises */
import { series } from 'gulp';
import path from 'path';
import fse from 'fs-extra';
import * as fs from 'fs';
import chalk from 'chalk';
import { rollup } from 'rollup';
import {
  Extractor,
  ExtractorConfig,
  ExtractorResult,
} from '@microsoft/api-extractor';
import conventionalChangelog from 'conventional-changelog';
import rollupConfig from './rollup.config';
import { traverseFolder } from './src/node/fs-util';

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

// 删除 lib 文件
const clearLibFile: TaskFunc = async (cb) => {
  fse.removeSync(paths.lib);
  log.progress('Deleted lib file');
  cb();
};


function deleteFiles() {
  function cb(file: string) {
    const fileName = file.replace(/\.d\.ts$/, '');

    if (file.endsWith('.d.ts') && !file.endsWith('types.d.ts')) {
      const jsFile = path.resolve(path.dirname(file), `${fileName}.js`);
      if (!fse.existsSync(jsFile)) {
        fse.removeSync(file);
      }

      const dir = path.dirname(file);
      const list = fs.readdirSync(dir);
      if (!list.length) {
        log.progress(`正在删除文件夹：${dir}`);
        fse.removeSync(dir);
      }

      const dir2 = path.dirname(dir);
      const list2 = fs.readdirSync(dir2);
      if (!list2.length) {
        log.progress(`正在删除文件夹：${dir2}`);
        fse.removeSync(dir2);
      }
    }
  }
  traverseFolder(cb, './lib');
}

function getRelativeFile(file) {
  return path.relative(process.cwd(), file);
}

// rollup 打包
const buildByRollup: TaskFunc = async (cb) => {
  for (const config of rollupConfig) {
    const theConfig = config as any;
    const inputOptions = {
      input: theConfig.input,
      external: theConfig.external,
      plugins: theConfig.plugins,
    };
    const outOptions = theConfig.output;
    let bundle: any;

    try {
      bundle = await rollup(inputOptions);

      // 写入需要遍历输出配置
      if (Array.isArray(outOptions)) {
        outOptions.forEach(async (outOption) => {
          await bundle.write(outOption);
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        log.error(e.message);
      }
    }


    if (bundle != null) {
      // closes the bundle
      await bundle.close();
      log.progress(`Rollup built successfully ${getRelativeFile(inputOptions.input)}`);
    }
  }

  cb();
};

// api-extractor 整理 .d.ts 文件
const apiExtractorGenerate: TaskFunc = async (cb) => {
  const apiExtractorJsonPath: string = path.join(
    __dirname,
    './api-extractor.json',
  );
  // 判断是否存在 index.d.ts 文件，这里必须先等会儿，rollup 的 bundle write 是结束了，
  // 但是 ts 的 typings 编译还没结束
  const isExist = await new Promise((resolve) => {
    let intervalTimes = 5;
    let exitFlag = false;
    const timer = setInterval(async () => {
      exitFlag = await fse.pathExists('./lib/index.d.ts');
      intervalTimes -= 1;
      if (exitFlag || intervalTimes === 0) {
        clearInterval(timer);
        resolve(exitFlag);
      }
    }, 100);
  });

  if (!isExist) {
    log.error('API Extractor not find index.d.ts');
    return;
  }
  // 加载并解析 api-extractor.json 文件
  const extractorConfig: ExtractorConfig =    ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);

  // 调用 API
  const extractorResult: ExtractorResult = Extractor.invoke(extractorConfig, {
    localBuild: true,
    // 在输出中显示信息
    showVerboseMessages: true,
  });

  if (extractorResult.succeeded) {
    // 删除多余的 .d.ts 文件
    const libFiles: string[] = await fse.readdir(paths.lib);
    libFiles.forEach(async (file) => {
      const filePath = path.join(paths.lib, file);
      if (file.endsWith('.d.ts') && !file.includes('index')) {
        await fse.remove(filePath);
      }

      // 删除所有子文件夹
      // const stat = fse.lstatSync(filePath);
      // if (stat.isDirectory()) {
      //   log.progress(`正在删除文件夹：${file}`);
      //   await fse.remove(filePath);
      // }
    });
    deleteFiles();
    log.progress('API Extractor completed successfully');
    cb();
  } else {
    log.error(`API Extractor completed with ${extractorResult.errorCount} errors`
        + ` and ${extractorResult.warningCount} warnings`);
  }
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
export const build = series(
  clearLibFile,
  buildByRollup,
  apiExtractorGenerate,
  complete,
);

// 自定义生成 changelog
export const changelog: TaskFunc = async (cb) => {
  const changelogPath: string = path.join(paths.root, 'CHANGELOG.md');
  // 对命令 conventional-changelog -p angular -i CHANGELOG.md -w -r 0
  const changelogPipe = await conventionalChangelog({
    preset: 'angular',
    releaseCount: 0,
  });
  changelogPipe.setEncoding('utf8');

  const resultArray = ['# 工具库更新日志\n\n'];
  changelogPipe.on('data', (chunk) => {
    // 原来的 commits 路径是进入提交列表
    chunk = chunk.replace(/\/commits\//g, '/commit/');
    resultArray.push(chunk);
  });
  changelogPipe.on('end', async () => {
    await fse.createWriteStream(changelogPath).write(resultArray.join(''));
    cb();
  });
};


