const path = require('path');
const fs = require('fs');


function traverseFolder(cb, path) {
  if (fs.statSync(path).isDirectory()) {
    const files = fs.readdirSync(path);

    files.forEach((file) => {
      const curPath =  require('path').resolve(path, file);
      // `${path}/${file}`;
      traverseFolder(cb, curPath);
    });
  } else {
    cb(path);
  }
}

function getFileName(file) {
  const basename = path.basename(file);
  const extname = path.extname(file);
  const fileName = basename.replace(new RegExp(`${extname}$`), '');
  return fileName;
}


function deleteFolder(path) {
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

function rmEmptyDir(path, level = 0) {
  const files = fs.readdirSync(path);
  console.log('files', files);
  if (files.length > 0) {
    let tempFile = 0;
    files.forEach((file) => {
      tempFile += 1;
      rmEmptyDir(`${path}/${file}`, level + 1);
    });
    if (tempFile === files.length && level !== 0) {
      fs.rmdirSync(path);
    }
  } else {
    level !== 0 && fs.rmdirSync(path);
  }
}

module.exports = {
  traverseFolder,
  getFileName,
  deleteFolder,
  rmEmptyDir,
};
