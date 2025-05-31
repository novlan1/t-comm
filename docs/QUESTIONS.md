# 常见问题

## 单文件导入

单文件引入就是不从入口文件引入，而是从子目录引入：

```diff
- import { flat } from 't-comm';
+ import { flat } from 't-comm/es/base/list/index';
```

有两种情况需要从单文件引入

1. 前端工程。由于 `t-comm` 中使用了 `nodejs` 包，在前端项目中直接引入 `t-comm` 会因为这些依赖而报错
2. 想要 `tress-shaking`，但是业务项目不支持，比如 `Vue2.x` 版本的 Uni App 等项目

## es 目录和 lib 目录的区别

- `es` 导出的内容属于 [ESM](https://nodejs.org/api/esm.html) 规范
- `lib` 目录导出的内容数据 [CommonJS](https://nodejs.org/api/modules.html) 规范

## 导出目录结构

```
t-comm/
├── bin/                  # CLI 命令入口文件
│   └── cli.js            # CLI 主程序
│
├── es/                   # ESM 模块构建产物
│   ├── foo/              
│   │   ├── index.js      # 模块入口
│   │   └── foo.js        # 具体实现
│   │
│   └── bar/              
│       ├── index.js      # 模块入口
│       └── bar.js        # 具体实现
│
├── lib/                  # CJS 模块构建产物
│   ├── foo/              
│   │   ├── index.js      # 模块入口
│   │   └── foo.js        # 具体实现
│   │
│   └── bar/              
│   │   ├── index.js      # 模块入口
│   │   └── bar.js        # 具体实现
│   │
│   ├── index.js          # CJS 入口
│   └── index.esm.js      # ESM 入口
│
└── README.md             # 项目说明文档
```
