
## `sendWxRobotMsg(config)` 


**描述**：<p>给机器人发送普通消息</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>Object</code> | <p>配置内容</p> |
| config.webhookUrl | <code>string</code> | <p>钩子链接</p> |
| config.chatId | <code>string</code> | <p>会话id</p> |
| config.alias | <code>string</code> | <p>别名</p> |
| config.content | <code>string</code> | <p>内容</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>Promise</p>

**示例**

```typescript
sendWxRobotMsg({
  webhookUrl: 'xxx',
  chatId: 'xxx',
  content: 'xxx',
  alias: 'xxx',
}).then(() => {

})
```
<a name="sendWxRobotMarkdown"></a>

## `sendWxRobotMarkdown(config)` 


**描述**：<p>给机器人发送Markdown消息</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>Object</code> | <p>配置内容</p> |
| config.webhookUrl | <code>string</code> | <p>钩子链接</p> |
| config.chatId | <code>string</code> | <p>会话id</p> |
| config.content | <code>string</code> | <p>内容</p> |
| config.attachments | <code>Array.&lt;object&gt;</code> | <p>附加内容</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
sendWxRobotMarkdown({
  webhookUrl: 'xxx',
  chatId: 'xxx',
  content: 'xxx',
  attachments: []
}).then(() => {

})
```
<a name="sendWxRobotImg"></a>

## `sendWxRobotImg(config)` 


**描述**：<p>给机器人发送图片</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>Object</code> | <p>配置参数</p> |
| config.webhookUrl | <code>string</code> | <p>钩子链接</p> |
| config.chatId | <code>string</code> | <p>会话id</p> |
| config.content | <code>string</code> | <p>内容</p> |
| config.md5Val | <code>string</code> | <p>md5内容</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
sendWxRobotImg({
  webhookUrl: 'xxx',
  chatId: 'xxx',
  content: 'xxx',
  md5Val: 'xxx'
}).then(() => {

})
```
<a name="batchSendWxRobotBase64Img"></a>

## `batchSendWxRobotBase64Img(config)` 


**描述**：<p>批量发送企业微信机器人base64图片</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>配置信息</p> |
| config.img | <code>string</code> | <p>base64图片</p> |
| config.chatId | <code>string</code> | <p>会话Id</p> |
| config.webhookUrl | <code>string</code> | <p>webhook地址</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
batchSendWxRobotBase64Img({
  img: 'xxx',
  chatId: 'xxx', // or ['xxx], or ['ALL'], or 'ALL'
  webhookUrl: 'xxx',
}).then(() => {

})
```
<a name="sendWxRobotBase64Img"></a>

## `sendWxRobotBase64Img(config)` 


**描述**：<p>发送企业微信机器人base64图片，其实就是先保存到本地，然后生成md5，最后发送</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>配置信息</p> |
| config.img | <code>string</code> | <p>base64图片</p> |
| config.chatId | <code>string</code> | <p>会话Id</p> |
| config.webhookUrl | <code>string</code> | <p>webhook地址</p> |

**返回**: <code>Promise.&lt;object&gt;</code><br>

<p>请求Promise</p>

**示例**

```typescript
sendWxRobotBase64Img({
  img: 'xxx',
  chatId: 'xxx',
  webhookUrl: 'xxx',
}).then(() => {

})
```
