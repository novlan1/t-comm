[[toc]]

## 引入方式

```ts
import {
  getQueryObj,
  composeUrlQuery,
  encodeUrlParam,
  decodeUrlParam
} from 't-comm';

// or

import {
  getQueryObj,
  composeUrlQuery,
  encodeUrlParam,
  decodeUrlParam
} from 't-comm/lib/url/index';
```


## `getQueryObj(url)` 


**描述**：<p>url参数变数组</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| url | <code>string</code> | <p>输入URL</p> |

**返回**: <code>Object</code><br>

<p>search对象</p>

**示例**

```typescript
const res = getQueryObj('https://igame.qq.com?name=mike&age=18&feel=cold&from=China');

console.log(res);
{
  name: 'mike',
  age: '18',
  feel: "cold",
  from: 'China',
}
```
<a name="composeUrlQuery"></a>

## `composeUrlQuery(url, queryObj)` 


**描述**：<p>组装<code>url</code>参数，将search参数添加在后面</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| url | <code>string</code> | <p>输入URL</p> |
| queryObj | <code>Object</code> | <p>search对象</p> |

**返回**: <code>string</code><br>

<p>组装后的url</p>

**示例**

```typescript
composeUrlQuery('https://baidu.com', {
  name: 'mike',
  feel: 'cold',
  age: '18',
  from: 'test',
});
// https://baidu.com?name=mike&feel=cold&age=18&from=test

composeUrlQuery('https://baidu.com?gender=male', {
  name: 'mike',
  feel: 'cold',
  age: '18',
  from: 'test',
});
// https://baidu.com?gender=male&name=mike&feel=cold&age=18&from=test
```
<a name="encodeUrlParam"></a>

## `encodeUrlParam(obj)` 


**描述**：<p>将对象字符串化</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| obj | <code>object</code> | <p>输入对象</p> |

**返回**: <code>string</code><br>

<p>字符串</p>

**示例**

```typescript
encodeUrlParam({a: 1})

// '%7B%22a%22%3A1%7D'
```
<a name="decodeUrlParam"></a>

## `decodeUrlParam(obj)` 


**描述**：<p>将字符串解码，与<code>encodeUrlParam</code>相对</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| obj | <code>string</code> | <p>输入字符串</p> |

**返回**: <code>object</code><br>

<p>对象</p>

**示例**

```typescript
decodeUrlParam('%7B%22a%22%3A1%7D')

// { a: 1 }
```
