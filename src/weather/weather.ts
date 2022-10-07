import { fetchWeatherData } from './api';
import { parseWeatherData } from './parse';

/**
 * 获取深圳天气信息，可用于通过机器人发送到群聊
 * @returns {object} 天气信息和是否有变化
 * @example
 *
 * getWeatherRobotContent().then(resp => {
 *   const { content, isSame } = resp
 *
 *   console.log(content)
 *   // ## 深圳当前正在生效的预警如下
 *   // ...
 *
 *   console.log(isSame)
 *   // false
 * })
 */
export async function getWeatherRobotContent() {
  const data = await fetchWeatherData();
  const { content, isSame } = parseWeatherData(data);
  return {
    content,
    isSame,
  };
}

