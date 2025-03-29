import { filterUrlParams } from '../../src';


const MOCK_EMPTY_URL = 'https://igame.qq.com';


describe('filterUrlParams', () => {
  const pathname = '/';
  it('未超过长度限制', () => {
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


  it('search 参数超长', () => {
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

  it('search参数超长 + 强制 history 模式返回', () => {
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


  it('hash 参数超长', () => {
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


  it('参数超长，并且支持识别路径', () => {
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
