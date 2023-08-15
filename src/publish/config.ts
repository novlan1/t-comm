export const ENV_MAP = {
  DEV_HOST_NAME: 'DEV_HOST_NAME',
  DEV_HOST_PWD: 'DEV_HOST_PWD',

  VUE_APP_DIR: 'VUE_APP_DIR',
  VUE_APP_AUTHOR: 'VUE_APP_AUTHOR',
  VUE_APP_PATH_PROD: 'VUE_APP_PATH_PROD',
  VUE_APP_PATH_TEST: 'VUE_APP_PATH_TEST',
} as const;

export const PUBLISH_ENV_MAP = {
  PROD: 'prod',
  TEST: 'test',
  DEV_CLOUD: 'devcloud',
} as const;

export const PUBLISH_HOST_ENV = {
  PROD: 'web-static',
  TEST: 'web-test',
} as const;
