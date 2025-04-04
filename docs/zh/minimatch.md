<h3 style="margin-bottom: -1rem;">目录</h3>

[[toc]]

<h3>引入</h3>

```ts
import { getAuditorFromRainbowConfig } from 't-comm';

// or
import { getAuditorFromRainbowConfig} from 't-comm/lib/minimatch/index';
```


### `getAuditorFromRainbowConfig(params)` 


**描述**：<p>获取审核人</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| params | <p>参数</p> |

**返回**: <p>审核人</p>

**示例**

```ts
getAuditorFromRainbowConfig({
  rainbowConfig: { "pmd-mobile/match/*": "gg", "pmd-mobile/convert-cross": "gg" },
  checkKeyList: [ 'pmd-mobile/match/gp/gp-hor', 'pmd-mobile/match/gp' ],
  minimatch: require('minimatch'),
  minimatchKey: 'pmd-mobile/match/gp',
})
```
