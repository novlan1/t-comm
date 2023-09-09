[[toc]]

## `loader` 


**描述**：<p>加载js文件</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| src | <code>String</code> | <p>js文件路径</p> |
| callback | <code>function</code> \| <code>Object</code> | <p>加载回调</p> |
| charset | <code>String</code> | <p>指定js的字符集</p> |
| context | <code>Object</code> | <p>Callback context</p> |




* [`loader`](#loader)
    * [`~privateFinish()`](#loader..privateFinish) ⇒ <code>void</code>
    * [`~privateError()`](#loader..privateError) ⇒ <code>void</code>

<a name="loader..privateFinish"></a>

### `loader~privateFinish()` ⇒ <code>void</code>
<p>Final handler for error or completion.</p>
<p><strong>Note</strong>: Will only be called <em>once</em>.</p>

**Kind**: inner method of [<code>loader</code>](#loader)  
<a name="loader..privateError"></a>

### `loader~privateError()` ⇒ <code>void</code>
<p>Error handler</p>

**Kind**: inner method of [<code>loader</code>](#loader)  
<a name="loadCSS"></a>

## `loadCSS(url)` 


**描述**：<p>动态加载CSS</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| url | <code>string</code> | <p>CSS链接</p> |



**示例**

```typescript
loadCSS('xxx.css')
```
