import * as os from 'os';


/**
 * 获取ip地址
 * @returns 字符串，形如 x.x.x.x
 *
 * @example
 * ```ts
 * getIPAddress() // 10.10.10.10
 * ```
 */
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
 *
 * 获取ip的字符串
 * @returns 字符串，形如 x_x_x_x
 *
 * @example
 * ```ts
 * getIPAddressStr() // 10_10_10_10
 * ```
 */
export function getIPAddressStr() {
  let ip = getIPAddress();
  ip = ip.replace(/\./g, '_');
  return ip;
}


