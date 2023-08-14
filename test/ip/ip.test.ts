import { getIPAddress, getIPAddressStr } from '../../src';


describe('getIPAddress', () => {
  it('getIPAddress', () => {
    const ip = getIPAddress();

    console.log('ip', ip);

    expect(ip).toMatch(/\d+\.\d+\.\d+\.\d+/);
  });
});


describe('getIPAddressStr', () => {
  it('getIPAddressStr', () => {
    const ipStr = getIPAddressStr();
    expect(ipStr).toMatch(/\d+_\d+_\d+_\d+/);
  });
});
