import{_ as a,c as n,o as e,ag as p}from"./chunks/framework.C6Ot-a7E.js";const m=JSON.parse('{"title":"常见问题","description":"","frontmatter":{},"headers":[],"relativePath":"QUESTIONS.md","filePath":"QUESTIONS.md","lastUpdated":1748703471000}'),l={name:"QUESTIONS.md"};function i(t,s,o,c,d,r){return e(),n("div",null,s[0]||(s[0]=[p(`<h1 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h1><h2 id="单文件导入" tabindex="-1">单文件导入 <a class="header-anchor" href="#单文件导入" aria-label="Permalink to &quot;单文件导入&quot;">​</a></h2><p>单文件引入就是不从入口文件引入，而是从子目录引入：</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">- import { flat } from &#39;t-comm&#39;;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+ import { flat } from &#39;t-comm/es/base/list/index&#39;;</span></span></code></pre></div><p>有两种情况需要从单文件引入</p><ol><li>前端工程。由于 <code>t-comm</code> 中使用了 <code>nodejs</code> 包，在前端项目中直接引入 <code>t-comm</code> 会因为这些依赖而报错</li><li>想要 <code>tress-shaking</code>，但是业务项目不支持，比如 <code>Vue2.x</code> 版本的 Uni App 等项目</li></ol><h2 id="es-目录和-lib-目录的区别" tabindex="-1">es 目录和 lib 目录的区别 <a class="header-anchor" href="#es-目录和-lib-目录的区别" aria-label="Permalink to &quot;es 目录和 lib 目录的区别&quot;">​</a></h2><ul><li><code>es</code> 导出的内容属于 <a href="https://nodejs.org/api/esm.html" target="_blank" rel="noreferrer">ESM</a> 规范</li><li><code>lib</code> 目录导出的内容数据 <a href="https://nodejs.org/api/modules.html" target="_blank" rel="noreferrer">CommonJS</a> 规范</li></ul><h2 id="导出目录结构" tabindex="-1">导出目录结构 <a class="header-anchor" href="#导出目录结构" aria-label="Permalink to &quot;导出目录结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>t-comm/</span></span>
<span class="line"><span>├── bin/                  # CLI 命令入口文件</span></span>
<span class="line"><span>│   └── cli.js            # CLI 主程序</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── es/                   # ESM 模块构建产物</span></span>
<span class="line"><span>│   ├── foo/              </span></span>
<span class="line"><span>│   │   ├── index.js      # 模块入口</span></span>
<span class="line"><span>│   │   └── foo.js        # 具体实现</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   └── bar/              </span></span>
<span class="line"><span>│       ├── index.js      # 模块入口</span></span>
<span class="line"><span>│       └── bar.js        # 具体实现</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── lib/                  # CJS 模块构建产物</span></span>
<span class="line"><span>│   ├── foo/              </span></span>
<span class="line"><span>│   │   ├── index.js      # 模块入口</span></span>
<span class="line"><span>│   │   └── foo.js        # 具体实现</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   └── bar/              </span></span>
<span class="line"><span>│   │   ├── index.js      # 模块入口</span></span>
<span class="line"><span>│   │   └── bar.js        # 具体实现</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── index.js          # CJS 入口</span></span>
<span class="line"><span>│   └── index.esm.js      # ESM 入口</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>└── README.md             # 项目说明文档</span></span></code></pre></div>`,10)]))}const b=a(l,[["render",i]]);export{m as __pageData,b as default};
