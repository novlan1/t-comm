const path = require('path');

const { DEFAULT_EXTENSIONS } = require('@babel/core');
const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const glob = require('glob');

// const { getExtraBuildDir } = require('./script/build/rollup-helper');
const pkg = require('./package.json');


const PATHS = {
  input: path.join(__dirname, '/src/index.ts'),
  output: path.join(__dirname, '/lib'),
  outputES: path.join(__dirname, '/es'),
};


function getAllSourceInput() {
  const input = Object.fromEntries(glob.sync('src/**/*.ts')
    .filter(item => !item.endsWith('.d.ts') && !item.endsWith('/types.ts'))
    .map(file => [
      // 这里将删除 `src/` 以及每个文件的扩展名。
      // 因此，例如 src/nested/foo.js 会变成 nested/foo
      path.relative(
        'src',
        file.slice(0, file.length - path.extname(file).length),
      ),
      // 这里可以将相对路径扩展为绝对路径，例如
      // src/nested/foo 会变成 /project/src/nested/foo.js
      // fileURLToPath(new URL(file, import.meta.url)),
      path.resolve(file),
    ]));

  // console.log('[getAllSourceInput] input: ', input);
  return input;
}


// plugins 需要注意引用顺序
const ROLLUP_PLUGINS = [
  // 配合 commnjs 解析第三方模块
  nodeResolve(),

  // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
  commonjs({
    sourceMap: false,
  }),

  // filesize(),

  babel({
    babelHelpers: 'runtime',
    // 只转换源代码，不运行外部依赖
    exclude: 'node_modules/**',
    // babel 默认不支持 ts 需要手动添加
    extensions: [...DEFAULT_EXTENSIONS, '.ts'],
  }),
  // terser(),
];

const ROLLUP_EXTERNALS = [
  'fs',
  'path',
  // ...Object.keys(pkg.dependencies),
  /@babel\/runtime/,
  'axios',
];


const allRollupConfig = [
  {
    input: getAllSourceInput(),
    output: [{
      format: 'cjs',
      exports: 'named',
      dir: PATHS.output,
      // preserveModules: true,
    }],
    external: ROLLUP_EXTERNALS,
    plugins: [
      // ts 的功能只在于编译出声明文件，所以 target 为 ESNext，编译交给 babel 来做
      typescript({
        tsconfig: './tsconfig.json',
      }),
      ...ROLLUP_PLUGINS,
    ],
  },
  {
    input: getAllSourceInput(),
    output: [{
      format: 'es',
      exports: 'named',
      dir: PATHS.outputES,
    }],
    external: ROLLUP_EXTERNALS,
    plugins: [
      typescript({
        tsconfig: './tsconfig-es.json',
      }),
      ...ROLLUP_PLUGINS,
    ],
  },
  {
    input: PATHS.input,
    output: [{
      file: path.join(PATHS.output, 'index.esm.js'),
      format: 'es',
      name: pkg.name,
    }],
    external: ROLLUP_EXTERNALS,
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
      }),
      ...ROLLUP_PLUGINS,
    ],
  },
  // ...getExtraBuildDir({
  //   external: ROLLUP_EXTERNALS,
  //   plugins: ROLLUP_PLUGINS,
  // }),
];


module.exports = allRollupConfig;
