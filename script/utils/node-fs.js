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


module.exports = {
  traverseFolder,
  getFileName,
};
