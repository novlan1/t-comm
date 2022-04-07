/**
 * url参数变数组
 * @param {*} url
 * @returns {Object} search对象
 * 
 * @example
   ```ts
  const res = getQueryObj('https://igame.qq.com?name=mike&age=18&feel=cold&from=china');
  /**
   * {
   *   name: 'mike',
   *   age: '18',
   *   feel: "cold",
   *   from: 'china',
   * }
   * /
  ```
 */
export function getQueryObj(url) {
  const query = {}

  let qs = url.substr(url.indexOf('?') > -1 ? url.indexOf('?') + 1 : url.length)
  let kvs

  qs = qs.split('&')
  qs.forEach(item => {
    kvs = item.split('=')
    if (kvs.length === 2) {
      const value = kvs[1]
      query[kvs[0]] = value
    }
  })

  return query
}

/**
 * 组装`url`参数，将search参数添加在后面
 * @param {string} url
 * @param {Object} queryObj
 * @returns {string} 组装后的url
 * 
 * @example
   ```ts
  const res = composeUrlQuery('https://baidu.com', {
    name: 'mike',
    feel: "cold",
    age: '18',
    from: 'test',
  });
  // https://baidu.com?name=mike&feel=cold&age=18&from=test


  const res = composeUrlQuery('https://baidu.com?gender=male', {
    name: 'mike',
    feel: "cold",
    age: '18',
    from: 'test',
  });
  // https://baidu.com?gender=male&name=mike&feel=cold&age=18&from=test
  ```
  */
export function composeUrlQuery(url, queryObj) {
  const oriQuery = getQueryObj(url)
  let pathname = url.substr(
    0,
    url.indexOf('?') > -1 ? url.indexOf('?') : url.length,
  )
  pathname += '?'
  const allQuery = {
    ...oriQuery,
    ...queryObj,
  }
  Object.keys(allQuery).forEach(i => {
    pathname += `${i}=${allQuery[i]}&`
  })
  return pathname.substr(0, pathname.length - 1)
}
