const { getSidebarConfig } = require('./sidebar');
const { SHOW_CHANGE_LOG } = require('./changelog.env');


const changeLogSidebar = SHOW_CHANGE_LOG ? [
  {
    title: '更新日志',
    path: '/CHANGELOG.md',
  },
] : [];


module.exports = {
  title: 't-comm',
  description: '丰富易用的工具库',
  base: process.env.PUBLISH_PATH || '/t-comm/',
  head: [
    [
      'link', { rel: 'icon', href: '/images/favicon.ico' },
    ],
  ],
  markdown: {
    // 显示行号
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4'],
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN',
      // title: '',
      // description: '',
    },
  },
  themeConfig: {
    sidebarDepth: 1, // 嵌套标题深度
    lastUpdated: 'Last Updated', // string | boolean
    smoothScroll: true,
    nav: [
      {
        text: '源码地址',
        link: 'https://github.com/novlan1/t-comm',
      },
      {
        text: 'Press UI',
        link: 'https://novlan1.github.io/press-ui/',
      },
    ],
    sidebar: [
      {
        title: '介绍',
        path: '/',
      },
      ...getSidebarConfig(),
      ...changeLogSidebar,
    ],
  },

};