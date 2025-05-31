<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import {
  fetchWeatherData,
  sendWeatherRobotMsg,
  getWeatherRobotContent
} from 't-comm';

// or
import {
  fetchWeatherData,
  sendWeatherRobotMsg,
  getWeatherRobotContent
} from 't-comm/lib/weather/index';
```


### `fetchWeatherData()` 


**描述**：<p>获取天气信息</p>

**参数**：

**返回**: <code>Promise.&lt;Array&gt;</code><br>

<p>天气数据</p>

**示例**

```typescript
fetchWeatherData().then(content => {
  console.log(content)
})
```
<a name="sendWeatherRobotMsg"></a>

### `sendWeatherRobotMsg(options)` 


**描述**：<p>获取天气信息并发送</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>配置</p> |
| options.webhookUrl | <code>string</code> | <p>机器人hook地址</p> |
| [options.chatId] | <code>string</code> | <p>会话Id</p> |
| [options.force] | <code>string</code> | <p>是否在和之前获取数据相同时，也发送</p> |

**返回**: <code>Promise.&lt;Object&gt;</code><br>

<p>请求Promise</p>

<a name="getWeatherRobotContent"></a>

### `getWeatherRobotContent()` 


**描述**：<p>获取深圳天气信息，可用于通过机器人发送到群聊</p>

**参数**：

**返回**: <code>object</code><br>

<p>天气信息和是否有变化</p>

**示例**

```typescript
getWeatherRobotContent().then(resp => {
  const { content, isSame } = resp

  console.log(content)
  // ## 深圳当前正在生效的预警如下
  // ...

  console.log(isSame)
  // false
})
```
