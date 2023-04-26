const defaultShouldSendAll = (time) => {
  const date = new Date();
  date.setHours(9, 10, 0, 0);
  const end = date.getTime();
  date.setHours(9, 0, 0, 0);
  const start = date.getTime();

  return time > start && time < end;
};


const defaultShouldSendSuccess = (time) => {
  const hour = new Date(time).getHours();
  const minute = new Date(time).getMinutes();

  return minute < 10 && [10, 14, 18].indexOf(hour) >= 0;
};


export function getE2ERobotChatId({
  chatIdMap,
  start,

  isFailed,
  isLocal,
  isSendAll,

  shouldSendAll = defaultShouldSendAll,
  shouldSendSuccess = defaultShouldSendSuccess,
}: {
  chatIdMap: {
    ALL: Array<string>;
    ONLY_ME: Array<string>;
    FAIL: Array<string>;
    SUCCESS: Array<string>;
  };
  start: number;
  isFailed?: boolean;
  isLocal?: boolean;
  isManualStart?: boolean;
  isSendAll?: boolean;

  shouldSendAll?: (number) => boolean;
  shouldSendSuccess?: (number) => boolean;
}) {
  if (isSendAll) {
    return chatIdMap.ALL;
  }

  if (isLocal) {
    return chatIdMap.ONLY_ME;
  }

  if (shouldSendAll?.(start)) {
    return chatIdMap.ALL;
  }

  if (isFailed) {
    return chatIdMap.FAIL;
  }

  if (shouldSendSuccess?.(start)) {
    return chatIdMap.SUCCESS;
  }
}


