import { getSubmodulePathList } from '../../src';


describe('getSubmodulePathList', () => {
  it('getSubmodulePathList', () => {
    expect(getSubmodulePathList()).toMatchObject([]);
  });
});
