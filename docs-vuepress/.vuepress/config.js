const { SHOW_CHANGE_LOG } = require('./changelog.env');
const { getSidebarConfig } = require('./sidebar');


const changeLogSidebar = SHOW_CHANGE_LOG ? [
  {
    title: '更新日志',
    path: '/CHANGELOG.md',
  },
] : [];


module.exports = {
  title: 'T Comm',
  description: '专业、稳定、纯粹的工具库',
  base: process.env.PUBLISH_PATH || '/t-comm/',
  head: [
    [
      'link', { rel: 'icon', href: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_5489135b5a3b9258d8.png' },
    ],
    [
      'script',
      {
        src: 'https://tam.cdn-go.cn/aegis-sdk/latest/aegis.min.js',
      },
    ],
    [
      'script',
      {},
      `
      console.log('Aegis', window.Aegis);
      if (typeof Aegis === 'function') {
        var aegis = new Aegis({
          id: 'YrK6DHb3O67zG2k6xE', // 上报 id
          uin: 'xxx', // 用户唯一 ID（可选）
          reportApiSpeed: true, // 接口测速
          reportAssetSpeed: true, // 静态资源测速
          spa: true, // spa 应用页面跳转的时候开启 pv 计算
          hostUrl: 'https://rumt-zh.com'
        });
        console.log('aegis', aegis);
      }
      console.log('welcome notes of novlan1!');
      `,
    ],
  ],
  markdown: {
    // 显示行号
    lineNumbers: false,
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
    sidebarDepth: 0, // 嵌套标题深度
    lastUpdated: 'Last Updated', // string | boolean
    smoothScroll: true,
    nav: [
      {
        text: 'Press UI',
        link: 'https://novlan1.github.io/press-ui/',
      },
      {
        text: 'Plugin Light',
        link: 'https://novlan1.github.io/plugin-light/',
      },
      {
        text: '源码',
        link: 'https://github.com/novlan1/t-comm',
      },
    ],
    sidebar: [
      {
        title: '介绍',
        path: '/',
      },

      {
        title: '工具',
        collapsable: false,
        children: [
          ...getSidebarConfig(),
        ],
      },
      {
        title: 'CLI命令',
        collapsable: false,
        children: [
          {
            title: 'publish',
            path: '/cli/publish.md',
          },
          {
            title: 'mp-env',
            path: '/cli/mp-env.md',
          },
          {
            title: 'mp-upload',
            path: '/cli/mp-upload.md',
          },
          {
            title: 'deploy-github',
            path: '/cli/deploy-github.md',
          },
        ],
      },
      {
        title: '贡献指南',
        path: '/CONTRIBUTING.md',
      },
      ...changeLogSidebar,
    ],
  },

};
