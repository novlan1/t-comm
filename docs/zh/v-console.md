[[toc]]

## 引入

```ts
import {
  V_CONSOLE_STATE,
  genVConsole,
  showVConsole,
  closeVConsole,
  toggleVConsole,
  checkAndShowVConsole,
  loadVConsole
} from 't-comm';

// or

import {
  V_CONSOLE_STATE,
  genVConsole,
  showVConsole,
  closeVConsole,
  toggleVConsole,
  checkAndShowVConsole,
  loadVConsole
} from 't-comm/lib/v-console/index';
```


## `V_CONSOLE_STATE` 


**描述**：<p>vConsole 当前展示状态</p>

**参数**：



<a name="genVConsole"></a>

## `genVConsole(params)` 


**描述**：<p>生成 v-console
有几种情况：</p>
<ol>
<li>不显示</li>
<li>立即显示</li>
<li>异步判断后，确定是否显示</li>
</ol>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| params | <p>参数</p> |



**示例**

```ts
genVConsole({
  immediateShow: isShowVConsole === 'true'
    || isTestEnv()
    || noDelay === V_CONSOLE_NO_DELAY.VALUE,
  hide: isShowVConsole === 'false' || !!UserInfo.tipUid(),
  asyncConfirmFunc: checkIsDevList,
});
```
<a name="showVConsole"></a>

## `showVConsole()` 


**描述**：<p>展示 vConsole</p>

**参数**：



**示例**

```ts
showVConsole()
```
<a name="closeVConsole"></a>

## `closeVConsole()` 


**描述**：<p>关闭 vConsole</p>

**参数**：



**示例**

```ts
closeVConsole()
```
<a name="toggleVConsole"></a>

## `toggleVConsole()` 


**描述**：<p>切换展示 vConsole</p>

**参数**：

**返回**: <p>是否展示</p>

**示例**

```ts
toggleVConsole()
```
<a name="checkAndShowVConsole"></a>

## `checkAndShowVConsole()` 


**描述**：<p>检查 localStorage 设置，并展示vConsole</p>

**参数**：



**示例**

```ts
checkAndShowVConsole()
```
<a name="loadVConsole"></a>

## `loadVConsole([options], [plugins])` 


**描述**：<p>加载 vConsole</p>

**参数**：


| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | <p>vConsole 选项</p> |
| [plugins] | <code>Array&lt;string&gt;</code> | <code>[]</code> | <p>插件列表</p> |

**返回**: <code>Promise.&lt;Object&gt;</code><br>

<p>vConsole 实例</p>

**示例**

```ts
loadVConsole()
```
