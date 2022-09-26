import rawCityData from './data'
import { ProvType } from './type'

/**
 * 获取城市列表
 * @param data - 原始数据[provData, cityData]
 * @param areaArray - 返回的数组
 * @param allProvFlag - 是否有不限的标识
 * @returns 城市列表
 */
export function getAreaData(
  data = rawCityData,
  areaArray: Array<ProvType> = [],
  allProvFlag = false,
) {
  const { cityData, provData } = data

  Object.keys(provData).forEach(key => {
    const provObject: ProvType = {
      text: provData[key],
      code: key,
    }
    areaArray.push(provObject)
  })

  Object.keys(cityData).forEach(key1 => {
    const cityList = cityData[key1]
    const array: Array<ProvType> = []

    if (Array.isArray(cityList)) {
      const cityObject: ProvType = {
        text: cityList[0],
        code: '0',
      }
      array.push(cityObject)
    } else {
      if (allProvFlag) {
        // 全省
        array.push({ text: '全省', code: '0' })
      }

      Object.keys(cityList).forEach(key2 => {
        const cityObject: ProvType = {
          text: cityList[key2],
          code: key2,
        }
        array.push(cityObject)
      })
    }

    for (let index = 0; index < areaArray.length; index++) {
      const element = areaArray[index]
      if (element.code === key1) {
        element.children = array
      }
    }
  })

  return areaArray
}

/**
  * 获取如下格式的城市列表，包含`全国`、`全省`选项
  * @returns {Array} 城市列表
   @example
   ```js
   getAllAreaData();

   [{
      text: '全国',
      code: '0',
      children: [{
        text: '不限',
        code: '0',
      }],
    },
     {
       text: '北京',
       code: '11',
       children: [{
         text: '北京',
         code: '0',
       }],
     },
     {
       text: '天津',
       code: '12',
       children: [{
         text: '天津',
         code: '0',
       }],
     },
     {
       text: '河北',
       code: '13',
       children: [{
         text: '全省',
         code: '0'
         },
         {
         text: '石家庄',
         code: '1'
       },
       {
         text: '唐山',
         code: '2'
       }]
     }
   ]
   ```
  */
export function getAllAreaData() {
  const areaArray: Array<ProvType> = []

  // 全国
  const provObject: ProvType = {
    text: '全国',
    code: '0',
    children: [{ text: '不限', code: '0' }],
  }
  areaArray.push(provObject)

  getAreaData(rawCityData, areaArray, true)
  return areaArray
}

/**
  * 根据省份城市转化为`id`数组
  * @param {string} provinceStr
  * @param {string} cityStr
  * @return {Array} 包含省份、城市ID的数组
  *
  * @example
  * ```js
    getAreaCode('山东', '德州'); // ['37', '14']
   ```
  */
export function getAreaCode(provinceStr, cityStr) {
  if (typeof provinceStr === 'undefined') {
    return []
  }
  provinceStr = provinceStr.replace('省', '').replace('市', '') // 考虑直辖市
  cityStr = cityStr.replace('市', '')

  const areaList = getAreaData()
  const codes: Array<String> = []

  for (let i = 0; i < areaList.length; i++) {
    if (provinceStr === areaList[i].text) {
      codes[0] = areaList[i].code as String
      const list = areaList[i].children || []

      for (let j = 0; j < list.length; j++) {
        if (cityStr === list[j].text) {
          codes[1] = list[j].code as String
          return codes
        }
      }
    }
  }
  return codes
}

/**
  * 根据`id`获取省份名字
  * @param {string | number} provinceId
  * @returns {string} 省份名字
  *
  * @example
  * ```js
   getProvName(37) // 山东
   getCityName(11) // 北京
   ```
  */
export function getProvName(provinceId) {
  const provName = rawCityData.provData[provinceId]
  return provName
}

/**
  * 根据`id`获取城市名字
  * @param {string | number} provinceId
  * @param {string | number} cityId
  * @returns {string} 城市名字
  *
  * @example
  *  ```js
    getCityName(37, 14) // 德州
    getCityName(11) // 北京
    ```
  */
export function getCityName(provinceId, cityId) {
  const provName = rawCityData.provData[provinceId]
  let cityName = ''
  const cityList = rawCityData.cityData[provinceId]

  if (Array.isArray(cityList)) {
    cityName = provName
  } else if (cityList) {
    cityName = cityList[cityId]
  }
  return cityName
}

/**
  * 根据`id`将省份城市转化为字符串数组
  * @param {string | number} provinceId
  * @param {string | number} cityId
  * @return {Array} 包含省份、城市名字的数组
  *
  * @example
  * ```js
   getAreaName(37, 14) // ['山东', '德州']
   getAreaName(11) // ['北京', '北京']
   getAreaName(11, 0) // ['北京', '北京']
   ```
  */
export function getAreaName(provinceId, cityId) {
  const provName = getProvName(provinceId) || ''
  const cityName = getCityName(provinceId, cityId) || ''
  return [provName, cityName]
}
