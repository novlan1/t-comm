import { getEnvVariableMap } from '../../src';

describe('getEnvVariableMap', () => {
  it('getEnvVariableMap', () => {
    const content = `
UNI_INPUT_DIR = './src/project/user'
VUE_APP_DIR = project/user

#TEST = 123
    `;
    expect(getEnvVariableMap(content)).toEqual({
      UNI_INPUT_DIR: '\'./src/project/user\'',
      VUE_APP_DIR: 'project/user',
    });
  });
});
