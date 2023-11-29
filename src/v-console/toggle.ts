import { loadVConsole } from './v-console';


const V_CONSOLE_STORAGE = {
  KEY: 'SHOW_V_CONSOLE',
  VALUE: '1',
};

/**
 * vConsole 当前展示状态
 */
export const V_CONSOLE_STATE = {
  show: false,
};

function loadTheVConsole() {
  loadVConsole().then((instance) => {
    window.vConsole = instance;
  });
}


/**
 * 展示 vConsole
 * @example
 * ```ts
 * showVConsole()
 * ```
 */
export function showVConsole() {
  V_CONSOLE_STATE.show = true;
  localStorage.setItem(V_CONSOLE_STORAGE.KEY, V_CONSOLE_STORAGE.VALUE);
  loadTheVConsole();
}


/**
 * 关闭 vConsole
 * @example
 * ```ts
 * closeVConsole()
 * ```
 */
export function closeVConsole() {
  localStorage.removeItem(V_CONSOLE_STORAGE.KEY);
  V_CONSOLE_STATE.show = false;
  window.vConsole?.destroy();
}

/**
 * 切换展示 vConsole
 * @returns 是否展示
 * @example
 * ```ts
 * toggleVConsole()
 * ```
 */
export function toggleVConsole() {
  if (V_CONSOLE_STATE.show) {
    closeVConsole();
  } else {
    showVConsole();
  }
  return V_CONSOLE_STATE.show;
}


/**
 * 检查 localStorage 设置，并展示vConsole
 * @example
 * ```ts
 * checkAndShowVConsole()
 * ```
 */
export function checkAndShowVConsole() {
  const showVConsole = localStorage.getItem(V_CONSOLE_STORAGE.KEY) === V_CONSOLE_STORAGE.VALUE;
  if (showVConsole) {
    V_CONSOLE_STATE.show = true;
    loadTheVConsole();
  }
}
