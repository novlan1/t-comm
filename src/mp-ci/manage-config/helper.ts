

export function sortRobotMapByRobot(robotMap: {
  [k: string]: {
    test: number;
    [k: string]: any;
  }
} = {}) {
  if (!robotMap) {
    return robotMap;
  }

  const list = Object.keys(robotMap).map(branch => ({
    ...(robotMap[branch]),
    branch,
  }));

  list.sort((a, b) => a.test - b.test);

  const result = list.reduce((acc: typeof robotMap, item) => {
    const {
      branch,
    } = item;

    acc[branch] = {
      ...item,
    };

    delete acc[branch].branch;
    return acc;
  }, {});

  return result;
}


function findEmptyLine(lines: Array<number>) {
  // 3,4,5 ... 102
  const fakeList = Array.from({ length: 100 }).map((_, i) => i + 3);
  const rest = fakeList.filter(item => !lines.includes(item));
  return rest;
}


export function updateQQTencentSheetLine(rainbowConfig: Record<string, any>) {
  const { qqRobotMap = {} } = rainbowConfig || {};
  const lines: Array<number> = [];

  Object.keys(qqRobotMap).forEach((branch) => {
    const value = qqRobotMap[branch] || {};
    const { tencentDocsLine = {}  } = value;
    const curLines = Object.values(tencentDocsLine as Record<string, number>).map(item => +item);
    lines.push(...curLines);
  });

  const restLines = findEmptyLine(lines);
  let cur = 0;

  Object.keys(qqRobotMap).forEach((branch) => {
    const value = qqRobotMap[branch] || {};
    if (!value.tencentDocsLine) {
      const temp: Record<string, any> = {};
      if (value.test) {
        temp.test = restLines[cur];
        cur += 1;
      }
      if (value.release) {
        temp.release = restLines[cur];
        cur += 1;
      }
      value.tencentDocsLine = temp;
    }
  });
}
