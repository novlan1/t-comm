const path = require('path');
const { rollup } = require('rollup');

const rollupConfig = require('../../rollup.config');
const { log } = require('./helper');


function getRelativeFile(file) {
  if (typeof file !== 'string') return '';
  return path.relative(process.cwd(), file);
}


// rollup 打包
const buildByRollup = async (cb, startIndex = 0) => {
  let bundle;

  for (let i = startIndex;i < rollupConfig.length; i++) {
    const config = rollupConfig[i];

    const theConfig = config;
    const inputOptions = {
      input: theConfig.input,
      external: theConfig.external,
      plugins: theConfig.plugins,
    };
    const outOptions = theConfig.output;

    try {
      bundle = await rollup(inputOptions);

      // 写入需要遍历输出配置
      if (Array.isArray(outOptions)) {
        for (const outOption of outOptions) {
          await bundle.write(outOption);
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        log.error(e.message);
      }
    }

    if (bundle != null) {
      // closes the bundle
      await bundle.close();
      log.progress(`Rollup built successfully. ${i} ${getRelativeFile(inputOptions.input)}`);
    }
  }

  cb();
};


module.exports = { buildByRollup };


