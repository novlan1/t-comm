export function getValidPort(port: number) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const net = require('net');
  const server = net.createServer().listen(port);


  return new Promise((resolve, reject) => {
    // 如果监听成功，表示端口没有被其他服务占用，端口可用，取消监听，返回端口给调用者。
    server.on('listening', () => {
      server.close();
      resolve(port);
    });

    // 如果监听出错，端口+1，继续监听，直到监听成功。
    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        resolve(getValidPort(port + 1));
        console.log(`this port ${port} is occupied try another.`);
      } else {
        reject(err);
      }
    });
  });
}

