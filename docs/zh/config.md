<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import {
  initConfig,
  getConfig,
  setConfig
} from 't-comm';

// or
import {
  initConfig,
  getConfig,
  setConfig
} from 't-comm/lib/config/index';
```


### `initConfig(config)` 


**描述**：<p>初始化config</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| config | <code>ConfigType</code> | 



<a name="getConfig"></a>

### `getConfig(name)` 


**描述**：<p>获取config</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| name | <code>string</code> | 

**返回**: <code>\*</code><br>

<p>{*}</p>

**示例**

```typescript
getConfig('login.loginType')
getConfig('game')
```
<a name="setConfig"></a>

### `setConfig(name, value)` 


**描述**：<p>设置config</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| name | <code>string</code> | 
| value | <code>\*</code> | 



**示例**

```typescript
setConfig('login.loginType','WXPC')
```
