import { parseCommentJson } from '../../src';

describe('parseCommentJson', () => {
  it('parseCommentJson', () => {
    const content = `// xxxxx
    {
      "path": "create/create",
      "name": "create",
      "aliasPath": "/create",
      "style": {
        "navigationBarTitleText": "xxxxx//xxxxx"
// #ifdef MP-WEIXIN
        // 要保证各个平台json格式正确，需要把逗号住
        ,
        "usingComponents": {
          "live-info-comp": "plugin://liveAccountPlugin/hello-component"
        }
        // #endif
      }
    }
    `;
    expect(parseCommentJson(content)).toEqual({
      path: 'create/create',
      name: 'create',
      aliasPath: '/create',
      style: {
        navigationBarTitleText: 'xxxxx//xxxxx',
        usingComponents: {
          'live-info-comp': 'plugin://liveAccountPlugin/hello-component',
        },
      },
    });
  });
});
