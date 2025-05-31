
### 引入

```ts
import { statisticsPages, statisticsComponent } from 't-comm';

// 不支持 tree-shaking 的项目
import { statisticsPages, statisticsComponent} from 't-comm/lib/pages-statistics/index';

// 只支持 ESM 的项目
import { statisticsPages, statisticsComponent} from 't-comm/es/pages-statistics/index';
```


### `statisticsPages()` 


**描述**：<p>统计页面个数</p>

**参数**：



**示例**

```typescript
statisticsPages('dist/build/mp-weixin/app.json')
```
<a name="statisticsComponent"></a>

### `statisticsComponent()` 


**描述**：<p>统计组件个数</p>

**参数**：



**示例**

```typescript
statisticsComponent('dist/build/mp-weixin');
```
