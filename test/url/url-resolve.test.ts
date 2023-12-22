import {
  resolveUrlParams,
  formatUrlParams,
  extendUrlParams,
  keepUrlParams,
  filterUrlParams,
} from '../../src/index';

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


describe('formatUrlParams', () => {
  it('地址是 hash 模式参数', () => {
    const res = formatUrlParams('http://www.test.com/#/detail?a=1&b=2&c=3', { d: 4 });
    expect(res).toBe('http://www.test.com/#/detail?d=4');
  });

  it('地址 history模式参数并存', () => {
    const res = formatUrlParams('http://www.test.com?a=1&b=2&c=3', { d: 4 });
    expect(res).toBe('http://www.test.com/#/?d=4');
  });

  it('hash 模式和history模式参数并存', () => {
    const res = formatUrlParams('http://www.test.com?a=1&b=2&c=3#/detail?d=4', { e: 5 });
    expect(res).toBe('http://www.test.com/#/detail?e=5');
  });


  it('地址是 hash 模式和history模式参数并存，且是多个参数', () => {
    const res = formatUrlParams('http://www.test.com?d=4&f=6#/detail?a=1&b=2&c=3', { e: 5, g: 7 });
    expect(res).toBe('http://www.test.com/#/detail?e=5&g=7');
  });

  it('子工程是 history 模式', () => {
    const res = formatUrlParams('http://www.test.com?a=1&b=2&c=3', { d: 4 }, true);
    expect(res).toBe('http://www.test.com/?d=4');
  });
});


describe('extendUrlParams', () => {
  it('地址是 hash 模式参数', () => {
    const res = extendUrlParams('http://www.test.com/#/detail?a=1&b=2&c=3', { d: 4 });
    expect(res).toBe('http://www.test.com/#/detail?a=1&b=2&c=3&d=4');
  });

  it('地址 history模式参数并存', () => {
    const res = extendUrlParams('http://www.test.com?a=1&b=2&c=3', { d: 4 });
    expect(res).toBe('http://www.test.com/#/?a=1&b=2&c=3&d=4');
  });

  it('地址 history模式参数并存 + 强制history模式返回', () => {
    const res = extendUrlParams('http://www.test.com?a=1&b=2&c=3', { d: 4 }, true);
    expect(res).toBe('http://www.test.com/?a=1&b=2&c=3&d=4');
  });

  it('hash 模式和history模式参数并存', () => {
    const res = extendUrlParams('http://www.test.com?a=1&b=2&c=3#/detail?d=4', { e: 5 });
    expect(res).toBe('http://www.test.com/#/detail?a=1&b=2&c=3&d=4&e=5');
  });


  it('地址是 hash 模式和history模式参数并存，且是多个参数', () => {
    const res = extendUrlParams('http://www.test.com?d=4&f=6#/detail?a=1&b=2&c=3', { e: 5, g: 7 });
    expect(res).toBe('http://www.test.com/#/detail?d=4&f=6&a=1&b=2&c=3&e=5&g=7');
  });
});


describe('keepUrlParams', () => {
  it('地址是 hash 模式参数', () => {
    const res = keepUrlParams('http://www.test.com/#/detail?a=1&b=2&c=3', ['a', 'b']);
    expect(res).toBe('http://www.test.com/#/detail?a=1&b=2');
  });

  it('地址 history模式参数并存', () => {
    const res = keepUrlParams('http://www.test.com?a=1&b=2&c=3', ['a', 'b']);
    expect(res).toBe('http://www.test.com/#/?a=1&b=2');
  });

  it('地址 history模式参数并存 + 强制history模式返回', () => {
    const res = keepUrlParams('http://www.test.com?a=1&b=2&c=3', ['a', 'b'], true);
    expect(res).toBe('http://www.test.com/?a=1&b=2');
  });

  it('hash 模式和history模式参数并存', () => {
    const res = keepUrlParams('http://www.test.com?a=1&b=2&c=3#/detail?d=4', ['a', 'd']);
    expect(res).toBe('http://www.test.com/#/detail?a=1&d=4');
  });


  it('地址是 hash 模式和history模式参数并存，且是多个参数', () => {
    const res = keepUrlParams('http://www.test.com?d=4&f=6#/detail?a=1&b=2&c=3', ['a', 'd']);
    expect(res).toBe('http://www.test.com/#/detail?d=4&a=1');
  });
});


describe('filterUrlParams', () => {
  const pathname = '/';
  it('测试：未超过长度限制', () => {
    const search = '?name=mike';
    const hash = '#/?from=test';
    const url = `${MOCK_EMPTY_URL}${pathname}${search}${hash}`;

    const res = filterUrlParams({
      url,
      limit: 600,
      keepKey: ['name'],
    });
    expect(res).toBe(url);
  });


  it('测试：search参数超长', () => {
    const search = '?name=mike&__lxsdk_params=bHhjdWlkOjE4MGNhZGU5Y2VjYzgtYjQwYjEzMTU3NzVmMi0wLTAtMTgwY2FkZTljZWNjODthcHBubTpncm91cF93eGFwcDttc2lkOjE4MzQxMGUwZjA4LTYxNjQtNTgzMy1lNjdmO3d4aWQ6b0pWUDUwUF93VHFXLXdkRlI5OWxJU1ZZY3JnVTtzY2VuZToxMDAxO3V0bV9jb250ZW50OjA7dXRtX2NhbXBhaWduOjA7dXVpZDoxODBjYWRlOWNlY2M4LWI0MGIxMzE1Nzc1ZjItMC0wLTE4MGNhZGU5Y2VjYzg7d3h1bmlvbmlkOm9OUXU5dDVxNG9OYVl1Sk90c050TFdLNmZEMkU7c2RrX2VudjpvbmxpbmU7djoxMjM0NTY7Y2g6ZDJWcGVHbHU7bmV0OlYwbEdTUT09bHhjdWlkOjE4MGNhZGU5Y2VjYzgtYjQwYjEzMTU3NzVmMi0wLTAtMTgwY2FkZTljZWNjODthcHBubTpncm91cF93eGFwcDttc2lkOjE4MzQxMGUwZjA4LTYxNjQtNTgzMy1lNjdmO3d4aWQ6b0pWUDUwUF93VHFXLXdkRlI5OWxJU1ZZY3JnVTtzY2VuZToxMDAxO3V0bV9jb250ZW50OjA7dXRtX2NhbXBhaWduOjA7dXVpZDoxODBjYWRlOWNlY2M4LWI0MGIxMzE1Nzc1ZjItMC0wLTE4MGNhZGU5Y2VjYzg7d3h1bmlvbmlkOm9OUXU5dDVxNG9OYVl1Sk90c050TFdLNmZEMkU7c2RrX2VudjpvbmxpbmU7djoxMjM0NTY7Y2g6ZDJWcGVHbHU7bmV0OlYwbEdTUT09bHhjdWlkOjE4MGNhZGU5Y2VjYzgtYjQwYjEzMTU3NzVmMi0wLTAtMTgwY2FkZTljZWNjODthcHBubTpncm91cF93eGFwcDttc2lkOjE4MzQxMGUwZjA4LTYxNjQtNTgzMy1lNjdmO3d4aWQ6b0pWUDUwUF93VHFXLXdkRlI5OWxJU1ZZY3JnVTtzY2VuZToxMDAxO3V0bV9jb250ZW50OjA7dXRtX2NhbXBhaWduOjA7dXVpZDoxODBjYWRlOWNlY2M4LWI0MGIxMzE1Nzc1ZjItMC0wLTE4MGNhZGU5Y2VjYzg7d3h1bmlvbmlkOm9OUXU5dDVxNG9OYVl1Sk90c050TFdLNmZEMkU7c2RrX2VudjpvbmxpbmU7djoxMjM0NTY7Y2g6ZDJWcGVHbHU7bmV0OlYwbEdTUT09';
    const hash = '#/?from=test';
    const url = `${MOCK_EMPTY_URL}${pathname}${search}${hash}`;

    const res = filterUrlParams({
      url,
      limit: 600,
      keepKey: ['name'],
    });
    expect(res).toBe(`${MOCK_EMPTY_URL}/#/?name=mike`);
  });

  it('测试：search参数超长 + 强制history模式返回', () => {
    const search = '?name=mike&__lxsdk_params=bHhjdWlkOjE4MGNhZGU5Y2VjYzgtYjQwYjEzMTU3NzVmMi0wLTAtMTgwY2FkZTljZWNjODthcHBubTpncm91cF93eGFwcDttc2lkOjE4MzQxMGUwZjA4LTYxNjQtNTgzMy1lNjdmO3d4aWQ6b0pWUDUwUF93VHFXLXdkRlI5OWxJU1ZZY3JnVTtzY2VuZToxMDAxO3V0bV9jb250ZW50OjA7dXRtX2NhbXBhaWduOjA7dXVpZDoxODBjYWRlOWNlY2M4LWI0MGIxMzE1Nzc1ZjItMC0wLTE4MGNhZGU5Y2VjYzg7d3h1bmlvbmlkOm9OUXU5dDVxNG9OYVl1Sk90c050TFdLNmZEMkU7c2RrX2VudjpvbmxpbmU7djoxMjM0NTY7Y2g6ZDJWcGVHbHU7bmV0OlYwbEdTUT09bHhjdWlkOjE4MGNhZGU5Y2VjYzgtYjQwYjEzMTU3NzVmMi0wLTAtMTgwY2FkZTljZWNjODthcHBubTpncm91cF93eGFwcDttc2lkOjE4MzQxMGUwZjA4LTYxNjQtNTgzMy1lNjdmO3d4aWQ6b0pWUDUwUF93VHFXLXdkRlI5OWxJU1ZZY3JnVTtzY2VuZToxMDAxO3V0bV9jb250ZW50OjA7dXRtX2NhbXBhaWduOjA7dXVpZDoxODBjYWRlOWNlY2M4LWI0MGIxMzE1Nzc1ZjItMC0wLTE4MGNhZGU5Y2VjYzg7d3h1bmlvbmlkOm9OUXU5dDVxNG9OYVl1Sk90c050TFdLNmZEMkU7c2RrX2VudjpvbmxpbmU7djoxMjM0NTY7Y2g6ZDJWcGVHbHU7bmV0OlYwbEdTUT09bHhjdWlkOjE4MGNhZGU5Y2VjYzgtYjQwYjEzMTU3NzVmMi0wLTAtMTgwY2FkZTljZWNjODthcHBubTpncm91cF93eGFwcDttc2lkOjE4MzQxMGUwZjA4LTYxNjQtNTgzMy1lNjdmO3d4aWQ6b0pWUDUwUF93VHFXLXdkRlI5OWxJU1ZZY3JnVTtzY2VuZToxMDAxO3V0bV9jb250ZW50OjA7dXRtX2NhbXBhaWduOjA7dXVpZDoxODBjYWRlOWNlY2M4LWI0MGIxMzE1Nzc1ZjItMC0wLTE4MGNhZGU5Y2VjYzg7d3h1bmlvbmlkOm9OUXU5dDVxNG9OYVl1Sk90c050TFdLNmZEMkU7c2RrX2VudjpvbmxpbmU7djoxMjM0NTY7Y2g6ZDJWcGVHbHU7bmV0OlYwbEdTUT09';
    const url = `${MOCK_EMPTY_URL}${pathname}${search}`;

    const res = filterUrlParams({
      url,
      limit: 600,
      keepKey: ['name'],
      forceHistoryMode: true,
    });
    expect(res).toBe(`${MOCK_EMPTY_URL}/?name=mike`);
  });


  it('测试：hash参数超长', () => {
    const search = '?name=mike';
    const hash = '#/?name=mike&__lxsdk_params=bHhjdWlkOjE4MGNhZGU5Y2VjYzgtYjQwYjEzMTU3NzVmMi0wLTAtMTgwY2FkZTljZWNjODthcHBubTpncm91cF93eGFwcDttc2lkOjE4MzQxMGUwZjA4LTYxNjQtNTgzMy1lNjdmO3d4aWQ6b0pWUDUwUF93VHFXLXdkRlI5OWxJU1ZZY3JnVTtzY2VuZToxMDAxO3V0bV9jb250ZW50OjA7dXRtX2NhbXBhaWduOjA7dXVpZDoxODBjYWRlOWNlY2M4LWI0MGIxMzE1Nzc1ZjItMC0wLTE4MGNhZGU5Y2VjYzg7d3h1bmlvbmlkOm9OUXU5dDVxNG9OYVl1Sk90c050TFdLNmZEMkU7c2RrX2VudjpvbmxpbmU7djoxMjM0NTY7Y2g6ZDJWcGVHbHU7bmV0OlYwbEdTUT09bHhjdWlkOjE4MGNhZGU5Y2VjYzgtYjQwYjEzMTU3NzVmMi0wLTAtMTgwY2FkZTljZWNjODthcHBubTpncm91cF93eGFwcDttc2lkOjE4MzQxMGUwZjA4LTYxNjQtNTgzMy1lNjdmO3d4aWQ6b0pWUDUwUF93VHFXLXdkRlI5OWxJU1ZZY3JnVTtzY2VuZToxMDAxO3V0bV9jb250ZW50OjA7dXRtX2NhbXBhaWduOjA7dXVpZDoxODBjYWRlOWNlY2M4LWI0MGIxMzE1Nzc1ZjItMC0wLTE4MGNhZGU5Y2VjYzg7d3h1bmlvbmlkOm9OUXU5dDVxNG9OYVl1Sk90c050TFdLNmZEMkU7c2RrX2VudjpvbmxpbmU7djoxMjM0NTY7Y2g6ZDJWcGVHbHU7bmV0OlYwbEdTUT09bHhjdWlkOjE4MGNhZGU5Y2VjYzgtYjQwYjEzMTU3NzVmMi0wLTAtMTgwY2FkZTljZWNjODthcHBubTpncm91cF93eGFwcDttc2lkOjE4MzQxMGUwZjA4LTYxNjQtNTgzMy1lNjdmO3d4aWQ6b0pWUDUwUF93VHFXLXdkRlI5OWxJU1ZZY3JnVTtzY2VuZToxMDAxO3V0bV9jb250ZW50OjA7dXRtX2NhbXBhaWduOjA7dXVpZDoxODBjYWRlOWNlY2M4LWI0MGIxMzE1Nzc1ZjItMC0wLTE4MGNhZGU5Y2VjYzg7d3h1bmlvbmlkOm9OUXU5dDVxNG9OYVl1Sk90c050TFdLNmZEMkU7c2RrX2VudjpvbmxpbmU7djoxMjM0NTY7Y2g6ZDJWcGVHbHU7bmV0OlYwbEdTUT09';
    const url = `${MOCK_EMPTY_URL}${pathname}${search}${hash}`;

    const res = filterUrlParams({
      url,
      limit: 600,
      keepKey: ['name'],
    });
    expect(res).toBe(`${MOCK_EMPTY_URL}/#/?name=mike`);
  });


  it('测试：参数超长，并且支持识别路径', () => {
    const search = '?name=mike';
    const hash = '#/detail?name=mike&__lxsdk_params=bHhjdWlkOjE4MGNhZGU5Y2VjYzgtYjQwYjEzMTU3NzVmMi0wLTAtMTgwY2FkZTljZWNjODthcHBubTpncm91cF93eGFwcDttc2lkOjE4MzQxMGUwZjA4LTYxNjQtNTgzMy1lNjdmO3d4aWQ6b0pWUDUwUF93VHFXLXdkRlI5OWxJU1ZZY3JnVTtzY2VuZToxMDAxO3V0bV9jb250ZW50OjA7dXRtX2NhbXBhaWduOjA7dXVpZDoxODBjYWRlOWNlY2M4LWI0MGIxMzE1Nzc1ZjItMC0wLTE4MGNhZGU5Y2VjYzg7d3h1bmlvbmlkOm9OUXU5dDVxNG9OYVl1Sk90c050TFdLNmZEMkU7c2RrX2VudjpvbmxpbmU7djoxMjM0NTY7Y2g6ZDJWcGVHbHU7bmV0OlYwbEdTUT09bHhjdWlkOjE4MGNhZGU5Y2VjYzgtYjQwYjEzMTU3NzVmMi0wLTAtMTgwY2FkZTljZWNjODthcHBubTpncm91cF93eGFwcDttc2lkOjE4MzQxMGUwZjA4LTYxNjQtNTgzMy1lNjdmO3d4aWQ6b0pWUDUwUF93VHFXLXdkRlI5OWxJU1ZZY3JnVTtzY2VuZToxMDAxO3V0bV9jb250ZW50OjA7dXRtX2NhbXBhaWduOjA7dXVpZDoxODBjYWRlOWNlY2M4LWI0MGIxMzE1Nzc1ZjItMC0wLTE4MGNhZGU5Y2VjYzg7d3h1bmlvbmlkOm9OUXU5dDVxNG9OYVl1Sk90c050TFdLNmZEMkU7c2RrX2VudjpvbmxpbmU7djoxMjM0NTY7Y2g6ZDJWcGVHbHU7bmV0OlYwbEdTUT09bHhjdWlkOjE4MGNhZGU5Y2VjYzgtYjQwYjEzMTU3NzVmMi0wLTAtMTgwY2FkZTljZWNjODthcHBubTpncm91cF93eGFwcDttc2lkOjE4MzQxMGUwZjA4LTYxNjQtNTgzMy1lNjdmO3d4aWQ6b0pWUDUwUF93VHFXLXdkRlI5OWxJU1ZZY3JnVTtzY2VuZToxMDAxO3V0bV9jb250ZW50OjA7dXRtX2NhbXBhaWduOjA7dXVpZDoxODBjYWRlOWNlY2M4LWI0MGIxMzE1Nzc1ZjItMC0wLTE4MGNhZGU5Y2VjYzg7d3h1bmlvbmlkOm9OUXU5dDVxNG9OYVl1Sk90c050TFdLNmZEMkU7c2RrX2VudjpvbmxpbmU7djoxMjM0NTY7Y2g6ZDJWcGVHbHU7bmV0OlYwbEdTUT09';
    const url = `${MOCK_EMPTY_URL}${pathname}${search}${hash}`;

    const res = filterUrlParams({
      url,
      limit: 600,
      keepKey: ['name'],
    });
    expect(res).toBe(`${MOCK_EMPTY_URL}/#/detail?name=mike`);
  });
});
