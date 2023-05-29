/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * 获取天气信息
 * @returns {Promise<Array>} 天气数据
 * @example
 *
 * fetchWeatherData().then(content => {
 *   console.log(content)
 * })
 */
export function fetchWeatherData<T extends Array<object>>(): Promise<T> {
  return new Promise((resolve) => {
    const axios = require('axios');
    const QUERY_URL = 'https://weather.121.com.cn/data_cache/szWeather/alarm/szAlarm.json';

    axios.get(QUERY_URL).then((res: { data: { subAlarm: T }}) => {
      const { subAlarm } = res.data || {};
      resolve(subAlarm);
    });
  });
}
