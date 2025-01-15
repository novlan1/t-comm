[[toc]]

<h2>引入</h2>

```ts
import { dailyMerge } from 't-comm';

// or
import { dailyMerge} from 't-comm/lib/daily-merge/index';
```


## `dailyMerge(param0)` 


**描述**：<p>每日合并</p>
<ol>
<li>获取昨天有活跃的分支</li>
<li>对于每个分支，进行合并并推送
<ul>
<li>清理 Git 环境</li>
<li>切到主分支，并拉最新代码</li>
<li>切到当前分支，拉最新代码</li>
<li>尝试执行 git merge</li>
<li>对比 merge 前后的 commit 信息是否相同，作为判断 merge 是否成功的依据</li>
</ul>
</li>
<li>发送机器人消息</li>
</ol>

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
  devRoot: 'xx',

  baseUrl: 'xx',
  repoName: 'xx',
  privateToken: 'xx',

  isDryRun: false,
})
```
