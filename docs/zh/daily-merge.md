[[toc]]

## 引入

```ts
import { dailyMerge } from 't-comm';

// or

import { dailyMerge} from 't-comm/lib/daily-merge/index';
```


## `dailyMerge(param)` 


**描述**：<p>每日合并</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| param | <code>object</code> | <p>参数</p> |



**示例**

```ts
dailyMerge({
  webhookUrl: 'xx',
  appName: 'xx',
  projectId: 'xx',
  devRoot: 'xx',

  baseUrl: 'xx',
  repoName: 'xx',
  privateToken: 'xx',

  isDryRun: false,
})
```
