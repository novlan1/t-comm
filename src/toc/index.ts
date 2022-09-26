/**
 * @module toc
 */

/* eslint-disable @typescript-eslint/no-shadow */
export function drawToc({ fs, path, ignore, ignoreList }) {
  const curDir = path.resolve(process.cwd(), '.')
  const list = []

  /**
   * 获取相对当前路径的路径
   */
  function getRelativeDir(dir) {
    const realDir = path.resolve(curDir, dir)
    return realDir.replace(`${curDir}/`, '')
  }

  function sortList(aList) {
    aList.sort((a, b) => Number(b.isDir) - Number(a.isDir))
  }

  function getDirList(curDir, list, deep) {
    const res = fs.readdirSync(curDir)

    for (let i = 0; i < res.length; i++) {
      const item = res[i]
      const pathname = path.join(curDir, item)
      const relativePath = getRelativeDir(pathname)

      const stat = fs.lstatSync(pathname)

      const parsedItem = {
        name: item,
        pathname,
        relativePath,
        deep,
      }

      const ig = ignore().add(ignoreList)
      if (ig.ignores(relativePath)) {
        // eslint-disable-next-line no-continue
        continue
      }

      if (stat.isDirectory()) {
        const children = []
        list.push({
          ...parsedItem,
          isDir: true,
          children,
        })

        getDirList(pathname, children, deep + 1)
      } else {
        list.push({
          ...parsedItem,
          isDir: false,
        })
      }
    }
  }

  function markIndex(list) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      const isFirstIndex = i === 0
      const isLastIndex = i === list.length - 1

      item.isFirstIndex = isFirstIndex
      item.isLastIndex = isLastIndex

      if (item.children?.length) {
        item.children.forEach(it => {
          it.father = item
        })
        markIndex(item.children)
      }
    }
  }

  function fillEachIndent(item, tmp) {
    if (!item.father) return

    if (!item.father.isLastIndex) {
      tmp.str = `|   ${tmp.str}`
    } else {
      tmp.str = `    ${tmp.str}`
    }

    fillEachIndent(item.father, tmp)
  }

  function fillIndent(item, res) {
    if (!item.father) return

    const tmp = { str: '' }

    fillEachIndent(item, tmp)

    res.str += tmp.str
  }

  function drawEachToc(list, res) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      if (item.deep > 1) return

      fillIndent(item, res)

      const name = item.name.replace(/\.(js|html|ts|vue)$/, '')

      if (i === list.length - 1) {
        res.str += `└── ${name}`
      } else {
        res.str += `├─- ${name}`
      }
      res.str += '\n'

      if (item.children?.length) {
        drawEachToc(item.children, res)
      }
    }
  }

  function realDrawTOC(list) {
    const res = { str: '' }
    drawEachToc(list, res)
    return res.str
  }

  getDirList(curDir, list, 0)
  sortList(list)
  markIndex(list)

  const toc = realDrawTOC(list)

  fs.writeFileSync(path.resolve(curDir, 'README.md'), toc, {
    flag: 'a',
  })
}
