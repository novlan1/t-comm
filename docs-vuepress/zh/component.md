<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import {
  addEmitsForComponent,
  addNameForComponent,
  getFullCompName,
  getPureCompName,
  extractClass,
  extractEvent,
  extractProps
} from 't-comm';

// or
import {
  addEmitsForComponent,
  addNameForComponent,
  getFullCompName,
  getPureCompName,
  extractClass,
  extractEvent,
  extractProps
} from 't-comm/lib/component/index';
```


### `addEmitsForComponent(filePath, [fileContent])` 


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

### `addNameForComponent(filePath, componentName)` 


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
<a name="getFullCompName"></a>

### `getFullCompName(name, prefix)` 


**描述**：<p>获取组件全称</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| name | <p>组件名称</p> |
| prefix | <p>前缀</p> |

**返回**: <p>全称</p>

**示例**

```ts
getFullCompName('swiper-item', 'press-')
getFullCompName('press-swiper-item', 'press-')

// press-swiper-item
```
<a name="getPureCompName"></a>

### `getPureCompName(name, prefix)` 


**描述**：<p>获取组件简称</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| name | <p>组件名称</p> |
| prefix | <p>前缀</p> |

**返回**: <p>简称</p>
<pre class="prettyprint source lang-ts"><code>getPureCompName('press-swiper-item', 'press-')
getPureCompName('swiper-item', 'press-') // swiper-item
</code></pre>

<a name="extractClass"></a>

### `extractClass(params)` 


**描述**：<p>提取 Vue 组件的 class</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>obj</code> | <p>参数</p> |
| params.filePath | <code>string</code> | <p>源文件地址</p> |
| [params.targetFilePath] | <code>string</code> | <p>输出文件地址</p> |
| [params.extractRegexp] | <code>Regexp</code> | <p>提取正则</p> <pre class="prettyprint source lang-ts"><code>extractClass({   filePath: 'xxx.vue', }) </code></pre> |



<a name="extractEvent"></a>

### `extractEvent(params)` 


**描述**：<p>提取 Vue 组件的 event</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>obj</code> | <p>参数</p> |
| params.filePath | <code>string</code> | <p>源文件地址</p> |
| [params.targetFilePath] | <code>string</code> | <p>输出文件地址</p> |
| [params.extractRegexp] | <code>Regexp</code> | <p>提取正则</p> <pre class="prettyprint source lang-ts"><code>extractEvent({   filePath: 'xxx.vue', }) </code></pre> |



<a name="extractProps"></a>

### `extractProps(params)` 


**描述**：<p>提取 Vue 组件的 props</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>obj</code> | <p>参数</p> |
| params.filePath | <code>string</code> | <p>源文件地址</p> |
| [params.targetFilePath] | <code>string</code> | <p>输出文件地址</p> |
| [params.extractRegexp] | <code>Regexp</code> | <p>提取正则</p> <pre class="prettyprint source lang-ts"><code>extractProps({   filePath: 'xxx.vue', }) </code></pre> |



