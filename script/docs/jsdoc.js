/* eslint-disable no-restricted-syntax */

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

function insertSeparator(index, source) {
  const parent = document.querySelector(`nav ul`)
  const dom = document.querySelector(`nav ul li:nth-child(${index + 1})`)
  const ele = document.createElement('span')
  ele.innerHTML = getSeparatorStr(source)
  ele.style = 'color: hsl(207, 1%, 60%);font-size: 12px;display: block;'
  ele.classList.add('nav-separator')
  parent.insertBefore(ele, dom)
}

function hiddenSeparatorWhenSearch() {
  document.querySelector('#nav-search').addEventListener('input', event => {
    const { value } = event.target
    if (value) {
      document.querySelectorAll('.nav-separator').forEach(item => {
        item.style.display = 'none'
      })
    } else {
      document.querySelectorAll('.nav-separator').forEach(item => {
        item.style.display = 'block'
      })
    }
  })
}

function hiddenFooter() {
  const footer = document.querySelector('footer')

  if (footer) {
    footer.style.display = 'none'
  }
}

function getSourceMap() {
  const LOCAL_STORAGE_KEY = 'T_COMM_SOURCE_MAP'
  if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  }
  const sourceMap = {}
  const nameSelector = '#main section article h4.name'
  const names = document.querySelectorAll(nameSelector)

  for (const item of names) {
    const detail = item.nextElementSibling
    const source = detail.querySelector('dd ul li a').innerHTML.trim()

    sourceMap[item.id] = getSourceFolder(source)
  }
  if (Object.keys(sourceMap).length) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sourceMap))
  }
  return sourceMap
}

function insertAllSeparator() {
  const navSelector = 'nav ul li a'

  const navs = document.querySelectorAll(navSelector)

  const sourceMap = getSourceMap()
  const navList = []

  for (const nav of navs) {
    const name = nav.innerHTML.trim()
    navList.push(name)
  }
  // console.log('navList: ', navList)
  // console.log('sourceMap: ', sourceMap)

  if (!Object.keys(sourceMap).length) {
    return
  }

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
}

document.addEventListener('DOMContentLoaded', () => {
  insertAllSeparator()
  hiddenFooter()
  hiddenSeparatorWhenSearch()
})
