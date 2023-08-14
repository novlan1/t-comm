import * as path from 'path';
// import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { BUILD_DIR_LIST } from './build.config';
import { traverseFolder, getFileName } from '../../src/node/fs-util';

const root = process.cwd();

const allInputs: Array<string> = [];
function cb(file: string) {
  if (!file.endsWith('index.ts') && !file.endsWith('types.ts')) {
  // if (file.endsWith('index.ts')) {
    allInputs.push(file);
  }
}

function getAllInputFiles() {
  BUILD_DIR_LIST.forEach((dir) => {
    traverseFolder(cb, path.resolve(root, 'src', dir));
  });
}

// @ts-ignore
export function getExtraBuildDir(config) {
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
        {
          file: path.resolve(root, 'lib', dir, `${fileName}.esm.js`),
          format: 'es',
        },
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

