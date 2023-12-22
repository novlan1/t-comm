[[toc]]

## 引入

```ts
import { insertDocChangeLog } from 't-comm';

// or

import { insertDocChangeLog} from 't-comm/lib/change-log/index';
```


## `insertDocChangeLog(params)` 


**描述**：<p>同步最新版本的更新日志</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>object</code> | <p>参数</p> |
| params.changelogPath | <code>string</code> | <p>源 change-log路径</p> |
| params.docChangelogPath | <code>string</code> | <p>文档 change-log 路径</p> |
| params.packageJsonPath | <code>string</code> | <p>package.json 路径</p> |



**示例**

```ts
const DOC_CHANGE_LOG_PATH = './docs/CHANGELOG.md';
const SOURCE_CHANGE_LOG_PATH = './CHANGELOG.md';

insertDocChangeLog({
  changelogPath: SOURCE_CHANGE_LOG_PATH,
  docChangeLog: DOC_CHANGE_LOG_PATH,
  packageJsonPath: './package.json',
});
```
