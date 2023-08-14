import * as os from 'os';

export function getIPAddress() {
  const interfaces = os.networkInterfaces();
  // eslint-disable-next-line no-restricted-syntax
  for (const devName in interfaces) {
    const iface = interfaces[devName];

    if (!iface) continue;

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return '';
}

/**
 * @returns 获取ip的字符串
 * @ignore
 * x_x_x_x
 */
export function getIPAddressStr() {
  let ip = getIPAddress();
  ip = ip.replace(/\./g, '_');
  return ip;
}


