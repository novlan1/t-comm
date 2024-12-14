[[toc]]

<h2>引入</h2>

```ts
import {
  parseCommentJson,
  readCommentJson,
  innerCopyDir,
  copyDir,
  deleteFolder,
  rmEmptyDir,
  copyFile,
  traverseFolder,
  execCommand,
  execCommandAll
} from 't-comm';

// or
import {
  parseCommentJson,
  readCommentJson,
  innerCopyDir,
  copyDir,
  deleteFolder,
  rmEmptyDir,
  copyFile,
  traverseFolder,
  execCommand,
  execCommandAll
} from 't-comm/lib/node/index';
```


## `parseCommentJson(content)` 


**描述**：<p>解析带注释的 json 文件</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| content | <p>原始文件内容</p> |

**返回**: <p>json数据</p>

<a name="readCommentJson"></a>

## `readCommentJson(file)` 


**描述**：<p>获取带注释的 json 文件内容</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| file | <p>文件路径</p> |

**返回**: <p>json数据</p>

<a name="innerCopyDir"></a>

## `innerCopyDir(src, dist)` 


**描述**：<p>复制目录、子目录，及其中的文件</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| src | <code>String</code> | <p>要复制的目录</p> |
| dist | <code>String</code> | <p>复制到目标目录</p> |



<a name="copyDir"></a>

## `copyDir(src, dist, callback)` 


**描述**：<p>拷贝目录以及子文件</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| src | <code>Object</code> | 
| dist | <code>Object</code> | 
| callback | <code>Object</code> | 



<a name="deleteFolder"></a>

## `deleteFolder(path)` 


**描述**：<p>删除目录</p>

**参数**：


| 参数名 | 类型 |
| --- | --- |
| path | <code>Object</code> | 



<a name="rmEmptyDir"></a>

## `rmEmptyDir(path, level)` 


**描述**：<p>递归删除空目录</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| path | <p>路径</p> |
| level | <p>层级</p> |



<a name="copyFile"></a>

## `copyFile(from, to)` 


**描述**：<p>拷贝文件</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| from | <code>Object</code> | <p>文件来自那里</p> |
| to | <code>Object</code> | <p>拷贝到那里</p> |



<a name="traverseFolder"></a>

## `traverseFolder(cb, path)` 


**描述**：<p>递归遍历文件夹，并执行某操作</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| cb | <code>function</code> | <p>回调参数</p> |
| path | <code>String</code> | <p>文件夹或文件路径</p> |



<a name="execCommand"></a>

## `execCommand(command, root, stdio)` 


**描述**：<p>nodejs 中调用 child_process.execSync 执行命令，
这个方法会对输出结果截断，只返回第一行内容</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| command | <code>string</code> | <p>命令</p> |
| root | <code>string</code> | <p>执行命令的目录</p> |
| stdio | <code>string</code> | <p>结果输出，默认为 pipe</p> |

**返回**: <code>string</code><br>

<p>命令执行结果</p>

<a name="execCommandAll"></a>

## `execCommandAll(command, root, stdio)` 


**描述**：<p>nodejs中调用 child_process.execSync 执行命令</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| command | <code>string</code> | <p>命令</p> |
| root | <code>string</code> | <p>执行命令的目录</p> |
| stdio | <code>string</code> | <p>结果输出，默认为 pipe</p> |

**返回**: <code>string</code><br>

<p>命令执行结果</p>

