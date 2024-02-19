[[toc]]

## 引入

```ts
import { showLoading-web } from 't-comm';

// or

import { showLoading-web} from 't-comm/lib/toast/index';
```


## `showLoading-web(options)` 


**描述**：<p>显示loading Toast</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>string</code> \| <code>object</code> | <p>配置，传递字符串时候为message</p> |
| options.message | <code>string</code> | <p>内容</p> |
| options.duration | <code>number</code> | <p>展示时长(ms)，值为 0 时，toast 不会消失</p> |
| options.forbidClick | <code>boolean</code> | <p>是否禁止背景点击</p> |
| options.selector | <code>string</code> | <p>自定义选择器</p> |



