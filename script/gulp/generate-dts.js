
const fs = require('fs');
const path = require('path');

const {
  Extractor,
  ExtractorConfig,
} = require('@microsoft/api-extractor');

const { deleteFolder, traverseFolder } = require('../utils/node-fs');

const { PATHS, log } = require('./helper');


// api-extractor 整理 .d.ts 文件
async function generateDts(cb) {
  const apiExtractorJsonPath = path.join(
    __dirname,
    '../../api-extractor.json',
  );

  // 判断是否存在 index.d.ts 文件，这里必须先等会儿，rollup 的 bundle write 是结束了，
  // 但是 ts 的 typings 编译还没结束
  const isExist = await new Promise((resolve) => {
    let intervalTimes = 5;
    let exitFlag = false;
    const timer = setInterval(() => {
      exitFlag = fs.existsSync('./lib/index.d.ts');
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
  const extractorConfig = ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);

  // 调用 API
  const extractorResult = Extractor.invoke(extractorConfig, {
    localBuild: true,
    // 在输出中显示信息
    showVerboseMessages: true,
  });

  if (extractorResult.succeeded) {
    // 删除多余的 .d.ts 文件
    const libFiles = await fs.readdirSync(PATHS.lib);
    libFiles.forEach((file) => {
      const filePath = path.join(PATHS.lib, file);
      if (file.endsWith('.d.ts') && !file.includes('index')) {
        fs.unlinkSync(filePath);
      }
    });
    deleteFiles();
    log.progress('API Extractor completed successfully');
    cb();
  } else {
    log.error(`API Extractor completed with ${extractorResult.errorCount} errors`
        + ` and ${extractorResult.warningCount} warnings`);
  }
}


function deleteFiles() {
  function cb(file) {
    const fileName = file.replace(/\.d\.ts$/, '');

    if (file.endsWith('.d.ts') && !file.endsWith('types.d.ts')) {
      const jsFile = path.resolve(path.dirname(file), `${fileName}.js`);
      if (!fs.existsSync(jsFile)) {
        fs.unlinkSync(file);
      }

      const dir = path.dirname(file);
      const list = fs.readdirSync(dir);
      if (!list.length) {
        log.progress(`正在删除文件夹：${dir}`);
        deleteFolder(dir);
      }

      const dir2 = path.dirname(dir);
      const list2 = fs.readdirSync(dir2);
      if (!list2.length) {
        log.progress(`正在删除文件夹：${dir2}`);
        deleteFolder(dir2);
      }

      // const list3 = fs.readdirSync(dir);
      // if (!list3.length) {
      //   log.progress(`正在删除文件夹：${dir}`);
      //   deleteFolder(dir);
      // }
    }
  }
  traverseFolder(cb, './lib');
}


module.exports = { generateDts };

