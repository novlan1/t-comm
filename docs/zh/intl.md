
### 引入

```ts
import { loginByIntl } from 't-comm';

// 不支持 tree-shaking 的项目
import { loginByIntl} from 't-comm/lib/intl/index';

// 只支持 ESM 的项目
import { loginByIntl} from 't-comm/es/intl/index';
```


### `loginByIntl(options)` 


**描述**：<p>通过 intl 登录</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>Options</code> | <p>参数</p> |



**示例**

```ts
function loginIntl() {
  const checkLoginAPI = res => new Promise((resolve, reject) => {
    getScheList({
      query: {
        ...INTL_CONFIG.extraQueryObject,
        appid: INTL_CONFIG.gameID,
        channelid: res.channel_info?.channelId,
      },
    }).then((res) => {
      resolve(res);
    })
      .catch((err) => {
        reject(err);
      });
  });

  return loginByIntl({
    cookieDomain: COOKIE_DOMAIN,
    env: INTL_CONFIG.env,
    gameID: INTL_CONFIG.gameID,
    appID: INTL_CONFIG.appID,
    webID: INTL_CONFIG.webID,
    checkLoginAPI,
  });
}

```
