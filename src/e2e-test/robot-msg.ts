import { parseRobotMessage, genRobotMessage } from '../wecom-robot/message';
import { timeStampFormat } from '../time/time';
import { EMOJI_MAP } from './config';

const TRIGGER_MAP = {
  MANUAL: '手动',
  TIME_TRIGGER: '定时',
  WEB_HOOK: 'WebHook',
  SERVICE: '内部服务',
  PIPELINE: '子流水线',
  REMOTE: '远程',
};

function getStartTypeDesc(data: {
  bkStartType: keyof typeof TRIGGER_MAP
}) {
  const { bkStartType } = data;
  let content = '';
  if (bkStartType && TRIGGER_MAP[bkStartType]) {
    content = TRIGGER_MAP[bkStartType];
  } else if (bkStartType) {
    content = bkStartType;
  }
  if (content) {
    return [{
      content,
      label: '触发方式',
    }];
  }
  return [];
}

function getFailedTestUnits({
  passes,
  tests,
  testList,
}: {
  passes: number;
  tests: number;
  testList: Array<{
    fail: number;
    title: string;
  }>
}) {
  if (passes == tests) return [];
  if (!testList?.length) return [];

  const failedTests = testList.filter(item => !!item.fail).map(item => item.title);

  if (!failedTests?.length) return [];
  return [`失败：${failedTests.join('、')}`];
}


export function getE2ETestRobotMessage(data: {
  start: number | string | Date;
  duration: number;
  passes: number;
  tests: number;

  bkStartType: keyof typeof TRIGGER_MAP

  projectLink?: string;
  checkUrl?: string;
  name?: string;
  comment?: string;
  fileList?: Array<{
    file: string;
    tests: number;
    passes: number;
    link: string;

    testList: Array<{
      fail: number;
      title: string;
    }>
  }>
}, notificationList = []) {
  const {
    start,
    duration,
    passes,
    tests,
    projectLink = '',
    checkUrl = '',
    name = '',
    comment = '',
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
      ...getStartTypeDesc(data),
      {
        content: time,
        link: checkUrl,
      },
    ],
  ];

  if (hasFailed) {
    messageList[0].push(...notificationList.map(item => `<@${item}>`));
  }

  const fileMessageList = (fileList || [])
    .filter((fileInfo) => {
      const { tests, passes } = fileInfo;
      return tests !== passes;
    })
    .map((fileInfo) => {
      const { file, tests, passes, link, testList } = fileInfo;
      const fileName = parseRobotMessage({
        content: file,
        link,
      });

      return [
        `- ${fileName}`,
        `${tests}/${passes}`,
        ...getFailedTestUnits({
          testList,
          passes,
          tests,
        }),
      ];
    });

  messageList.push(...fileMessageList);

  return {
    message: genRobotMessage(messageList),
    start,
    hasFailed,
  };
}
