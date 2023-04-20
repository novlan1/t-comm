import { parseRobotMessage, genRobotMessage } from '../wecom-robot/message';
import { timeStampFormat } from '../date/time';
import { EMOJI_MAP } from './config';


export function getE2ETestRobotMessage(data, notificationList = []) {
  const {
    start,
    passes,
    tests,
    projectLink,
    checkUrl,
    duration,
    name,
    comment,
    fileList = [],
  } = data;

  const hasFailed = passes !== tests;

  const time = timeStampFormat(new Date(start).getTime(), 'MM-dd hh:mm:ss');
  const title = `>${hasFailed ? EMOJI_MAP.FAIL : EMOJI_MAP.PASS}【自动化测试】`;
  const messageList = [
    [
      `${title}${parseRobotMessage({
        content: `${name}-${comment}`,
        link: projectLink,
      })}`,
      {
        content: `${tests}/${passes}`,
        label: '全部/成功',
      },
      {
        content: `${Math.ceil(duration / 1000)}s`,
        label: '耗时',
      },
      {
        content: time,
        link: checkUrl,
      },
    ],
  ];

  if (hasFailed) {
    messageList[0].push(...notificationList.map(item => `<@${item}>`));
  }

  const fileMessageList = (fileList || []).map((fileInfo) => {
    const { file, tests, passes } = fileInfo;
    return [
      `- ${file}`,
      `${tests}/${passes}`,
    ];
  });

  messageList.push(...fileMessageList);

  return {
    message: genRobotMessage(messageList),
    start,
    hasFailed,
  };
}
