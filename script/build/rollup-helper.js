const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const { BUILD_DIR_LIST } = require('./build-config');
const { traverseFolder, getFileName } = require('../utils/node-fs');


const root = process.cwd();

const allInputs = [];
function cb(file) {
  if (!file.endsWith('index.ts') && !file.endsWith('types.ts') && !file.endsWith('.DS_Store')) {
  // if (file.endsWith('index.ts')) {
    allInputs.push(file);
  }
}

function getAllInputFiles() {
  BUILD_DIR_LIST.forEach((dir) => {
    traverseFolder(cb, path.resolve(root, 'src', dir));
  });
}

function getExtraBuildDir(config) {
  getAllInputFiles();

  return allInputs.map((file) => {
    const dir = path.dirname(path.relative(path.resolve(root, 'src'), file));
    const fileName = getFileName(file);

    return {
      input: file,
      output: [
        {
          file: path.resolve(root, 'lib', dir, `${fileName}.js`),
          format: 'cjs',
        },
        // {
        //   file: path.resolve(root, 'lib', dir, `${fileName}.esm.js`),
        //   format: 'es',
        // },
      ],
      external: config.external || [],
      plugins: [
        typescript({
          tsconfig: './tsconfig.json',
          declaration: false,
          declarationDir: undefined,
        }),
        ...(config.plugins || []),
        // terser(),
      ],
    };
  });
}


module.exports = { getExtraBuildDir };