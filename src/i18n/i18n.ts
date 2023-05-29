import axios from 'axios';

export function getI18nToken(appId: string, appKey: string) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/api/openapi/token',
      params: {
        app_id: appId,
        app_key: appKey,
      },
    }).then((res) => {
      const token = res?.data?.data?.access_token || '';
      console.log(`[i18n] token is ${token}`);
      resolve(token);
    })
      .catch((err) => {
        reject(err);
      });
  });
}

export function importI18nDict({
  projectId,
  moduleCode = 'default',
  versionCode = 'v1.0',
  accessToken,
  data,
}: {
  projectId: string;
  moduleCode?: string;
  versionCode?: string;
  accessToken: string;
  data: object;
}) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/api/openapi/dict/imports',
      data: {
        project_id: projectId,
        module_code: moduleCode,
        version_code: versionCode,
        access_token: accessToken,
        data,
      },
      method: 'POST',
    }).then((res) => {
      resolve(res);
    })
      .catch((err) => {
        reject(err);
      });
  });
}

