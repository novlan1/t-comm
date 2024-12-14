[[toc]]

<h2>引入</h2>

```ts
import { getMatchListFromReg, getPreReleaseTag } from 't-comm';

// or
import { getMatchListFromReg, getPreReleaseTag} from 't-comm/lib/base/regexp/index';
```


## `getMatchListFromReg(content, reg)` 


**描述**：<p>匹配正则，获取匹配到的列表</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| content | <code>string</code> | <p>输入内容</p> |
| reg | <code>RegExp</code> | <p>正则</p> |

**返回**: <p>匹配列表</p>

**示例**

```ts
getMatchListFromReg(content, /emit\('([^',]+)'/g);

// ['start', 'end']
```
<a name="getPreReleaseTag"></a>

## `getPreReleaseTag(version)` 


**描述**：<p>获取预发布版本标签，比如 alpha, beta</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| version | <code>string</code> | <p>版本号</p> |

**返回**: <p>标签</p>

**示例**

```ts
getPreReleaseTag('1.2.2-beta.0')
// beta
```
