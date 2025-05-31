// @ts-ignore
import { defineConfig } from 'vitepress';

import { getFooterMessage } from './footer';
import { getSidebarConfig } from './sidebar';


// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'T Comm',
  description: '丰富易用的工具集',


  lastUpdated: true,
  cleanUrls: false,
  base: '/t-comm/',

  head: [
    ['link', { rel: 'icon', href: '/t-comm/favicon.ico' }],
    ['meta', { name: 'author', content: 'guowangyang' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          '前端, notes, 笔记, Javascript, Typescript, React, Vue, webpack, vite, HTTP, 算法',
      },
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
          // uin: 'xxx', // 用户唯一 ID（可选）
          reportApiSpeed: true, // 接口测速
          reportAssetSpeed: true, // 静态资源测速
          spa: true, // spa 应用页面跳转的时候开启 pv 计算
          hostUrl: 'https://rumt-zh.com'
        });
        console.log('aegis', aegis);
      }
      console.log('welcome docs by guowangyang!');
      `,
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Press UI', link: 'https://novlan1.github.io/press-ui/' },
      { text: 'Plugin Light', link: 'https://novlan1.github.io/plugin-light/' },
    ],

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
      label: '目录',
    },

    sidebar: [
      {
        text: '介绍',
        link: '/README.md',
      },
      {
        text: '常见问题',
        link: '/QUESTIONS.md',
      },
      {
        text: '贡献指南',
        link: '/CONTRIBUTING.md',
      },
      {
        text: '更新日志',
        link: '/CHANGELOG.md',
      },
      {
        text: '工具',
        collapsed: false,
        items: [
          ...getSidebarConfig(),
        ],
      },
    ],

    socialLinks: [{ icon: 'git', link: 'https://git.woa.com/pmd-mobile/pmd-h5/t-comm/' }],

    footer: {
      message: getFooterMessage(),
      copyright: 'Copyright © 2021-present guowangyang',
    },
  },
  ignoreDeadLinks: true,

  vite: {
    esbuild: {
      loader: 'tsx', // 支持 TS/TSX
    },
  },
});
