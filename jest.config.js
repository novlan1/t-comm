process.env.TZ = 'GMT+0800';

module.exports = {
  globalSetup: './jest-global-setup.js',
  preset: 'ts-jest',
  transform: {
    '^.+\\.[t|j]sx?$': [
      'babel-jest',
      {
        presets: ['@babel/preset-env', '@babel/preset-typescript'],
      },
    ],
  },
  testEnvironment: 'jsdom',
};
