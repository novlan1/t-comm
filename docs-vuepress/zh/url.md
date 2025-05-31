<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import {
  extendUrlParams,
  filterUrlParams,
  formatUrlParams,
  decode,
  stringifyParams,
  addUrlParam,
  decode,
  stringifyParams,
  addUrlParam,
  addUrlParams,
  keepUrlParams,
  removeUrlParams,
  resolveUrlParams,
  getQueryObj,
  composeUrlQuery,
  encodeUrlParam,
  decodeUrlParam,
  getUrlPara
} from 't-comm';

// or
import {
  extendUrlParams,
  filterUrlParams,
  formatUrlParams,
  decode,
  stringifyParams,
  addUrlParam,
  decode,
  stringifyParams,
  addUrlParam,
  addUrlParams,
  keepUrlParams,
  removeUrlParams,
  resolveUrlParams,
  getQueryObj,
  composeUrlQuery,
  encodeUrlParam,
  decodeUrlParam,
  getUrlPara
} from 't-comm/lib/url/index';
```


### `extendUrlParams(url, removeKeyArr)` 


**描述**：<p>拼接额外参数</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| url | <code>string</code> | <p>地址</p> |
| removeKeyArr | <code>string</code> | <p>待添加的参数对象</p> |

**返回**: <p>重新拼接的地址</p>

**示例**

```typescript
const url1 = extendUrlParams('http://www.test.com?a=1&b=2&c=3#/detail?d=4', { e: 5 }); // 'http://www.test.com/#/detail?a=1&b=2&c=3&d=4&e=5'
```
<a name="filterUrlParams"></a>

### `filterUrlParams([params])` 


**描述**：<p>根据地址长度，进行过滤地址参数，允许指定保留特定参数</p>

**参数**：


| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| [params] | <code>object</code> | <code>{ limit: 1024 }</code> | <p>参数</p> |
| params.url | <code>number</code> |  | <p>待过滤地址，默认当前页面地址</p> |
| params.limit | <code>number</code> |  | <p>参数长度限制</p> |
| params.keepKey | <code>array</code> |  | <p>指定保留的参数，比如业务参数、框架参数（登录态、统计上报等）</p> |



<a name="formatUrlParams"></a>

### `formatUrlParams(url, keepParamsObj)` 


**描述**：<p>根据传入的参数，移除原来的所有参数，根据传入的 keepParamsObj 进行重新拼接地址，以 hash 模式返回</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| url | <code>string</code> | <p>地址</p> |
| keepParamsObj | <code>object</code> | <p>参数对象</p> |

**返回**: <p>只有传入参数的地址</p>

**示例**

```typescript
const url1 = formatUrlParams('http://www.test.com?a=1&b=2&c=3', { e: 5 }); // http://www.test.com/#/?e=5
const url2 = formatUrlParams('http://www.test.com?a=1&b=2&c=3#/detail?d=4', { f: 5 }); // http://www.test.com/#/detail?f=5
```
<a name="decode"></a>

### `decode(str)` 


**描述**：<p>多重解码。避免内嵌在外部时地址参数被编码，先进行URL解码再进行HTML字符实体解码</p>

**Docgen**:   
**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| str | <code>string</code> | <p>文本</p> |

**返回**: <p>解码后的文本</p>

<a name="stringifyParams"></a>

### `stringifyParams(params)` 


**描述**：<p>将参数对象转成字符串</p>

**Docgen**:   
**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>Object</code> | <p>参数对象</p> |



<a name="addUrlParam"></a>

### `addUrlParam(url, key, value)` 


**描述**：<p>小程序不支持URL对象，用字符串拼接方式添加
注意：已有相同key不支持覆盖，会重复添加</p>

**Docgen**:   
**参数**：


| 参数名 | 描述 |
| --- | --- |
| url | <p>输入url</p> |
| key | <p>键</p> |
| value | <p>值</p> |



<a name="decode"></a>

### `decode(str)` 


**描述**：<p>多重解码。避免内嵌在外部时地址参数被编码，先进行URL解码再进行HTML字符实体解码</p>

**Docgen**:   
**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| str | <code>string</code> | <p>文本</p> |

**返回**: <p>解码后的文本</p>

<a name="stringifyParams"></a>

### `stringifyParams(params)` 


**描述**：<p>将参数对象转成字符串</p>

**Docgen**:   
**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>Object</code> | <p>参数对象</p> |



<a name="addUrlParam"></a>

### `addUrlParam(url, key, value)` 


**描述**：<p>小程序不支持URL对象，用字符串拼接方式添加
注意：已有相同key不支持覆盖，会重复添加</p>

**Docgen**:   
**参数**：


| 参数名 | 描述 |
| --- | --- |
| url | <p>输入url</p> |
| key | <p>键</p> |
| value | <p>值</p> |



<a name="addUrlParams"></a>

### `addUrlParams(url, params, [shouldOverride])` 


**描述**：<p>为url添加参数</p>

**参数**：


| 参数名 | 类型 | 默认值 |
| --- | --- | --- |
| url | <code>string</code> |  | 
| params | <code>object</code> |  | 
| [shouldOverride] | <code>boolean</code> | <code>false</code> | 



<a name="keepUrlParams"></a>

### `keepUrlParams(url, removeKeyArr)` 


**描述**：<p>除保留参数外，一律移除</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| url | <code>string</code> | <p>地址</p> |
| removeKeyArr | <code>string</code> | <p>待保留的参数名集合</p> |

**返回**: <p>重新拼接的地址</p>

**示例**

```typescript
const url = keepUrlParams('http://www.test.com?a=1&b=2&c=3#/detail?d=4', ['a', 'd']); // 'http://www.test.com/#/detail?a=1&d=4'
```
<a name="removeUrlParams"></a>

### `removeUrlParams(url, removeKeyArr)` 


**描述**：<p>移除参数</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| url | <code>string</code> | <p>地址</p> |
| removeKeyArr | <code>string</code> | <p>待移除的参数名集合</p> |

**返回**: <p>重新拼接的地址</p>

**示例**

```typescript
const url = removeUrlParams('http://www.test.com/#/detail?a=1&b=2&c=3', ['a', 'b']); // 'http://www.test.com/#/detail?c=3'
const url2 = removeUrlParams('http://www.test.com?d=4&f=6#/detail?a=1&b=2&c=3', ['a', 'd']); // 'http://www.test.com/#/detail?b=2&c=3&f=6'
```
<a name="resolveUrlParams"></a>

### `resolveUrlParams([url], [key])` 


**描述**：<p>提取链接参数，兼容hash模式和history模式，以及拼接异常情况</p>

**参数**：


| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| [url] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | <p>地址</p> |
| [key] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | <p>可选，若不为空，则提取返回该key对应的参数值</p> |

**返回**: <p>地址参数对象，或者是指定参数值</p>

**示例**

```typescript
const url = 'https://igame.qq.com?name=mike&age=18#/index?from=china&home=china'
const params = resolveUrlParams(url); // { from: 'china', home: 'china', name: 'mike', age: 18 }
const paramsAge =  resolveUrlParams(url, 'age'); // 18
```
<a name="getQueryObj"></a>

### `getQueryObj(url)` 


**描述**：<p>url参数变对象</p>

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

### `composeUrlQuery(url, queryObj)` 


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

### `encodeUrlParam(obj)` 


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

### `decodeUrlParam(obj)` 


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
<a name="getUrlPara"></a>

### `getUrlPara(paraName, search)` 


**描述**：<p>获取 Url 参数</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| paraName | <code>string</code> | <p>参数 key</p> |
| search | <code>string</code> | <p>url search 部分</p> |

**返回**: <p>paraValue</p>

**示例**

```ts
getUrlPara('gender', '?gender=male&name=mike&feel=cold&age=18&from=test')
// male

getUrlPara('age', '?gender=male&name=mike&feel=cold&age=18&from=test')
// 18
```
