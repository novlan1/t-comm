export const FILE_TYPE_MAP = {
  js: {
    reg: /\.js$/,
    lintKeyword: '--ext .js .',
    outputFileName: 'lint-js.json',
  },
  ts: {
    reg: /\.ts$/,
    lintKeyword: '--ext .ts .',
    outputFileName: 'lint-ts.json',
  },
  jsx: {
    reg: /\.jsx$/,
    lintKeyword: '--ext .jsx .',
    outputFileName: 'lint-jsx.json',
  },
  tsx: {
    reg: /\.tsx$/,
    lintKeyword: '--ext .tsx .',
    outputFileName: 'lint-tsx.json',
  },
  vue: {
    reg: /\.vue$/,
    lintKeyword: '--ext .vue .',
    outputFileName: 'lint-vue.json',
    isVue: true,
  },
  scss: {
    reg: /\.scss$/,
    lintKeyword: '"**/*.scss"',
    outputFileName: 'lint-scss.json',
    isStyle: true,
  },
  css: {
    reg: /\.css$/,
    lintKeyword: '"**/*.css"',
    outputFileName: 'lint-css.json',
    isStyle: true,
  },
  less: {
    reg: /\.less$/,
    lintKeyword: '"**/*.less"',
    outputFileName: 'lint-less.json',
    isStyle: true,
  },
};
