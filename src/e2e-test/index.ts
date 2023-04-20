import * as page from './page';
import * as element from './element';
import * as drag from './drag';
import * as scroll from './scroll';


export const e2e = {
  ...page,
  ...element,
  ...drag,
  ...scroll,
};

export  { getE2ETestRobotMessage } from './robot-msg';
