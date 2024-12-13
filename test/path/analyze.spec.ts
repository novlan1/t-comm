import { parseComponentPath } from '../../src';

const MOCK_PATH = 'node-modules/@ttt/press-plus/press-prize-list/press-prize-list.vue';

describe('parseComponentPath', () => {
  it('path like ./', () => {
    expect(parseComponentPath(
      MOCK_PATH,
      './press-mock-component.vue',
    )).toBe('node-modules/@ttt/press-plus/press-prize-list/press-mock-component.vue');
  });


  it('path like ../', () => {
    expect(parseComponentPath(
      MOCK_PATH,
      '../press-mock-component.vue',
    )).toBe('node-modules/@ttt/press-plus/press-mock-component.vue');

    expect(parseComponentPath(
      MOCK_PATH,
      '../../press-mock-component.vue',
    )).toBe('node-modules/@ttt/press-mock-component.vue');

    expect(parseComponentPath(
      MOCK_PATH,
      '../../../press-mock-component.vue',
    )).toBe('node-modules/press-mock-component.vue');
  });

  it('path like /', () => {
    expect(parseComponentPath(
      `/${MOCK_PATH}`,
      '../press-mock-component.vue',
    )).toBe(MOCK_PATH);
  });

  it('relativePath is absolute', () => {
    expect(parseComponentPath(
      'views/fake-home/index',
      '/local-component/module/tip-match/global-component/index-mp',
    )).toBe('local-component/module/tip-match/global-component/index-mp');

    expect(parseComponentPath(
      'views/fake-home',
      '/local-component/module/tip-match/global-component/index-mp',
    )).toBe('local-component/module/tip-match/global-component/index-mp');

    expect(parseComponentPath(
      'views',
      '/local-component/module/tip-match/global-component/index-mp',
    )).toBe('local-component/module/tip-match/global-component/index-mp');
  });
});
