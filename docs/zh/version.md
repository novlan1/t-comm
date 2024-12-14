[[toc]]

<h2>引入</h2>

```ts
import { getPreReleaseVersion, compareVersion } from 't-comm';

// or
import { getPreReleaseVersion, compareVersion} from 't-comm/lib/version/index';
```


## `getPreReleaseVersion(key)` 


**描述**：<p>生成 alpha、beta 等这些预发布的版本</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| key | <p>关键词</p> |

**返回**: <p>生成的版本</p>

<a name="compareVersion"></a>

## `compareVersion(v1, v2)` 


**描述**：<p>版本比较</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| v1 | <code>string</code> | <p>第一个版本</p> |
| v2 | <code>string</code> | <p>第二个版本</p> |

**返回**: <p>比较结果，1 前者大，-1 后者大，0 二者相同</p>

**示例**

```ts
compareVersion('1.1.1', '1.2.1')
// -1
```
