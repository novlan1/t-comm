const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { DEFAULT_EXTENSIONS } = require('@babel/core');

const { getExtraBuildDir } = require('./script/build/rollup-helper');
const pkg = require('./package.json');


const paths = {
  input: path.join(__dirname, '/src/index.ts'),
  output: path.join(__dirname, '/lib'),
};

// rollup 配置项
const rollupConfig = {
  input: paths.input,
  output: [
    // 输出 commonjs 规范的代码
    {
      file: path.join(paths.output, 'index.js'),
      format: 'cjs',
      name: pkg.name,
    },
    // 输出 es 规范的代码
    {
      file: path.join(paths.output, 'index.esm.js'),
      format: 'es',
      name: pkg.name,
    },
  ],
  external: [
    'fs',
    'path',
    // ...Object.keys(pkg.dependencies),
    /@babel\/runtime/,
    'axios',
  ], // 指出应将哪些模块视为外部模块，如 Peer dependencies 中的依赖
  // plugins 需要注意引用顺序
  plugins: [
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
  ],
};

export default [
  {
    input: rollupConfig.input,
    output: rollupConfig.output,
    external: rollupConfig.external,
    plugins: [
      // ts 的功能只在于编译出声明文件，所以 target 为 ESNext，编译交给 babel 来做
      typescript({
        tsconfig: './tsconfig.json',
      }),
      ...(rollupConfig.plugins || []),
    ],
  },
  ...getExtraBuildDir(rollupConfig),
];
