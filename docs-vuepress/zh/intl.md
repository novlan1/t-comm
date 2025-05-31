<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { loginByIntl } from 't-comm';

// or
import { loginByIntl} from 't-comm/lib/intl/index';
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
