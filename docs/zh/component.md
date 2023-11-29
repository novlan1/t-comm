[[toc]]

## 引入方式

```ts
import {
  addEmitsForComponent,
  addNameForComponent,
  extractEvent,
  extractProps
} from 't-comm';

// or

import {
  addEmitsForComponent,
  addNameForComponent,
  extractEvent,
  extractProps
} from 't-comm/lib/component/index';
```


## `addEmitsForComponent(filePath, [fileContent])` 


**描述**：<p>为 Vue 组件添加 emits 属性</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| filePath | <code>string</code> | <p>组件地址</p> |
| [fileContent] | <code>string</code> | <p>组件内容</p> |

**返回**: <code>string</code><br>

<p>新的组件内容</p>

**示例**

```ts
addNameForComponent('xxx.vue');
```
<a name="addNameForComponent"></a>

## `addNameForComponent(filePath, componentName)` 


**描述**：<p>为 Vue 组件添加、修正 name 属性</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| filePath | <code>string</code> | <p>组件地址</p> |
| componentName | <code>string</code> | <p>组件名称</p> |

**返回**: <code>string</code><br>

<p>新的组件内容</p>

**示例**

```ts
addNameForComponent('xxx.vue', 'PressUploader');
```
<a name="extractEvent"></a>

## `extractEvent(params)` 


**描述**：<p>提取 Vue 组件的 event</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>obj</code> | <p>参数</p> |
| params.filePath | <code>string</code> | <p>源文件地址</p> |
| [params.targetFilePath] | <code>string</code> | <p>输出文件地址</p> |
| [params.extractRegexp] | <code>Regexp</code> | <p>提取正则</p> <pre class="prettyprint source lang-ts"><code>extractEvent({   filePath: 'xxx.vue', }) </code></pre> |



<a name="extractProps"></a>

## `extractProps(params)` 


**描述**：<p>提取 Vue 组件的 props</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>obj</code> | <p>参数</p> |
| params.filePath | <code>string</code> | <p>源文件地址</p> |
| [params.targetFilePath] | <code>string</code> | <p>输出文件地址</p> |
| [params.extractRegexp] | <code>Regexp</code> | <p>提取正则</p> <pre class="prettyprint source lang-ts"><code>extractProps({   filePath: 'xxx.vue', }) </code></pre> |



