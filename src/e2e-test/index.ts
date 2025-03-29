import * as drag from './drag';
import * as element from './element';
import * as page from './page';
import * as scroll from './scroll';


export const e2e = {
  ...page,
  ...element,
  ...drag,
  ...scroll,
};

export { parseMochaAwesomeResult } from './mocha-awesome-result';
export { getE2ERobotChatId } from './robot-chat-id';
export { getE2ETestRobotMessage } from './robot-msg';
