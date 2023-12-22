[[toc]]

## 引入

```ts
import {
  getCookie,
  setCookie,
  clearCookie,
  clearAll
} from 't-comm';

// or

import {
  getCookie,
  setCookie,
  clearCookie,
  clearAll
} from 't-comm/lib/cookie/index';
```


## `getCookie(key)` 


**描述**：<p>获取cookie</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| key | <code>string</code> | <p>cookie键值</p> |

**返回**: <code>string</code><br>

<p>cookie值</p>

**示例**

```typescript
const res = getCookie('name')

// => mike
```
<a name="setCookie"></a>

## `setCookie(key, value, [hours])` 


**描述**：<p>设置cookie</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| key | <code>string</code> | <p>cookie键值</p> |
| value | <code>string</code> | <p>cookie值</p> |
| [hours] | <code>number</code> | <p>过期时间，单位小时</p> |



**示例**

```typescript
setCookie('name', 'mike')
```
<a name="clearCookie"></a>

## `clearCookie(key)` 


**描述**：<p>清除cookie</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| key | <code>string</code> | <p>cookie键</p> |



**示例**

```typescript
clearCookie('name');
```
<a name="clearAll"></a>

## `clearAll(domain)` 


**描述**：<p>清除全部cookie</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| domain | <code>string</code> | <p>域名</p> |



**示例**

```typescript
clearAll()
```
