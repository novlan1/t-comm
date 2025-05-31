<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import {
  showToast,
  showSuccess,
  showFail,
  clearToast,
  showLoading,
  dismissLoading,
  Toast
} from 't-comm';

// or
import {
  showToast,
  showSuccess,
  showFail,
  clearToast,
  showLoading,
  dismissLoading,
  Toast
} from 't-comm/lib/toast/index';
```


### `showToast` 


**描述**：<p>显示普通Toast</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| text | <p>文案</p> |
| duration | <p>显示时间，默认2秒</p> |



**示例**

```ts
Toast.show('文本', 3000);
```
<a name="showSuccess"></a>

### `showSuccess` 


**描述**：<p>显示成功样式Toast（toast带√样式）</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| text | <p>文案</p> |
| duration | <p>显示时间，默认2秒</p> |



**示例**

```ts
Toast.showSuccess('文本', 3000);
```
<a name="showFail"></a>

### `showFail` 


**描述**：<p>显示失败样式 Toast(toast带！样式)</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| text | <p>文案</p> |
| duration | <p>显示时间，默认2秒</p> |



**示例**

```ts
Toast.showFail('文本', 3000);
```
<a name="clearToast"></a>

### `clearToast` 


**描述**：<p>清除（隐藏）上一个toast</p>

**参数**：



**示例**

```ts
Toast.clear();

clearToast();
```
<a name="showLoading"></a>

### `showLoading` 


**描述**：<p>显示loading Toast</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>string</code> \| <code>object</code> | <p>配置，传递字符串时候为message</p> |
| options.message | <code>string</code> | <p>内容</p> |
| options.duration | <code>number</code> | <p>展示时长(ms)，值为 0 时，toast 不会消失</p> |
| options.forbidClick | <code>boolean</code> | <p>是否禁止背景点击</p> |
| options.selector | <code>string</code> | <p>自定义选择器</p> |



**示例**

```ts
Toast.showLoading('文本');

Toast.showLoading({
  message: '文本',
  zIndex: 1000,
});
```
<a name="dismissLoading"></a>

### `dismissLoading` 


**描述**：<p>隐藏loading toast</p>

**参数**：



**示例**

```ts
Toast.dismissLoading();
```
<a name="Toast"></a>

### `Toast` 


**描述**：<p>Toast 对象</p>

**参数**：



**示例**

```ts
Toast.show('文本')
```
