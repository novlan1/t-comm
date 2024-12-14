[[toc]]

<h2>引入</h2>

```ts
import {
  removeCss,
  loadStyles,
  loadCssCode
} from 't-comm';

// or
import {
  removeCss,
  loadStyles,
  loadCssCode
} from 't-comm/lib/css/index';
```


## `removeCss(href)` 


**描述**：<p>移除CSS</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| href | <code>string</code> | <p>CSS链接</p> |



**示例**

```typescript
removeCss('https://xxx.css')
```
<a name="loadStyles"></a>

## `loadStyles(urls, urlClass)` 


**描述**：<p>加载多个样式文件，并在加载前移除具有相同类名的文件</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| urls | <code>array</code> | <p>外链地址列表</p> |
| urlClass | <code>string</code> | <p>外链类名</p> |



**示例**

```ts
loadStyles(['https://a.com/b.css'], 'load-style');
```
<a name="loadCssCode"></a>

## `loadCssCode(code, className)` 


**描述**：<p>加载样式代码块，会将样式代码包裹在 style 标签内，并加载到当前页面中</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | <code>string</code> | <p>样式代码</p> |
| className | <code>string</code> | <p>类名</p> |



**示例**

```ts
loadCssCode(
  '.press__cover { color: red; }',
  'load-css-code'
);
```
