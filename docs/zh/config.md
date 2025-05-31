
### 引入

```ts
import {
  initConfig,
  getConfig,
  setConfig
} from 't-comm';

// 不支持 tree-shaking 的项目
import {
  initConfig,
  getConfig,
  setConfig
} from 't-comm/lib/config/index';

// 只支持 ESM 的项目
import {
  initConfig,
  getConfig,
  setConfig
} from 't-comm/es/config/index';
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
