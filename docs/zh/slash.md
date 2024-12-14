[[toc]]

<h2>引入</h2>

```ts
import {
  removeFirstSlash,
  removeLastSlash,
  removeFirstAndLastSlash
} from 't-comm';

// or
import {
  removeFirstSlash,
  removeLastSlash,
  removeFirstAndLastSlash
} from 't-comm/lib/slash/index';
```


## `removeFirstSlash([str])` 


**描述**：<p>移除第一个反斜杠</p>

**参数**：


| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| [str] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | <p>输入字符串</p> |

**返回**: <code>string</code><br>

<p>字符串</p>

**示例**

```ts
removeFirstSlash('/abc/ddd/')

'abc/ddd/'
```
<a name="removeLastSlash"></a>

## `removeLastSlash([str])` 


**描述**：<p>移除最后一个反斜杠</p>

**参数**：


| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| [str] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | <p>输入字符串</p> |

**返回**: <code>string</code><br>

<p>字符串</p>

**示例**

```ts
removeLastSlash('/abc/')

'/abc'
```
<a name="removeFirstAndLastSlash"></a>

## `removeFirstAndLastSlash([str])` 


**描述**：<p>移除第一个和最后一个反斜杠</p>

**参数**：


| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| [str] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | <p>输入字符串</p> |

**返回**: <code>string</code><br>

<p>字符串</p>

**示例**

```ts
removeFirstAndLastSlash('/abc/')

'abc'
```
