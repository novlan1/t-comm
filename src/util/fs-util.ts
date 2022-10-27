/* eslint-disable @typescript-eslint/no-require-imports */

function innerCopy(src, dist) {
  const fs = require('fs');
  if (fs.statSync(src).isFile()) {
    return;
  }
  const paths = fs.readdirSync(src);
  paths.forEach((p) => {
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
function innerCopyDir(src, dist) {
  const fs = require('fs');
  const b = fs.existsSync(dist);
  if (!b) {
    mkDirsSync(dist); // 创建目录
  }
  innerCopy(src, dist);
}

// 递归创建目录 同步方法
export function mkDirsSync(dirname) {
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
export function copyDir(src, dist, callback) {
  innerCopyDir(src, dist);
  if (callback) {
    callback();
  }
}

/**
 * 删除目录
 * @param {Object} path
 */
export function deleteFolder(path) {
  const fs = require('fs');
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file) => {
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
export function copyFile(from, to) {
  const fs = require('fs');
  return fs.writeFileSync(to, fs.readFileSync(from));
}

