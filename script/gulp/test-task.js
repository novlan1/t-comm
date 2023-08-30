// const { buildByRollup } = require('./build-by-rollup-up');
// const { clearLibFile } = require('./clear-lib');
const { generateDts } = require('./generate-dts');

// const BUILD_START_INDEX = 53;

function main() {
  const cb = () => {};

  // clearLibFile(cb);
  // buildByRollup(cb, 0);
  // buildByRollup(cb, 26);
  // buildByRollup(cb, 53);
  generateDts(cb);
}


main();
