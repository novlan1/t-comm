
### 引入

```ts
import {
  genVersionAndSendChangeLog,
  genVersionTip,
  genVersion
} from 't-comm';

// 不支持 tree-shaking 的项目
import {
  genVersionAndSendChangeLog,
  genVersionTip,
  genVersion
} from 't-comm/lib/version-tip/index';

// 只支持 ESM 的项目
import {
  genVersionAndSendChangeLog,
  genVersionTip,
  genVersion
} from 't-comm/es/version-tip/index';
```


### `genVersionAndSendChangeLog(options)` 


**描述**：<p>运行standard-version，并且发送changelog到机器人</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>配置</p> |
| config.appInfo | <code>object</code> | <p>package.json信息</p> |
| config.root | <code>string</code> | <p>项目根路径</p> |
| config.changeLogFilePath | <code>string</code> | <p>changelog文件地址</p> |
| config.webhookUrl | <code>string</code> | <p>机器人hook地址</p> |
| config.chatId | <code>string</code> | <p>会话id</p> |



<a name="genVersionTip"></a>

### `genVersionTip(config)` 


**描述**：<p>生成版本信息，可以用来发送到群聊中</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>配置信息</p> |
| config.readmeFilePath | <code>string</code> | <p>changelog文件地址</p> |
| config.appInfo | <code>object</code> | <p>package.json信息</p> |

**返回**: <code>string</code><br>

<p>版本信息</p>

**示例**

```typescript
const appInfo = require(`${rootPath}/package.json`);
const readmeFilePath = `${rootPath}/CHANGELOG.md`;

const content = genVersionTip({
  readmeFilePath,
  appInfo,
});
```
<a name="genVersion"></a>

### `genVersion(config)` 


**描述**：<p>自动生成version，核心是利用 standard-version 命令</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| config | <code>object</code> | <p>配置信息</p> |
| config.root | <code>string</code> | <p>项目根路径</p> |

**返回**: <code>boolean</code><br>

<p>是否执行了 standard-version</p>

**示例**

```typescript
genVersion({
  root: process.cwd()
})
```
