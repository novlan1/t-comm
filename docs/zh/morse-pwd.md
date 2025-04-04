<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { MorsePwd , simpleMorse } from 't-comm';

// or
import { MorsePwd , simpleMorse} from 't-comm/lib/morse-pwd/index';
```


### MorsePwd 


**参数**：




* [MorsePwd](#MorsePwd)
    * [`new MorsePwd(options)`](#new_MorsePwd_new)
    * _instance_
        * [`.clear()`](#MorsePwd+clear)
    * _static_
        * [`.init(options)`](#MorsePwd.init) ⇒ <code>Object</code>

<a name="new_MorsePwd_new"></a>

#### `new MorsePwd(options)`
<p>摩斯密码初始化</p>


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | <p>选项</p> |
| options.pwd | <code>Array&lt;number&gt;</code> | <p>密码</p> |
| options.cb | <code>function</code> | <p>成功回调</p> |
| options.quiet | <code>Boolean</code> | <p>是否安静模式（不打印日志）</p> |
| options.holdTime | <code>number</code> | <p>等待多久后就恢复原位</p> |
| options.envType | <code>&#x27;H5&#x27;</code> \| <code>&#x27;h5&#x27;</code> \| <code>&#x27;mp&#x27;</code> \| <code>&#x27;MP&#x27;</code> | <p>环境类型</p> |
| options.selector | <code>String</code> | <p>h5模式下的选择器</p> |

<a name="MorsePwd+clear"></a>

#### `morsePwd.clear()`
<p>清除监听事件</p>

**Kind**: instance method of [<code>MorsePwd</code>](#MorsePwd)  
**Example**  
```typescript
beforeDestroy() {
  this.morsePwd.clear();
}
```
<a name="MorsePwd.init"></a>

#### `MorsePwd.init(options)` ⇒ <code>Object</code>
<p>初始化</p>

**Kind**: static method of [<code>MorsePwd</code>](#MorsePwd)  
**Returns**: <code>Object</code> - <p>MorsePwd实例</p>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | <p>选项</p> |
| options.pwd | <code>Array&lt;number&gt;</code> | <p>密码</p> |
| options.cb | <code>function</code> | <p>成功回调</p> |
| options.quiet | <code>Boolean</code> | <p>是否安静模式（不打印日志）</p> |
| options.holdTime | <code>number</code> | <p>等待多久后就恢复原位</p> |
| options.envType | <code>&#x27;H5&#x27;</code> \| <code>&#x27;h5&#x27;</code> \| <code>&#x27;mp&#x27;</code> \| <code>&#x27;MP&#x27;</code> | <p>环境类型</p> |
| options.selector | <code>String</code> | <p>h5模式下的选择器</p> |

**Example** *(小程序环境)*  
```typescript
<template>
  <div
    class="tip-match-header"
    /@longpress="onLongPressWrap"
    /@click.stop="onClickWrap"
  >
</template>

<script>
export default {
  data() {
    return {
      morsePwd: null,
    };
  },
  mounted() {
    this.morsePwd = MorsePwd.init({
      pwd: [1, 1, 1, 2, 2, 2, 1, 1, 1],
      cb: () => {
        this.showToast('hhh');
      },
      envType: 'MP',
    });
  },
  beforeDestroy() {
    this.morsePwd.clear();
  },
  methods: {
    onLongPressWrap() {
      this.morsePwd.longPress();
    },
    onClickWrap() {
      this.morsePwd.click();
    },
  }
}
</script>
```
**Example** *(H5环境)*  
```typescript
<script>
export default {
  data() {
    return {
      morsePwd: null,
    };
  },
  mounted() {
    this.morsePwd = MorsePwd.init({
      pwd: [1, 1, 1, 2, 2, 2, 1, 1, 1],
      cb: () => {
        this.showToast('xxx');
      },
      selector: '#app',
      envType: 'H5',
    });
  },
  beforeDestroy() {
    this.morsePwd.clear();
  },
}
</script>
```
<a name="simpleMorse"></a>

### `simpleMorse(param)` 


**描述**：<p>简单的摩斯密码，只有点击</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| param | <code>object</code> | <p>参数</p> |



**示例**

```ts
simpleMorse({
  target: 5, // 目标值
  callback: () => console.log('test'),
  timeout: 300, // 超时取消
  debug: false,
})
```
