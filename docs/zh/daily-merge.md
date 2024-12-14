[[toc]]

<h2>引入</h2>

```ts
import { dailyMerge } from 't-comm';

// or
import { dailyMerge} from 't-comm/lib/daily-merge/index';
```


## `dailyMerge(param0)` 


**描述**：<p>每日合并</p>

**参数**：


| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| param0 | <code>object</code> |  | <p>参数</p> |
| param0.webhookUrl | <code>string</code> |  | <p>机器人地址</p> |
| param0.appName | <code>string</code> |  | <p>项目名称</p> |
| param0.devRoot | <code>string</code> |  | <p>项目根路径</p> |
| param0.baseUrl | <code>string</code> |  | <p>基础请求 url</p> |
| param0.repoName | <code>string</code> |  | <p>仓库名称</p> |
| param0.privateToken | <code>string</code> |  | <p>密钥</p> |
| [param0.isDryRun] | <code>boolean</code> | <code>false</code> | <p>是否演练</p> |
| [param0.mainBranch] | <code>string</code> | <code>&quot;&#x27;develop&#x27;&quot;</code> | <p>主分支</p> |
| [param0.whiteBranchReg] | <code>Regexp</code> | <code>/^release\|develop\|hotfix\\/.+$/</code> | <p>不处理的分支正则</p> |



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
