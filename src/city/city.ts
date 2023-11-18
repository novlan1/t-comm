/* eslint-disable @typescript-eslint/prefer-for-of */
import { RAW_CITY_DATA } from './data';
import { ProvType } from './types';


/**
  * 获取如下格式的城市列表，包含`全国`、`全省`选项
  * @returns {Array} 城市列表
  * @example
  *
  * const res = getAreaDataAll();
  * // [
  * //   {
  * //     text: '全国',
  * //     code: '0',
  * //     children: [{
  * //       text: '不限',
  * //       code: '0',
  * //     }],
  * //   },
  * //   {
  * //     text: '北京',
  * //     code: '11',
  * //     children: [{
  * //       text: '北京',
  * //       code: '0',
  * //     }],
  * //   },
  * //   {
  * //     text: '天津',
  * //     code: '12',
  * //     children: [{
  * //       text: '天津',
  * //       code: '0',
  * //     }],
  * //   },
  * //   {
  * //     text: '河北',
  * //     code: '13',
  * //     children: [{
  * //       text: '全省',
  * //       code: '0',
  * //     },
  * //     {
  * //       text: '石家庄',
  * //       code: '1',
  * //     },
  * //     {
  * //       text: '唐山',
  * //       code: '2',
  * //     },
  * //       // ...
  * //     ],
  * //   },
  * //   // ...
  * // ];
  *
  */
export function getAreaDataAll() {
  const areaArray: Array<ProvType> = [];

  // 全国
  const provObject: ProvType = {};
  provObject.text = '全国';
  provObject.code = '0';
  provObject.children = [{ text: '不限', code: '0' }];
  areaArray.push(provObject);

  getAreaData(RAW_CITY_DATA, areaArray, true);
  return areaArray;
}

/**
  * 获取城市列表，默认不包含`全省`选项
  * @param {object} [data] 原始数据
  * @param {array} [areaArray = []] 结果列表
  * @param {boolean} [allProvFlag = false] 是否包含`全省`选项
  * @returns {Array} 城市列表
  * @example
  *
  * const res = getAreaData();
  * // [
  * //   {
  * //     text: '北京',
  * //     code: '11',
  * //     children: [{
  * //       text: '北京',
  * //       code: '0',
  * //     }],
  * //   },
  * //   {
  * //     text: '天津',
  * //     code: '12',
  * //     children: [{
  * //       text: '天津',
  * //       code: '0',
  * //     }],
  * //   },
  * //   {
  * //     text: '河北',
  * //     code: '13',
  * //     {
  * //       text: '石家庄',
  * //       code: '1',
  * //     },
  * //     {
  * //       text: '唐山',
  * //       code: '2',
  * //     },
  * //       // ...
  * //     ],
  * //   },
  * //   // ...
  * // ];
  *
  */
export function getAreaData(data = RAW_CITY_DATA, areaArray: Array<ProvType> = [], allProvFlag = false) {
  const { cityData, provData } = data;

  Object.keys(provData).forEach((key) => {
    const provObject: any = {};
    provObject.text = provData[key];
    provObject.code = key;
    areaArray.push(provObject);
  });

  Object.keys(cityData).forEach((key1) => {
    const cityList = cityData[key1];
    const array: Array<ProvType> = [];
    if (Array.isArray(cityList)) {
      const cityObject: ProvType = {};
      cityObject.text = cityList[0];
      cityObject.code = '0';
      array.push(cityObject);
    } else {
      if (allProvFlag) {
        // 全省
        array.push({ text: '全省', code: '0' });
      }

      Object.keys(cityList).forEach((key2) => {
        const cityObject: ProvType = {};
        cityObject.text = cityList[key2];
        cityObject.code = key2;
        array.push(cityObject);
      });
    }

    for (let index = 0; index < areaArray.length; index++) {
      const element = areaArray[index];
      if (element.code === key1) {
        (element as any).children = array;
      }
    }
  });

  return areaArray;
}

/**
 * 根据省份城市转化为`id`数组
 * @param {string} provinceStr
 * @param {string} cityStr
 * @return {Array} 包含省份、城市ID的数组
 *
 * @example
 * const res =  getAreaCode('山东', '德州');
 * // ['37', '14']
 */
export function getAreaCode(provinceStr = '', cityStr = '') {
  if (typeof provinceStr === 'undefined') {
    return [];
  }
  provinceStr = provinceStr.replace('省', '').replace('市', ''); // 考虑直辖市
  cityStr = cityStr.replace('市', '');
  const areaList: any = getAreaData();
  const codes: any = [];
  for (let i = 0; i < areaList.length; i++) {
    if (provinceStr == areaList[i].text) {
      codes[0] = areaList[i].code;
      for (let j = 0; j < areaList[i].children.length; j++) {
        if (cityStr == areaList[i].children[j].text) {
          codes[1] = areaList[i].children[j].code;
          return codes;
        }
      }
    }
  }
  return codes;
}

/**
  * 根据`id`将省份城市转化为字符串数组
  * @param {string | number} provinceId
  * @param {string | number} cityId
  * @return {Array} 包含省份、城市名字的数组
  *
  * @example
  * const res =  getProvName(37, 14)
  * // ['山东', '德州']
  *
  * const res2 =  getCityName(11)
  * // ['北京', '北京']
  */
export function getAreaName(provinceId, cityId?: number) {
  let provName = '';
  // eslint-disable-next-line no-prototype-builtins
  if (RAW_CITY_DATA.provData.hasOwnProperty(provinceId)) {
    provName = RAW_CITY_DATA.provData[provinceId];
  }
  let cityName = '';
  let cityList = {};

  // eslint-disable-next-line no-prototype-builtins
  if (RAW_CITY_DATA.cityData.hasOwnProperty(provinceId)) {
    cityList = RAW_CITY_DATA.cityData[provinceId];
  }

  if (Array.isArray(cityList)) {
    cityName = provName;
  } else if (cityId) {
    cityName = cityList[cityId];
  }

  return [provName, cityName];
}

/**
  * 根据`id`获取省份名字
  * @param {string | number} provinceId
  * @returns {string} 省份名字
  *
  * @example
  * const res =  getProvName(37)
  * // 山东
  *
  * const res2 =  getCityName(11)
  * // 北京
  */
export function getProvName(provinceId) {
  const provName = RAW_CITY_DATA.provData[provinceId];
  return provName;
}

/**
  * 根据`id`获取城市名字
  * @param {string | number} provinceId
  * @param {string | number} cityId
  * @returns {string} 城市名字
  *
  * @example
  * const res =  getCityName(37, 14)
  * // 德州
  *
  * const res2 =  getCityName(11)
  * // 北京
  */
export function getCityName(provinceId, cityId?: number) {
  const provName = RAW_CITY_DATA.provData[provinceId];
  let cityName = '';
  const cityList = RAW_CITY_DATA.cityData[provinceId];

  if (Array.isArray(cityList)) {
    cityName = provName;
  } else if (cityId && cityList) {
    cityName = cityList[cityId];
  }
  return cityName;
}

