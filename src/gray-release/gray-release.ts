import type { IGlobalGrayPublishConfig } from './types';


export function getImageName({
  projectName,
  subProjectName,
  branch,
}: {
  projectName: string;
  subProjectName: string;
  branch: string;
}) {
  const innerParse = (str: string) => str.replace(/\//g, '.');
  const prefix = `${innerParse(projectName)}.${innerParse(subProjectName)}`;
  if (branch === 'release') {
    return prefix;
  }
  const result = `${prefix}.${innerParse(branch)}`;
  return result;
}


export function parseGrayPublishConfig(config: Record<string, Record<string, Record<string, Record<string, string>>>> = {}) {
  const map: IGlobalGrayPublishConfig = {};

  Object.keys(config).forEach((projectName) => {
    const projectMap = config[projectName];

    Object.keys(projectMap).forEach((subProjectName) => {
      const subProjectMap = projectMap[subProjectName];

      Object.keys(subProjectMap).forEach((branch) => {
        const coreConfig = subProjectMap[branch];
        const curPackageName = getImageName({
          projectName,
          subProjectName,
          branch,
        });

        map[curPackageName] = coreConfig;
      });
    });
  });

  return map;
}


export function getCurrentProjectUseGray(fullSubProjectName: string, globalGrayPublishConfig: IGlobalGrayPublishConfig) {
  const keys = Object.keys(globalGrayPublishConfig);

  const list = keys
    .filter(key => key === fullSubProjectName || key.startsWith(`${fullSubProjectName}.`))
    .filter((packageName) => {
      const info = globalGrayPublishConfig[packageName];

      return !!(info.grayVersion && info.grayPercent && info.cookieId);
    })
    .map((packageName) => {
      const parsedBranch = packageName.replace(fullSubProjectName, '');

      return {
        fullSubProjectName,
        packageName,
        parsedBranch,
        cookieId: globalGrayPublishConfig[packageName].cookieId || '',
      };
    });

  return list;
}


