/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * 获取天气信息
 * @returns {Promise<Array>} 天气数据
 */
export function fetchWeatherData(): Promise<Array<object>> {
  return new Promise((resolve) => {
    const axios = require('axios');
    const QUERY_URL = 'https://weather.121.com.cn/data_cache/szWeather/alarm/szAlarm.json';

    axios.get(QUERY_URL).then((res) => {
      const { subAlarm } = res.data || {};
      console.log('subAlarm', subAlarm);
      resolve(subAlarm);
    });
  });
}
