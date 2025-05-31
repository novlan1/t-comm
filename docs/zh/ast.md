
### 引入

```ts
import { parseReplaceConfig, replaceDependencies } from 't-comm';

// 不支持 tree-shaking 的项目
import { parseReplaceConfig, replaceDependencies} from 't-comm/lib/ast/index';

// 只支持 ESM 的项目
import { parseReplaceConfig, replaceDependencies} from 't-comm/es/ast/index';
```


### `parseReplaceConfig(configList)` 


**描述**：<p>解析替换配置</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| configList | <code>Array&lt;IReplaceConfig&gt;</code> | <p>配置列表</p> |

**返回**: <code>array</code><br>

<p>处理后的配置列表</p>

**示例**

```ts
parseReplaceConfig([{
  source: '',
  target: '',
}])
```
<a name="replaceDependencies"></a>

### `replaceDependencies(content, parsedConfigList, keyword)` 


**描述**：<p>替换引用</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| content | <code>string</code> | <p>输入内容</p> |
| parsedConfigList | <code>Array&lt;IParsedConfigItem&gt;</code> | <p>替换配置</p> |
| keyword | <code>string</code> | <p>提前返回关键词</p> |

**返回**: <code>string</code><br>

<p>处理后的内容</p>

**示例**

```ts
replaceDependencies('', [], '@tx/pmd-vue')
```
