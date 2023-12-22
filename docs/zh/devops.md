[[toc]]

## 引入

```ts
import {
  startDevopsPipeline,
  getPipelineList,
  getAllPipelineList,
  sendOverTimePipelineMessage
} from 't-comm';

// or

import {
  startDevopsPipeline,
  getPipelineList,
  getAllPipelineList,
  sendOverTimePipelineMessage
} from 't-comm/lib/devops/index';
```


## `startDevopsPipeline(params)` 


**描述**：<p>启动流水线</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>object</code> | <p>配置信息</p> |
| params.projectId | <code>string</code> | <p>项目ID</p> |
| params.pipelineId | <code>string</code> | <p>流水线ID</p> |
| params.secretInfo | <code>object</code> | <p>密钥信息</p> |
| params.host | <code>string</code> | <p>请求域名</p> |
| params.data | <code>object</code> | <p>请求数据</p> |



<a name="getPipelineList"></a>

## `getPipelineList(params)` 


**描述**：<p>获取流水线列表</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>object</code> | <p>配置信息</p> |
| params.projectId | <code>string</code> | <p>项目ID</p> |
| params.secretInfo | <code>object</code> | <p>密钥信息</p> |
| params.host | <code>string</code> | <p>请求域名</p> |
| params.page | <code>number</code> | <p>第几页</p> |
| params.pageSize | <code>number</code> | <p>每页数据量</p> |

**返回**: <p>流水线列表</p>

<a name="getAllPipelineList"></a>

## `getAllPipelineList(params, list)` 


**描述**：<p>获取全部流水线列表</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>object</code> | <p>配置信息</p> |
| params.projectId | <code>string</code> | <p>项目ID</p> |
| params.secretInfo | <code>object</code> | <p>密钥信息</p> |
| params.host | <code>string</code> | <p>请求域名</p> |
| params.page | <code>number</code> | <p>第几页</p> |
| params.pageSize | <code>number</code> | <p>每页数据量</p> |
| list | <code>Array</code> | <p>结果列表，可不传，用于迭代</p> |

**返回**: <p>流水线列表</p>

<a name="sendOverTimePipelineMessage"></a>

## `sendOverTimePipelineMessage(params)` 


**描述**：<p>获取超时的流水线列表，并发送机器人消息</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>object</code> | <p>参数</p> |
| params.params | <code>object</code> | <p>获取流水线列表参数</p> |
| params.pipelineHost | <code>string</code> | <p>流水线 host 地址</p> |
| params.webhookUrl | <code>string</code> | <p>回调地址</p> |
| params.chatId | <code>string</code> | <p>会话id</p> |



