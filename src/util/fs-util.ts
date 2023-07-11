/* eslint-disable @typescript-eslint/no-require-imports */
const LOG_DIR = 'log';

function innerCopy(src: string, dist: string) {
  const fs = require('fs');
  if (fs.statSync(src).isFile()) {
    return;
  }
  const paths = fs.readdirSync(src);
  paths.forEach((p: string) => {
    const tSrc = `${src}/${p}`;
    const tDist = `${dist}/${p}`;
    const stat = fs.statSync(tSrc);
    if (stat.isFile()) { // 判断是文件还是目录
      fs.writeFileSync(tDist, fs.readFileSync(tSrc));
    } else if (stat.isDirectory()) {
      innerCopyDir(tSrc, tDist); // 当是目录是，递归复制
    }
  });
}


/**
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function innerCopyDir(src: string, dist: string) {
  const fs = require('fs');
  const b = fs.existsSync(dist);
  if (!b) {
    mkDirsSync(dist); // 创建目录
  }
  innerCopy(src, dist);
}

// 递归创建目录 同步方法
export function mkDirsSync(dirname: string) {
  const fs = require('fs');
  const path = require('path');
  if (fs.existsSync(dirname)) {
    return true;
  }
  if (mkDirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
}


/**
 * 拷贝目录以及子文件
 * @param {Object} src
 * @param {Object} dist
 * @param {Object} callback
 */
export function copyDir(src: string, dist: string, callback?: Function) {
  innerCopyDir(src, dist);
  if (callback) {
    callback();
  }
}

/**
 * 删除目录
 * @param {Object} path
 */
export function deleteFolder(path: string) {
  const fs = require('fs');
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file: string) => {
      const curPath = `${path}/${file}`;
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}


/**
 * 拷贝文件
 * @param {Object} from 文件来自那里
 * @param {Object} to		拷贝到那里
 */
export function copyFile(from: string, to: string) {
  const fs = require('fs');
  return fs.writeFileSync(to, fs.readFileSync(from));
}


/**
 * 递归遍历文件夹，并执行某操作
 * @param {Function} cb 回调参数
 * @param {String} path 文件夹或文件路径
 */
export function traverseFolder(cb: Function, path: string) {
  const fs = require('fs');
  if (fs.statSync(path).isDirectory()) {
    const files = fs.readdirSync(path);

    files.forEach((file: string) => {
      const curPath = require('path').resolve(path, file);
      // `${path}/${file}`;
      traverseFolder(cb, curPath);
    });
  } else {
    cb(path);
  }
}

export function readJsonLog(file: string, defaultContent = '{}') {
  const fs = require('fs');
  const filePath = `./${LOG_DIR}/${file}`;

  if (!fs.existsSync(filePath)) {
    createLogDir();
    return defaultContent;
  }

  return fs.readFileSync(filePath, {
    encoding: 'utf-8',
  }) || defaultContent;
}

export function getJsonLogDir() {
  const path = require('path');
  return path.resolve(process.cwd(), './log');
}

export function saveJsonToLog(content: object, file: string, needLog = true) {
  const fs = require('fs');
  if (!needLog) return;
  createLogDir();
  fs.writeFileSync(`./${LOG_DIR}/${file}`, JSON.stringify(content, null, 2), {
    encoding: 'utf-8',
  });
}

export function getJsonFromLog(file: string) {
  const fs = require('fs');
  const filePath = `./${LOG_DIR}/${file}`;
  let data = {};

  if (!fs.existsSync(filePath)) {
    console.log('[getJsonFromLog] no exist');
  } else {
    const originFile = fs.readFileSync(filePath, {
      encoding: 'utf-8',
    });
    try {
      data = JSON.parse(originFile);
    } catch (err) {}
  }
  return data;
}


function createLogDir() {
  const fs = require('fs');
  if (!fs.existsSync(`./${LOG_DIR}`)) {
    fs.mkdirSync(`./${LOG_DIR}`);
  }
}
