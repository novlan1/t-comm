/**
 * @module gen-version
 */

/**
 * 生成Version
 * @param param - path/fs/standardVersion等
 * @example
 * ```ts
 * genVersion({
 *   fs: require('fs'),
 *   path: require('path'),
 *   standardVersion: require('standard-version'),
 *   execSync: require('child_process').execSync,
 *   root: process.cwd()
 * })
 * ```
 */

export function genVersion({ path, fs, execSync, root }) {
  if (!root) {
    console.log('\x1b[33m%s\x1b[0m', '请输入 root，可为 process.cwd()')
    return
  }

  const INTERVAL_TIME = 24 * 60 * 60 * 1000

  function execCommand(command) {
    return (
      execSync(command, {
        cwd: root,
        encoding: 'utf-8',
        stdio: 'pipe',
      })
        .split('\n')[0]
        ?.trim() || ''
    )
  }

  function getLastTag() {
    const fakeFirstTag = execCommand('git tag -l')
    console.log('\x1B[32m%s\x1B[0m', `fakeFirstTag 为 ${fakeFirstTag}`)
    if (!fakeFirstTag) return ''

    // const command = 'git tag | head -1'
    const command = 'git describe --abbrev=0'

    const tag = execCommand(command)
    return tag
  }

  function getCommitsBeforeTag(tag) {
    const command = `git log ${tag}...HEAD --no-merges --oneline | wc -l`
    const commits = execCommand(command)
    return commits
  }

  function getTagTime(tag) {
    const command = `git log -1 --format=%ai ${tag} | cat`
    const tagTime = execCommand(command)
    return tagTime
  }

  function getTimeStampFromDate(date) {
    return new Date(date).getTime()
  }

  function doRelease({ isFirstRelease }) {
    if (isFirstRelease) {
      execCommand('npx standard-version --first-release')
    } else {
      execCommand('npx standard-version --release-as patch')
    }
  }

  const gitPath = path.resolve(root, '.git')
  if (!fs.existsSync(gitPath)) {
    console.log('\x1b[33m%s\x1b[0m', `未找到 ${gitPath} ，不是 Git 目录。`)
    return
  }

  const tag = getLastTag()
  console.log('\x1B[32m%s\x1B[0m', `tag 为 ${tag}`)

  if (!tag) {
    doRelease({ isFirstRelease: true })
    // eslint-disable-next-line consistent-return
    return true
  }

  const tagDate = getTagTime(tag)
  console.log('\x1B[32m%s\x1B[0m', `tagDate 为 ${tagDate}`)

  const commits = getCommitsBeforeTag(tag)
  console.log('\x1B[32m%s\x1B[0m', `commits 为 ${commits}`)

  if (commits < 1) {
    console.log('\x1b[33m%s\x1b[0m', `commits 为 ${commits}，小于 1`)
    return
  }

  const tagTimeStamp = getTimeStampFromDate(tagDate)
  console.log('\x1B[32m%s\x1B[0m', `tagTimeStamp 为 ${tagTimeStamp}`)

  if (Date.now() - tagTimeStamp < INTERVAL_TIME) {
    console.log('\x1b[33m%s\x1b[0m', `间隔小于${INTERVAL_TIME}`)
    return
  }

  doRelease({ isFirstRelease: false })
  // eslint-disable-next-line consistent-return
  return true
}
