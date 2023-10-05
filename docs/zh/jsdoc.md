[[toc]]

## 引入方式

```ts
import { JsDocHandler  } from 't-comm';

// or

import { JsDocHandler } from 't-comm/lib/jsdoc/index';
```


## JsDocHandler 


**参数**：




* [JsDocHandler](#JsDocHandler)
    * [`new JsDocHandler(options)`](#new_JsDocHandler_new)
    * [`.init(options)`](#JsDocHandler.init) ⇒ <code>object</code>

<a name="new_JsDocHandler_new"></a>

### `new JsDocHandler(options)`
<p>处理jsdoc的脚本</p>
<ol>
<li>增加导航栏的分隔符</li>
<li>增加css</li>
<li>处理footer</li>
</ol>


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | <p>配置</p> |
| [options.docsPath] | <code>string</code> | <p>文档所在目录位置，默认为<code>./docs</code></p> |
| [options.author] | <code>string</code> | <p>作者，默认为空</p> |
| [options.extraCss] | <code>string</code> | <p>额外插入的css，默认为<code>.nav-separator</code>的一些样式</p> |
| [options.extraScript] | <code>string</code> | <p>额外插入的script</p> |
| [options.navHandler] | <code>function</code> | <p>处理API所在文件的方法</p> |
| [options.isHandleNav] | <code>boolean</code> | <p>是否处理导航栏，即插入文件名进行分隔，默认为false</p> |

<a name="JsDocHandler.init"></a>

### `JsDocHandler.init(options)` ⇒ <code>object</code>
<p>初始化并运行</p>

**Kind**: static method of [<code>JsDocHandler</code>](#JsDocHandler)  
**Returns**: <code>object</code> - <p>JsDocHandler实例</p>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | <p>配置</p> |
| [options.docsPath] | <code>string</code> | <p>文档所在目录位置，默认为<code>./docs</code></p> |
| [options.author] | <code>string</code> | <p>作者，默认为空</p> |
| [options.extraCss] | <code>string</code> | <p>额外插入的css，默认为<code>.nav-separator</code>的一些样式</p> |
| [options.navHandler] | <code>string</code> | <p>处理API所在文件的方法</p> |
| [options.isHandleNav] | <code>boolean</code> | <p>是否处理导航栏，即插入文件名进行分隔，默认为false</p> |

**Example**  
```typescript
JsDocHandler.init({
  author: 'novlan1',
  docsPath: './docs',
  extraCss: '.some-class{}',
  navHandler(nav) {

  }
})
```
