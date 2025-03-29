import { sortObjectByKey  } from '../../base/object/sort';

import { ERROR_MAP } from './config';
import { sortRobotMapByRobot, updateQQTencentSheetLine } from './helper';


function changeRobot({
  info,
  robot,
  env,
  testRobot,
  releaseRobot,
}: {
  info: Record<string, any>;
  testRobot?: number;
  releaseRobot?: number;

  robot?: number;
  env?: string;
}) {
  if (robot && env) {
    info[env] = robot;
  } else {
    info.test = testRobot;
    info.release = releaseRobot;
  }
}

export function updateMpCIRainbowConfig({
  rainbowConfig,
  branch,
  originBranch,

  testRobot,
  releaseRobot,

  robot,
  env,

  useMpQQ,
  // errorMap = ERROR_MAP,
}: {
  rainbowConfig: Record<string, any>;
  branch: string;
  originBranch?: string;
  testRobot?: number;
  releaseRobot?: number;

  robot?: number;
  env?: string;

  useMpQQ?: boolean;
  errorMap?: typeof ERROR_MAP;
}): {
    error: string;
  } |{
    newRainbowConfig: Record<string, any>;
    rainbowKey: string;
  } {
  function setWxRobot() {
    if (!rainbowConfig.robotMap[branch]) {
      rainbowConfig.robotMap[branch] = {};
    }

    changeRobot({
      info: rainbowConfig.robotMap[branch],
      testRobot,
      releaseRobot,
      robot,
      env,
    });
  }

  function setQQRobot() {
    if (!rainbowConfig.qqRobotMap) {
      rainbowConfig.qqRobotMap = {};
    }

    if (useMpQQ) {
      if (!rainbowConfig.qqRobotMap[branch]) {
        rainbowConfig.qqRobotMap[branch] = {};
      }

      changeRobot({
        info: rainbowConfig.qqRobotMap[branch],
        testRobot,
        releaseRobot,
        robot,
        env,
      });
    } else {
      if (rainbowConfig.qqRobotMap?.[branch]) {
        delete rainbowConfig.qqRobotMap[branch].test;
        delete rainbowConfig.qqRobotMap[branch].release;
      }
    }
  }

  // const originUseMpQQ = !!rainbowConfig.qqRobotMap?.[branch];

  if (originBranch) {
    if (rainbowConfig.robotMap?.[originBranch]) {
      delete rainbowConfig.robotMap[originBranch].test;
      delete rainbowConfig.robotMap[originBranch].release;
    }
    if (rainbowConfig.qqRobotMap?.[originBranch]) {
      delete rainbowConfig.qqRobotMap[originBranch].test;
      delete rainbowConfig.qqRobotMap[originBranch].release;
      delete rainbowConfig.qqRobotMap[originBranch].tencentDocsLine;
    }
  }

  setWxRobot();
  setQQRobot();
  // 新增
  // if (!originBranch) {
  // // 该分支已经有配置了
  //   if (rainbowConfig.robotMap[branch]) {
  //     return {
  //       error: errorMap.BRANCH_EXIST,
  //     };
  //   }

  //   setWxRobot();
  //   setQQRobot();
  // } else {
  //   // 修改

  //   // 分支相同，说明是仅修改qq配置
  //   if (originBranch === branch) {
  //     if (originUseMpQQ === useMpQQ) {
  //       return {
  //         error: errorMap.SAME_CONFIG,
  //       };
  //     }
  //     setQQRobot();
  //   } else {
  //     if (rainbowConfig.robotMap[branch]) {
  //       return {
  //         error: errorMap.BRANCH_EXIST,
  //       };
  //     }
  //     setWxRobot();
  //     setQQRobot();
  //     delete rainbowConfig.robotMap[originBranch];
  //     delete rainbowConfig.qqRobotMap[originBranch];
  //   }
  // }


  rainbowConfig.robotMap = sortRobotMapByRobot(rainbowConfig.robotMap);
  const { rainbowKey } = rainbowConfig;
  delete rainbowConfig.rainbowKey;

  const newRainbowConfig = sortObjectByKey(rainbowConfig);
  updateQQTencentSheetLine(newRainbowConfig);

  return {
    newRainbowConfig,
    rainbowKey,
  };
}

