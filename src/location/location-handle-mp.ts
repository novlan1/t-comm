import MiniProgramLocation from './platform/miniprogram-location';
locationHandle.failHandle = function () {};
export default function locationHandle() {
  return new MiniProgramLocation();
}
