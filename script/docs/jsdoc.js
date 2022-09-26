function getSourceFolder(source) {
  const list = source.split('/')
  return list.slice(0, list.length - 1).join('/')
}

function getSeparatorStr(content) {
  const maxLen = 14
  const lastLen = parseInt(maxLen - content.length / 2, 10)
  const fill = Array.from({ length: lastLen })
    .map(() => '-')
    .join('')

  return `${fill}   ${content}   ${fill}`
}

/* eslint-disable no-restricted-syntax */
function insertSeparator(index, source) {
  const parent = document.querySelector(`nav ul`)
  const dom = document.querySelector(`nav ul li:nth-child(${index + 1})`)
  const ele = document.createElement('span')
  ele.innerHTML = getSeparatorStr(source)
  ele.style = 'color: hsl(207, 1%, 60%);font-size: 12px;'
  parent.insertBefore(ele, dom)
}

document.addEventListener('DOMContentLoaded', () => {
  const nameSelector = '#main section article h4.name'
  const navSelector = 'nav ul li a'

  const names = document.querySelectorAll(nameSelector)
  const navs = document.querySelectorAll(navSelector)

  const sourceList = []
  const sourceMap = {}
  const navList = []

  for (const item of names) {
    const detail = item.nextElementSibling
    const source = detail.querySelector('dd ul li a').innerHTML.trim()
    sourceList.push({
      name: item.id,
      source,
    })
    sourceMap[item.id] = getSourceFolder(source)
  }

  for (const nav of navs) {
    const name = nav.innerHTML.trim()
    navList.push(name)
  }
  console.log('sourceList: ', sourceList)
  console.log('navList: ', navList)
  console.log('sourceMap: ', sourceMap)

  for (let i = navList.length - 1; i >= 1; i--) {
    const cur = navList[i]
    const source = sourceMap[cur]
    const next = navList[i - 1]
    const nextSource = sourceMap[next]
    if (source !== nextSource) {
      insertSeparator(i, source)
    }
  }
  insertSeparator(0, sourceMap[navList[0]])
})
