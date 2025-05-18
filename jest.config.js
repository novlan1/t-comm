// process.env.TZ = 'GMT+0800';

module.exports = {
  globalSetup: './jest.config-global-setup.js',
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts'],
  globals: {
    'ts-jest': {
      tsconfig: {
        target: 'ES2019',
      },
    },
  },
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(j|t)sx?$': 'ts-jest',
  },
  // transform: {
  //   '^.+\\.[t|j]sx?$': [
  //     'babel-jest',
  //     {
  //       presets: ['@babel/preset-env', '@babel/preset-typescript'],
  //     },
  //   ],
  // },
  transformIgnorePatterns: ['/node_modules/*'],
  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs',
  },
  testEnvironment: 'jsdom',
  coverageDirectory: '<rootDir>/test/unit/coverage',
};
