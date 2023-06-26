import { ERROR_MAP } from './config';
import { sortRobotMapByRobot, updateQQTencentSheetLine } from './helper';
import { sortObjectByKey  } from '../../base/object/sort';

export function updateMpCIRainbowConfig({
  rainbowConfig,
  branch,
  originBranch,
  testRobot,
  releaseRobot,
  useMpQQ,
  errorMap = ERROR_MAP,
}: {
  rainbowConfig: Record<string, any>;
  branch: string;
  originBranch?: string;
  testRobot: number;
  releaseRobot: number;
  useMpQQ?: boolean;
  errorMap?: typeof ERROR_MAP;
}): {
    error: string;
  } | {
    newRainbowConfig: Record<string, any>;
    rainbowKey: string;
  } {
  function setWxRobot() {
    rainbowConfig.robotMap[branch]  = {
      test: testRobot,
      release: releaseRobot,
    };
  }

  function setQQRobot() {
    if (!rainbowConfig.qqRobotMap) {
      rainbowConfig.qqRobotMap = {};
    }

    if (useMpQQ) {
      if (!rainbowConfig.qqRobotMap[branch]) {
        rainbowConfig.qqRobotMap[branch] = {};
      }
      rainbowConfig.qqRobotMap[branch].test = testRobot;
      rainbowConfig.qqRobotMap[branch].release = releaseRobot;
    } else {
      delete rainbowConfig.qqRobotMap[branch];
    }
  }

  const originUseMpQQ = !!rainbowConfig.qqRobotMap?.[branch];

  // 新增
  if (!originBranch) {
  // 该分支已经有配置了
    if (rainbowConfig.robotMap[branch]) {
      return {
        error: errorMap.BRANCH_EXIST,
      };
    }

    setWxRobot();
    setQQRobot();
  } else {
    // 修改

    // 分支相同，说明是仅修改qq配置
    if (originBranch === branch) {
      if (originUseMpQQ === useMpQQ) {
        return {
          error: errorMap.SAME_CONFIG,
        };
      }
      setQQRobot();
    } else {
      if (rainbowConfig.robotMap[branch]) {
        return {
          error: errorMap.BRANCH_EXIST,
        };
      }
      setWxRobot();
      setQQRobot();
      delete rainbowConfig.robotMap[originBranch];
      delete rainbowConfig.qqRobotMap[originBranch];
    }
  }


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

