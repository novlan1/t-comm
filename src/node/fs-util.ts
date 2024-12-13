import * as path from 'path';
import * as fs from 'fs';
import { writeFileSync, readFileSync } from '../fs/fs';
import { timeStampFormat } from '../time/time';

const LOG_DIR = 'log';

function innerCopy(src: string, dist: string) {
  if (fs.statSync(src).isFile()) {
    return;
  }
  const paths = fs.readdirSync(src);
  paths.forEach((p: string) => {
    const tSrc = `${src}/${p}`;
    const tDist = `${dist}/${p}`;
    const stat = fs.statSync(tSrc);
    if (stat.isFile()) { // 判断是文件还是目录
      writeFileSync(tDist, readFileSync(tSrc));
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
  const b = fs.existsSync(dist);
  if (!b) {
    mkDirsSync(dist); // 创建目录
  }
  innerCopy(src, dist);
}

// 递归创建目录 同步方法
export function mkDirsSync(dirname: string) {
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
export function deleteFolder(tPath: string) {
  let files: Array<string> = [];
  if (fs.existsSync(tPath)) {
    files = fs.readdirSync(tPath);
    files.forEach((file: string) => {
      const curPath = `${tPath}/${file}`;
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(tPath);
  }
}


/**
 * 递归删除空目录
 * @param path 路径
 * @param level 层级
 */
export function rmEmptyDir(tPath: string, level = 0) {
  const files = fs.readdirSync(tPath);

  if (files.length > 0) {
    let tempFile = 0;
    files.forEach((file) => {
      tempFile += 1;
      rmEmptyDir(`${tPath}/${file}`, level + 1);
    });

    if (tempFile === files.length && level !== 0) {
      fs.rmdirSync(tPath);
    }
  } else {
    level !== 0 && fs.rmdirSync(tPath);
  }
}


export function deleteFolderRecursive(path: string, options = {
  deleteFile: false,
  log: false,
}) {
  const deleteFile = options.deleteFile ?? false;
  const log = options.log ?? false;

  if (fs.existsSync(path)) {
    const list = fs.readdirSync(path);

    list.forEach((file) => {
      const curPath = `${path}/${file}`;

      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        if (deleteFile) {
          fs.unlinkSync(curPath);
        }
      }
    });

    if (!list.length) {
      if (log) {
        console.log('>>> delete: ', path);
      }
      fs.rmdirSync(path);
    }
  }
}


/**
 * 拷贝文件
 * @param {Object} from 文件来自那里
 * @param {Object} to		拷贝到那里
 */
export function copyFile(from: string, to: string) {
  return writeFileSync(to, readFileSync(from));
}


/**
 * 递归遍历文件夹，并执行某操作
 * @param {Function} cb 回调参数
 * @param {String} path 文件夹或文件路径
 */
export function traverseFolder(cb: Function, tPath: string) {
  if (fs.statSync(tPath).isDirectory()) {
    const files = fs.readdirSync(tPath);

    files.forEach((file: string) => {
      const curPath = path.resolve(tPath, file);
      // `${tPath}/${file}`;
      traverseFolder(cb, curPath);
    });
  } else {
    cb(tPath);
  }
}

export function readJsonLog(file: string, defaultContent = '{}') {
  const filePath = `./${LOG_DIR}/${file}`;

  if (!fs.existsSync(filePath)) {
    createLogDir();
    return defaultContent;
  }

  return readFileSync(filePath) || defaultContent;
}

export function getJsonLogDir() {
  return path.resolve(process.cwd(), './log');
}

export function saveJsonToLog(content: object, file: string, needLog = true) {
  if (!needLog) return;
  createLogDir();
  writeFileSync(`./${LOG_DIR}/${file}`, content, true);
}


export function saveJsonToLogMore(content: any, file: string, options?: {
  needLog?: boolean;
  max?: number;
}) {
  const needLog = options?.needLog ?? true;
  const max = options?.max ?? 10;

  if (!needLog) return;

  createLogDir();
  const filePath = `./log/${file}`;


  let beforeContent = [];
  let newContent = [{
    logTime: timeStampFormat(Date.now(), 'yyyy-MM-dd hh:mm:ss'),
    data: content,
  }];


  if (fs.existsSync(filePath)) {
    try {
      beforeContent = readFileSync(filePath, true).logList || [];
    } catch (err) {
      beforeContent = [];
    }
  }
  if (beforeContent && Array.isArray(beforeContent)) {
    newContent.push(...beforeContent);
  }

  newContent = newContent.slice(0, max);

  try {
    fs.writeFile(filePath, JSON.stringify({ logList: newContent }, null, 2), {
      encoding: 'utf-8',
    }, () => {});
  } catch (err) {
  }
}


export function getJsonFromLog(file: string) {
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
  if (!fs.existsSync(`./${LOG_DIR}`)) {
    fs.mkdirSync(`./${LOG_DIR}`);
  }
}


export function getFileName(file: string) {
  const basename = path.basename(file);
  const extname = path.extname(file);
  const fileName = basename.replace(new RegExp(`${extname}$`), '');
  return fileName;
}

export function readJson(content: string, file: string): Record<string, any> {
  let data = {};
  try {
    data = JSON.parse(content);
  } catch (e) {
    console.error('>>> read json error: ', file);
  }
  return data;
}
