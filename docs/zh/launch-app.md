
### 引入

```ts
import {
  getOpenGameScheme,
  launchApp,
  gotoWzGame,
  gotoWzCommunity,
  gotoGPGame,
  gotoDzGame,
  gotoMJGame,
  gotoLOLMGame,
  gotoTLBBGame,
  gotoTDGame,
  gotoX5MGame
} from 't-comm';

// 不支持 tree-shaking 的项目
import {
  getOpenGameScheme,
  launchApp,
  gotoWzGame,
  gotoWzCommunity,
  gotoGPGame,
  gotoDzGame,
  gotoMJGame,
  gotoLOLMGame,
  gotoTLBBGame,
  gotoTDGame,
  gotoX5MGame
} from 't-comm/lib/launch-app/index';

// 只支持 ESM 的项目
import {
  getOpenGameScheme,
  launchApp,
  gotoWzGame,
  gotoWzCommunity,
  gotoGPGame,
  gotoDzGame,
  gotoMJGame,
  gotoLOLMGame,
  gotoTLBBGame,
  gotoTDGame,
  gotoX5MGame
} from 't-comm/es/launch-app/index';
```


### `getOpenGameScheme` 


**描述**：<p>获取拉起各个游戏的scheme,如果参数中设置了页面，则为deeplink scheme</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| gid | <code>int</code> | <p>游戏ID</p> |
| pageUrl | <code>String</code> | <p>要打开的页面地址，为空时表示只拉起游戏</p> |



<a name="launchApp"></a>

### `launchApp(args)` 


**描述**：<p>兼容微信、手Q、手机原生浏览器、游戏内环境的唤起第三方 APP 方法。用于替代 launch 方法，优化传参以及底层实现。</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| args | <code>Object</code> | <p>必须，参数对象</p> |
| args.appid | <code>String</code> | <p>必须，用于微信内拉起，微信开放平台的 appID，向游戏公众号管理者索取。</p> |
| args.weixinScheme | <code>String</code> | <p>必须，用于微信内拉起，目标 App 的 URL Scheme</p> |
| args.browserAppScheme | <code>String</code> | <p>必须，用于 iOS 原生浏览器拉起，目标 App 的 URL Scheme</p> |
| args.browserApkScheme | <code>String</code> | <p>必须，用于 Android 原生浏览器拉起，目标 App 的 URL Scheme</p> |
| args.qqAppScheme | <code>String</code> | <p>必须，用于 iOS + 手 Q 内拉起，目标 App 的 URL Scheme</p> |
| args.qqAppPackageName | <code>String</code> | <p>必须，用于 Android + 手 Q 内拉起，目标 App 的安卓包名，例如 com.tencent.tmgp.sgame</p> |
| args.isUseSchemeParams | <code>Boolean</code> | <p>可选，默认 false，scheme 是否携带参数，用于手Q内判断切换拉起方式</p> |
| args.openMarket | <code>Boolean</code> | <p>可选，默认 false，若跳转失败，拉起应用下载地址</p> |
| args.appMarketUrl | <code>String</code> | <p>可选，默认空，Appstore 下载地址，例如 https://itunes.apple.com/cn/app/id989673964</p> |
| args.apkMarketUrl | <code>String</code> | <p>可选，默认空，安卓应用下载地址，例如 market://details?id=com.tencent.tmgp.sgame</p> |
| args.needRedirect | <code>Boolean</code> | <p>可选，默认 false，若不跳转下载，是否跳转其他地址</p> |
| args.redirectUrl | <code>String</code> | <p>可选，默认空，跳转其他地址，例如某官网地址</p> |
| args.failTips | <code>String</code> | <p>可选，默认空，若不跳转下载 or 其他地址，而是开启拉起失败提示，该处填写提示内容</p> |
| args.successCallback | <code>function</code> | <p>可选，默认空，拉起成功回调</p> |
| args.failCallback | <code>function</code> | <p>可选，默认空，拉起失败回调</p> |



<a name="gotoWzGame"></a>

### `gotoWzGame(options)` 


**描述**：<p>拉起王者荣耀游戏</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>Object</code> | <p>可选，覆盖内部默认配置，参考 launchApp 的参数要求</p> |



<a name="gotoWzCommunity"></a>

### `gotoWzCommunity(options)` 


**描述**：<p>拉起王者荣耀游戏微社区</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>Object</code> | <p>必须，参数对象。除 pageUrl 外，其余参数可选，参考 launchApp 的参数要求</p> |
| options.pageUrl | <code>String</code> | <p>必须，内置落地页。</p> |



<a name="gotoGPGame"></a>

### `gotoGPGame(options)` 


**描述**：<p>拉起和平精英游戏</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>Object</code> | <p>可选，覆盖内部默认配置，参考 launchApp 的参数要求</p> |



<a name="gotoDzGame"></a>

### `gotoDzGame(options)` 


**描述**：<p>拉起欢乐斗地主游戏</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>Object</code> | <p>可选，覆盖内部默认配置，参考 launchApp 的参数要求</p> |



<a name="gotoMJGame"></a>

### `gotoMJGame(options)` 


**描述**：<p>拉起欢乐麻将游戏</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>Object</code> | <p>可选，覆盖内部默认配置，参考 launchApp 的参数要求</p> |



<a name="gotoLOLMGame"></a>

### `gotoLOLMGame(options)` 


**描述**：<p>拉起英雄联盟手游</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>Object</code> | <p>可选，覆盖内部默认配置，参考 launchApp 的参数要求</p> |



<a name="gotoTLBBGame"></a>

### `gotoTLBBGame(options)` 


**描述**：<p>拉起天龙八部游戏</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>Object</code> | <p>可选，覆盖内部默认配置，参考 launchApp 的参数要求</p> |



<a name="gotoTDGame"></a>

### `gotoTDGame(options)` 


**描述**：<p>拉起天涯明月刀游戏</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>Object</code> | <p>可选，覆盖内部默认配置，参考 launchApp 的参数要求</p> |



<a name="gotoX5MGame"></a>

### `gotoX5MGame(options)` 


**描述**：<p>拉起qq炫舞游戏</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>Object</code> | <p>可选，覆盖内部默认配置，参考 launchApp 的参数要求</p> |



