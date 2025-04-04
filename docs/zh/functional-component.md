<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { showFunctionalComponent, showFunctionalComponentQueue } from 't-comm';

// or
import { showFunctionalComponent, showFunctionalComponentQueue} from 't-comm/lib/functional-component/index';
```


### `showFunctionalComponent(vueInstance, dialogComponent, dialogOptions)` 


**描述**：<p>函数式调用组件</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| vueInstance | <code>Object</code> | <p>页面Vue实例（一般为页面this）</p> |
| dialogComponent | <code>Object</code> | <p>弹窗组件，支持静态导入import Dialog from '..'和动态导入const Dialog = () =&gt; import('...')两种形式</p> |
| dialogOptions | <code>Object</code> | <p>弹窗参数Object</p> |

**返回**: <p>Promise 回调组件实例</p>

**示例**

```ts
function showDateTimePicker(this: any, {
  onConfirm,
  currentDate,
}) {
  showFunctionalComponent(
    this, () => import('src/local-component/ui/gp-match-horz/date-picker'),
    {
      currentDate,
      minDate: new Date(new Date().getTime() + 30 * 60 * 1000),
      onClickConfirm: (date) => {
        const dateNumber =  Math.floor(date.getTime());
        onConfirm(date, dateNumber);
      },
    },
  );
}
```
<a name="showFunctionalComponentQueue"></a>

### `showFunctionalComponentQueue(context, dialogList, dialogComponent)` 


**描述**：<p>根据弹窗队列（dialogList）依次弹出</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| context | <code>object</code> | <p>Vue 页面 Vue实例上下文（一般为页面this、window.app、new Vue() 等）</p> |
| dialogList | <code>array</code> | <p>弹窗列表</p> |
| dialogComponent | <code>Object</code> | <p>弹窗组件，支持静态导入 import Dialog from '..' 和动态导入 const Dialog = () =&gt; import('...') 两种形式</p> |



