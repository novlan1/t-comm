import { fetchWeatherData } from './api';
import { parseWeatherData } from './parse';

/**
 * 获取深圳天气信息，可用于通过机器人发送到群聊
 * @returns {object} 天气信息和是否有变化
 */
export async function getWeatherRobotContent() {
  const data = await fetchWeatherData();
  const { content, isSame } = parseWeatherData(data);
  return {
    content,
    isSame,
  };
}
