import { getAvailableDiskSize } from '../../src';

const MOCK_DATA = `
log Filesystem     1024-blocks      Used Available Capacity Mounted on
/dev/vda1        103079868  80835340  17824528      82% /
devtmpfs          32809388         0  32809388       0% /dev
tmpfs             32818276     10244  32808032       1% /dev/shm
tmpfs             32818276    280092  32538184       1% /run
tmpfs             32818276         0  32818276       0% /sys/fs/cgroup
/dev/vdb1        515927296 304412996 185283568      63% /data
/dev/vdc1       1031986328     77848 979463348       1% /data2
tmpfs              6563656         0   6563656       0% /run/user/0
`;


describe('getAvailableDiskSize', () => {
  it('getAvailableDiskSize', () => {
    const result = getAvailableDiskSize({
      mockLog: MOCK_DATA,
    });
    expect(result).toBe(185283568);
  });
});
