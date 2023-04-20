type MessageType = string | {
  content: string;
  link?: string;
  label?: string;
  isTitle?: boolean;
};

const DEFAULT_SEPARATOR = '，';
const DEFAULT_LABEL_SEPARATOR = '：';

export function parseRobotMessage(info: MessageType, labelSeparator = DEFAULT_LABEL_SEPARATOR) {
  if (typeof info === 'string') return info;
  const { content, link, label, isTitle } = info || {};
  if (link) {
    return `[${content}](${link})`;
  }
  if (label) {
    return `${label}${labelSeparator}${content}`;
  }
  if (isTitle) {
    return `【${content}】`;
  }
  return content;
}

export function genRobotMessage(
  list: Array<string | Array<MessageType>>,
  separator = DEFAULT_SEPARATOR,
  labelSeparator = DEFAULT_LABEL_SEPARATOR,
) {
  return list.map((message) => {
    if (typeof message === 'string') {
      return message;
    }

    return message.map(messageItem => parseRobotMessage(messageItem, labelSeparator)).join(separator);
  }).join('\n');
}
