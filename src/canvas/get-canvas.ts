export function getCanvas() {
  try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
    const canvasLibrary = require('canvas');
    return canvasLibrary;
  } catch (err) {
  }
}
