import { loadVConsole } from './v-console';


const V_CONSOLE_STORAGE = {
  KEY: 'SHOW_V_CONSOLE',
  VALUE: '1',
};

export const V_CONSOLE_STATE = {
  show: false,
};

function loadTheVConsole() {
  loadVConsole().then((instance) => {
    window.vConsole = instance;
  });
}


export function showVConsole() {
  V_CONSOLE_STATE.show = true;
  localStorage.setItem(V_CONSOLE_STORAGE.KEY, V_CONSOLE_STORAGE.VALUE);
  loadTheVConsole();
}


export function closeVConsole() {
  localStorage.removeItem(V_CONSOLE_STORAGE.KEY);
  V_CONSOLE_STATE.show = false;
  window.vConsole?.destroy();
}

export function toggleVConsole() {
  if (V_CONSOLE_STATE.show) {
    closeVConsole();
  } else {
    showVConsole();
  }
  return V_CONSOLE_STATE.show;
}


export function checkAndShowVConsole() {
  const showVConsole = localStorage.getItem(V_CONSOLE_STORAGE.KEY) === V_CONSOLE_STORAGE.VALUE;
  if (showVConsole) {
    V_CONSOLE_STATE.show = true;
    loadTheVConsole();
  }
}
