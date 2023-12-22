[[toc]]

## 引入

```ts
import { watchRainbowToCosAndSendRobot } from 't-comm';

// or

import { watchRainbowToCosAndSendRobot} from 't-comm/lib/rainbow-to-cos/index';
```


## `watchRainbowToCosAndSendRobot(options)` 


**描述**：<p>监听rainbow，同步到cos，并发送到机器人</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | <p>配置</p> |
| options.rainbowSecretInfo | <code>object</code> | <p>七彩石密钥信息</p> |
| options.cosInfo | <code>object</code> | <p>腾讯云信息</p> |
| options.appName | <code>string</code> | <p>七彩石项目名称</p> |
| options.webhookUrl | <code>string</code> | <p>机器人回调</p> |
| options.chatId | <code>string</code> | <p>会话id</p> |
| options.sendToRobotType | <code>0</code> \| <code>1</code> \| <code>2</code> | <p>发送机器人类型，0 不发送，1 发送变化的部分，2 全部发送</p> |



**示例**

```typescript
await watchRainbowToCosAndSendRobot({
  rainbowSecretInfo: {
    appID: RAINBOW_OPEN_APP_ID,
    userID: RAINBOW_OPEN_YGW_USER_ID,
    secretKey: RAINBOW_OPEN_YGW_SECRET_KEY,
    envName: 'Default',
    groupName: 'group',
  },
  appName: 'configApp',
  cosInfo: {
    secretId,
    secretKey,
    bucket: 'bucket',
    region: 'ap-guangzhou',
    dir: 'rb',
  },
  webhookUrl: 'xxx',
  chatId: 'xxx',
  sendToRobotType: 1,
});
```
