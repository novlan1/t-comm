import { resolveUrlParams } from '../../src';

const MOCK_EMPTY_URL = 'https://igame.qq.com';


describe('resolveUrlParams', () => {
  it('地址使用 search 参数', () => {
    const res = resolveUrlParams(`${MOCK_EMPTY_URL}?name=mike&age=18`);
    expect(res).toMatchObject({ name: 'mike', age: '18' });
  });

  it('地址使用 hash 参数', () => {
    const res = resolveUrlParams(`${MOCK_EMPTY_URL}#/?from=china&home=china`);
    expect(res).toMatchObject({ from: 'china', home: 'china' });
  });

  it('地址同时使用 search 和 hash 参数', () => {
    const res = resolveUrlParams(`${MOCK_EMPTY_URL}?name=mike&age=18#/index?from=china&home=china`);
    expect(res).toMatchObject({ from: 'china', home: 'china', name: 'mike', age: '18' });
  });

  it('真实业务地址上报拼接错误情况1', () => {
    const url = 'https://igame.qq.com/tip/ingame-page/igame-regift-box/index.html#/detail?brandid=b1666840705&multiCfgId=b16668407051666946204%3FversionCode&market_id=tool_web&userId=20227661&extraInfo=&_key=E8C0FF104677805AAC93DC16D401F6557C2F3B7205E87466DAAEC82189771540E810876BAE368CC4ADD5D57071A81597DB4E14BD39F6794E&isMultiGameMode=false&hasDefaultVisited=false';
    const res = resolveUrlParams(url);
    expect(res).toMatchObject({
      brandid: 'b1666840705',
      multiCfgId: 'b16668407051666946204%3FversionCode',
      market_id: 'tool_web',
      userId: '20227661',
      _key: 'E8C0FF104677805AAC93DC16D401F6557C2F3B7205E87466DAAEC82189771540E810876BAE368CC4ADD5D57071A81597DB4E14BD39F6794E',
      isMultiGameMode: 'false',
      hasDefaultVisited: 'false',
    });
  });

  it('真实业务地址上报拼接错误情况2', () => {
    const url = 'https://igame.qq.com/tip/ingame-page/igame-regift-box/index.html#/detail?brandid=ForAll&multiCfgId=ForAll1657273443%3FgameTaskFlag%3Dtrue&gameName=&taskId=VrZpK&degrade=1&taskType=301&isMultiGameMode=true&hasDefaultVisited=false';
    const res = resolveUrlParams(url);
    expect(res).toMatchObject({
      brandid: 'ForAll',
      multiCfgId: 'ForAll1657273443%3FgameTaskFlag%3Dtrue',
      taskId: 'VrZpK',
      taskType: '301',
      isMultiGameMode: 'true',
      hasDefaultVisited: 'false',
    });
  });

  it('真实业务地址上报拼接错误情况3', () => {
    const url = 'https://igame.qq.com/tip/ingame-page/igame-regift-box/index.html#/index?brandid=b1667537174&multiCfgId=b16675371741667836830https%3A%2F%2Figame.qq.com%2Ftip%2Fingame-page%2Figame-regift-box%2Findex.html#/?brandid=b1667537174&multiCfgId=b16675371741667836830&_logintype=scancode&adtag=banner&adtag=yxctjw';
    const res = resolveUrlParams(url);
    expect(res).toMatchObject({
      brandid: 'b1667537174',
      multiCfgId: 'b16675371741667836830',
      _logintype: 'scancode',
      adtag: 'yxctjw',
    });
  });

  it('真实业务地址上报拼接错误情况4', () => {
    const url = 'https://igame.qq.com/tip/ingame-page/igame-regift-box/index.html#/index?brandid=b1662364289&amp%3BmultiCfgId=b16623642891663309541';
    const res = resolveUrlParams(url);
    expect(res).toMatchObject({
      brandid: 'b1662364289',
    });
  });
});
