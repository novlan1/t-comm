
### 引入

```ts
import { MpCI  } from 't-comm';

// 不支持 tree-shaking 的项目
import { MpCI } from 't-comm/lib/mp-ci/index';

// 只支持 ESM 的项目
import { MpCI } from 't-comm/es/mp-ci/index';
```


### MpCI 


**参数**：




* [MpCI](#MpCI)
    * [`new MpCI(options)`](#new_MpCI_new)
    * [`.upload()`](#MpCI+upload)
    * [`.tryPreview()`](#MpCI+tryPreview)
    * [`.uploadPreviewImg()`](#MpCI+uploadPreviewImg)
    * [`.sendRobotMsg()`](#MpCI+sendRobotMsg)

<a name="new_MpCI_new"></a>

#### `new MpCI(options)`
<p>小程序自动化构建工具</p>


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | <p>选项</p> |

**Example**  
```typescript
const { MpCI, fetchRainbowConfig } = require('t-comm');

const env = "${env}"
const branch = "${branch}"

const root = "${WORKSPACE}";

async function getCIConfig() {
  let res = {};
  const str = await fetchRainbowConfig('mp_ci', {
    appId: '',
    envName: 'x',
    groupName: 'x',
  });
  try {
    res = JSON.parse(str);
  } catch (err) {}
  return res;
}

function getRobot(config = {}) {
  return config?.robotMap?.[branch]?.[env] || 1;
}

async function main() {
  const config = await getCIConfig();
  console.log('config: \n', config, typeof config);
  const {
    appName,
    appId,
    webhookUrl,
    chatId,
    cosInfo,
  } = config;

  const ci = new MpCI({
    appName,
    appId,
    root,
    env,
    robotNumber: getRobot(config),

    webhookUrl,
    chatId,

    cosInfo,
  });

  await ci.upload();
  await ci.preview();
  await ci.sendRobotMsg();
}

main();
```
<a name="MpCI+upload"></a>

#### `mpCI.upload()`
<p>上传</p>

**Kind**: instance method of [<code>MpCI</code>](#MpCI)  
<a name="MpCI+tryPreview"></a>

#### `mpCI.tryPreview()`
<p>预览</p>

**Kind**: instance method of [<code>MpCI</code>](#MpCI)  
<a name="MpCI+uploadPreviewImg"></a>

#### `mpCI.uploadPreviewImg()`
<p>上传预览图片到COS</p>

**Kind**: instance method of [<code>MpCI</code>](#MpCI)  
<a name="MpCI+sendRobotMsg"></a>

#### `mpCI.sendRobotMsg()`
<p>发送机器人消息</p>

**Kind**: instance method of [<code>MpCI</code>](#MpCI)  
