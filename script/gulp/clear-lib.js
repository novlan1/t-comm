const { log, PATHS } = require('./helper');
const { execSync } = require('child_process');

// 删除 lib 文件
const clearLibFile = async (cb) => {
  execSync(`rm -rf ${PATHS.lib}`, {
    encoding: 'utf-8',
    stdio: 'inherit',
  });
  log.progress('Deleted lib file');
  cb();
};

module.exports = { clearLibFile };

