#!/usr/bin/env node
const { program } = require('commander');
const { version } = require('../package.json');
const { execSync } = require('child_process');


program
  .name('t-comm')
  .description('CLI for t-comm')
  .version(version);


program.command('publish')
  .description('Publish to server with bash script')
  // .argument('<string>', 'string to split')
  // .option('--first', 'display just the first substring')
  .option('-s, --source <string>', 'source dir or file')
  .option('-t, --target <string>', 'target dir')
  .option('-n, --name <ip>', 'server host name')
  .option('-p, --password <string>', 'server host password')
  .option('-o, --port <number>', 'server port', 36000)
  .action((options) => {
    console.log('[options] ', options);
    const { source, target, name, password, port } = options;

    if (!source || !target || !name || !password || !port) {
      console.error('缺少必要参数，请检查！');
      return;
    }

    publishWithBash({
      source,
      target,
      name,
      password,
      port,
    });
  });


program.parse();


function publishWithBash({
  source,
  target,
  name,
  password,
  port,
}) {
  const publishBash = require('path').resolve(__dirname, './publish.sh');
  const command = `sh ${publishBash} ${source} ${target} ${name} ${password} ${port}`;

  execSync(command, {
    cwd: process.cwd(),
    encoding: 'utf-8',
    stdio: 'inherit',
  });
}
