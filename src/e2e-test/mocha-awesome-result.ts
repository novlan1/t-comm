function getProjectName(path: string) {
  const reg = /e2e\/([^/]+)/;
  const match = path.match(reg);
  return  match?.[1] || '';
}

function getModuleName(fileName: string) {
  const reg = /([^/]+)\.cy\.(js|ts)/;
  const match = fileName.match(reg);
  return  match?.[1] || '';
}


export function parseMochaAwesomeResult(report: {
  results: Array<{
    suites: Array<{
      tests: Array<{
        duration: number;
        pass: number;
        fail: number;
        pending: number;
      }>
    }>
    file: string;
  }>
}) {
  const { results } = report;

  const map: {
    [k: string]: {
      duration: number;
      passes: number;
      failures: number;
      pending: number;
      tests: number;

      files: {
        [k: string]: {
          duration: number;
          passes: number;
          failures: number;
          pending: number;
          tests: number;
          testList: Array<{

          }>
        }
      }
    }
  } = {};

  for (const result of results) {
    const { suites, file } = result;
    const project = getProjectName(file);
    const moduleName = getModuleName(file);
    if (!map[project]) {
      map[project] = {
        duration: 0,
        passes: 0,
        failures: 0,
        pending: 0,
        tests: 0,
        files: {},
      };
    }

    if (!map[project].files[moduleName]) {
      map[project].files[moduleName] = {
        duration: 0,
        passes: 0,
        failures: 0,
        pending: 0,
        tests: 0,
        testList: [],
      };
    }

    for (const suit of suites) {
      const { tests } = suit;
      for (const test of tests) {
        map[project].duration += test.duration;
        map[project].passes += +test.pass;
        map[project].failures += +test.fail;
        map[project].pending += +test.pending;

        map[project].files[moduleName].duration += test.duration;
        map[project].files[moduleName].passes += +test.pass;
        map[project].files[moduleName].failures += +test.fail;
        map[project].files[moduleName].pending += +test.pending;
        map[project].files[moduleName].testList.push(test);
      }
    }
  }

  Object.keys(map).forEach((project) => {
    const { passes, failures, pending } = map[project];
    map[project].tests = passes + failures + pending;

    Object.keys(map[project].files).forEach((file) => {
      const { passes, failures, pending } = map[project].files[file];
      map[project].files[file].tests = passes + failures + pending;
    });
  });
  return map;
}
