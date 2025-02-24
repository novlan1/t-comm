[[toc]]

<h2>引入</h2>

```ts
import {
  checkNodeEnv,
  checkUAIsIOS,
  getEnvUAType
} from 't-comm';

// or
import {
  checkNodeEnv,
  checkUAIsIOS,
  getEnvUAType
} from 't-comm/lib/env/index';
```


## `checkNodeEnv` 


**描述**：<p>检查是否是node环境</p>

**参数**：

**返回**: <code>boolean</code><br>

<p>是否node环境</p>

**示例**

```typescript
const res = checkNodeEnv();
  // false
```
<a name="checkUAIsIOS"></a>

## `checkUAIsIOS()` 


**描述**：<p>检查是否是ios环境</p>

**参数**：

**返回**: <code>boolean</code><br>

<p>是否是ios环境</p>

**示例**

```typescript
checkUAIsIOS()

// => true
```
<a name="getEnvUAType"></a>

## `getEnvUAType()` 


**描述**：<p>获取useragent类型</p>

**参数**：

**返回**: <code>object</code><br>

<p>useragent的map</p>

**示例**

```typescript
getEnvUAType()

// =>
{
  isWeixin: false,
  isWorkWeixin: false,
  isQQ: false,
  isPvpApp: false,
  isTipApp: false,
  isAndroid: false,
  isIos: true,
  isIOS: true,
  isMsdk: false,
  isMsdkV5: false,
  isSlugSdk: false,
  isInGame: false,
  isGHelper: false,
  isGHelper20004: false,
  isMiniProgram: false,
  isLolApp: false,
  isWindowsPhone: false,
  isSymbian: false,
  isPc: true,
};
```
