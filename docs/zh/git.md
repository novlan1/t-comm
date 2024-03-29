[[toc]]

## 引入

```ts
import {
  getGitCurBranch,
  getGitCommitMessage,
  getGitCommitInfo,
  getGitLastTag,
  getGitCommitsBeforeTag,
  getGitAuthor
} from 't-comm';

// or

import {
  getGitCurBranch,
  getGitCommitMessage,
  getGitCommitInfo,
  getGitLastTag,
  getGitCommitsBeforeTag,
  getGitAuthor
} from 't-comm/lib/git/index';
```


## `getGitCurBranch()` 


**描述**：<p>获取当前分支</p>

**参数**：

**返回**: <code>string</code><br>

<p>分支名称</p>

**示例**

```typescript
getBranch()

// => master
```
<a name="getGitCommitMessage"></a>

## `getGitCommitMessage(root, mergeCommit, splitMessage)` 


**描述**：<p>获取提交信息</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| root | <code>string</code> | <p>根路径</p> |
| mergeCommit | <code>boolean</code> | <p>是否包含 merge 的提交</p> |
| splitMessage | <code>boolean</code> | <p>是否去掉提交信息的前缀</p> |

**返回**: <code>string</code><br>

<p>提交信息</p>

**示例**

```ts
getGitCommitInfo()
// '优化一部分文档'
```
<a name="getGitCommitInfo"></a>

## `getGitCommitInfo(root, mergeCommit, splitMessage)` 


**描述**：<p>获取提交信息</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| root | <code>string</code> | <p>根路径</p> |
| mergeCommit | <code>boolean</code> | <p>是否包含 merge 的提交</p> |
| splitMessage | <code>boolean</code> | <p>是否去掉提交信息的前缀</p> |

**返回**: <code>Object</code><br>

<p>提交对象</p>

**示例**

```ts
getGitCommitInfo()
{
  author: 'novlan1',
  message: ' 优化一部分文档',
  hash: '0cb71f9',
  date: '2022-10-02 10:34:31 +0800',
  timeStamp: '1664678071',
  branch: 'master'
}
```
<a name="getGitLastTag"></a>

## `getGitLastTag()` 


**描述**：<p>获取最新tag</p>

**参数**：

**返回**: <code>string</code><br>

<p>最新tag</p>

<a name="getGitCommitsBeforeTag"></a>

## `getGitCommitsBeforeTag(tag)` 


**描述**：<p>获取tag到head的提交数目</p>

**参数**：


| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| tag | <code>string</code> | <p>git标签</p> |

**返回**: <code>string</code><br>

<p>tag至今的提交数目</p>

<a name="getGitAuthor"></a>

## `getGitAuthor(isPriorGit)` 


**描述**：<p>获取当前用户</p>

**参数**：


| 参数名 | 描述 |
| --- | --- |
| isPriorGit | <p>是否优先使用git用户信息</p> |

**返回**: <p>user</p>

