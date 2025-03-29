const path = require('path');

// const fs = require('fs');
const typescript = require('@rollup/plugin-typescript');

const { getFileName, traverseFolder } = require('../utils/node-fs');

const { BUILD_DIR_LIST } = require('./build-config');


const root = process.cwd();

const allInputs = [];
function cb(file) {
  if (!file.endsWith('index.ts') && !file.endsWith('types.ts') && !file.endsWith('.DS_Store')) {
  // if (file.endsWith('index.ts')) {
    allInputs.push(file);
  }
}

function getAllInputFiles() {
  // const srcDir = path.resolve(root, 'src');
  // const list = fs.readdirSync(srcDir);

  // const buildDirList =  list.filter((item) => {
  //   const newPath = `${srcDir}/${item}`;
  //   const stat = fs.lstatSync(newPath);
  //   return stat.isDirectory();
  // });
  // console.log('[buildDirList]', buildDirList);


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
