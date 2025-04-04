<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { openLocationInMp, openLocationInH5 } from 't-comm';

// or
import { openLocationInMp, openLocationInH5} from 't-comm/lib/open-location/index';
```


### `openLocationInMp(param)` 


**描述**：<p>打开地图，查看位置</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| param | <p>参数</p> |

**返回**: <p>查看Promise</p>

**示例**

```ts
openLocationInMp({
  lat,
  lng,
  name,
  address,
});
```
<a name="openLocationInH5"></a>

### `openLocationInH5(param)` 


**描述**：<p>打开地图，查看位置</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| param | <p>参数</p> |

**返回**: <p>查看Promise</p>

**示例**

```ts
openLocationInH5({
  lat,
  lng,
  name,
  address,

  context: this,
  route: '/map'
});
```
