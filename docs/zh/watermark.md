<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { createWatcherMark } from 't-comm';

// or
import { createWatcherMark} from 't-comm/lib/watermark/index';
```


### `createWatcherMark(params)` 


**描述**：<p>canvas 实现 watermark</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| params | <code>object</code> | <p>参数</p> |
| params.container | <code>HTMLElement</code> | <p>容器</p> |
| params.width | <code>number</code> | <p>图片宽</p> |
| params.height | <code>number</code> | <p>图片高</p> |
| params.textAlign | <code>string</code> | <p>同 ctx.textAlign</p> |
| params.textBaseline | <code>string</code> | <p>同 ctx.textBaseline</p> |
| params.font | <code>string</code> | <p>同 ctx.font</p> |
| params.fillStyle | <code>string</code> | <p>同 ctx.fillStyle</p> |
| params.content | <code>string</code> | <p>内容</p> |
| params.rotate | <code>number</code> | <p>旋转角度</p> |
| params.zIndex | <code>number</code> | <p>层级</p> |



**示例**

```ts
const rtx = 'pony';

createWatcherMark({
  content: rtx,
  width: '300',
  height: '300',
  textAlign: 'center',
  textBaseline: 'middle',
  font: '25px Microsoft Yahei',
  fillStyle: 'rgba(184, 184, 184, 0.3)',
  rotate: '-50',
  zIndex: 1000,
});
```
