[[toc]]

<h2>引入</h2>

```ts
import { rgb2hsv, hsv2rgb } from 't-comm';

// or
import { rgb2hsv, hsv2rgb} from 't-comm/lib/color/index';
```


## `rgb2hsv()` 


**描述**：<p>Converts an RGB color value to HSV
<em>Assumes:</em> r, g, and b are contained in the set [0, 255] or [0, 1].
<em>Returns:</em> { h, s, v } in [0,1]</p>

**参数**：



<a name="hsv2rgb"></a>

## `hsv2rgb()` 


**描述**：<p>Converts an HSV color value to RGB.
<em>Assumes:</em> h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100].
<em>Returns:</em> { r, g, b } in the set [0, 255]</p>

**参数**：



