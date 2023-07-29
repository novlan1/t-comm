import { loadJS } from '../loader/loader';
import { insertStyle } from '../dom/style';
import { V_CONSOLE_URL, V_CONSOLE_STYLE_CONTENT } from './config';

import { initVersionPlugin } from './plugin/version';
import { initFeedbackPlugin } from './plugin/feedback';
import { initSwitchEnvPlugin } from './plugin/env';
import { initLoadDelayPlugin } from './plugin/delay';
import { initMsdkPlugin } from './plugin/msdk';
import { initVersionSimplePlugin } from './plugin/version-simple';


export function loadVConsole(options: Record<string, any> = {}, plugins: Array<Function> = []) {
  return new Promise((resolve) => {
    if (typeof window.VConsole === 'undefined') {
      loadJS(V_CONSOLE_URL).then(() => {
        resolve(initVConsole(options, plugins));
      });
    } else {
      resolve(initVConsole(options, plugins));
    }
  });
}


function initVConsole(options: Record<string, any>, plugins: Array<Function>) {
  const vConsole = new VConsole({
    ...(options || {}),
  });

  vConsole.addPlugin(initVersionPlugin());
  vConsole.addPlugin(initFeedbackPlugin());
  vConsole.addPlugin(initSwitchEnvPlugin());
  vConsole.addPlugin(initLoadDelayPlugin());
  vConsole.addPlugin(initVersionSimplePlugin());
  vConsole.addPlugin(initMsdkPlugin());

  plugins.forEach((plugin) => {
    vConsole.addPlugin(plugin());
  });

  insertStyle({
    id: 'vConsolePluginStyle',
    content: V_CONSOLE_STYLE_CONTENT,
  });
  return vConsole;
}


