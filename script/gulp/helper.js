const path = require('path');

const chalk = require('chalk');

const log = {
  progress: (text) => {
    console.log(chalk.green(text));
  },
  error: (text) => {
    console.log(chalk.red(text));
  },
};


const PATHS = {
  root: path.join(process.cwd(), '/'),
  lib: path.join(process.cwd(), '/lib'),
  es: path.join(process.cwd(), '/es'),
};


module.exports = {
  PATHS,
  log,
};
