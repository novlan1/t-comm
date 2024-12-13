import { getRelativePath } from '../../src';


describe('getRelativePath', () => {
  it('in different dir', () => {
    expect(getRelativePath(
      'component/ui/match/dialog/dialog-a.vue',
      'component/ui/match/model/model-a.vue',
    )).toBe('../model/model-a.vue');

    expect(getRelativePath(
      'component/ui/match/dialog/dialog-a.vue',
      'node-modules/@ttt/press-plus/press-a/press-a.vue',
    )).toBe('../../../../node-modules/@ttt/press-plus/press-a/press-a.vue');
  });

  it('in same dir', () => {
    expect(getRelativePath(
      'component/ui/match/dialog/dialog-a.vue',
      'component/ui/match/dialog/dialog-b.vue',
    )).toBe('./dialog-b.vue');

    expect(getRelativePath('a', 'b')).toBe('./b');
  });
});
