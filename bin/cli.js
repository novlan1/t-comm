#!/usr/bin/env node
const { program } = require('commander');
const { execSync } = require('child_process');

const { version } = require('../package.json');
const { writeEnvAndPrivateKey, mpUploadAndReport, getInnerBundleBuildDesc } = require('../lib');

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


program.command('mp-env')
  .description('Write Env and Private Key to File')
  // base
  .option('-b, --branch <string>', 'git branch')
  .option('-e --env <string>', 'publish env', 'test')
  .option('-r --root <string>', 'target file path', process.cwd())
  // rainbow
  .option('-k, --configKey <string>', 'rainbow config key')
  .option('-a, --appid <string>', 'rainbow app id')
  .option('--envName <string>', 'rainbow env name', 'Default')
  .option('-g, --groupName <string>', 'rainbow group name')
  .action((options) => {
    console.log('[options] ', options);
    const {
      branch,
      env,
      root,
      configKey: rainbowConfigKey,
      appid: rainbowAppId,
      envName: rainbowEnvName,
      groupName: rainbowGroupName,
    } = options;

    if (!branch
       || !env
       || !root
       || !rainbowConfigKey
       || !rainbowAppId
       || !rainbowEnvName
       || !rainbowGroupName
    ) {
      console.error('缺少必要参数，请检查！');
      return;
    }

    writeEnvAndPrivateKey({
      branch,
      env,
      root,

      rainbowConfigKey,
      rainbowAppId,
      rainbowEnvName,
      rainbowGroupName,
    });
  });


program.command('mp-upload')
  .description('Upload MiniProgram Bundle and Report')
  // base
  .option('-b, --branch <string>', 'git branch')
  .option('-e --env <string>', 'publish env', 'test')
  .option('-r --root <string>', 'target file path', process.cwd())
  // rainbow
  .option('-k, --configKey <string>', 'rainbow config key')
  .option('-a, --appid <string>', 'rainbow app id')
  .option('--envName <string>', 'rainbow env name', 'Default')
  .option('-g, --groupName <string>', 'rainbow group name')
  // rd
  .option('--rdHost <string>', 'host of R&D platform')
  // bk
  .option('--bkStartType <string>', 'start type in bk ci')
  .option('--bkBuildUrl <string>', 'build url in bk ci')
  .option('--bkStartUserName <string>', 'start user name in bk ci')
  .option('--bkPipelineId <string>', 'pipeline id in bk ci')
  // commit
  .option('--commitAuthor <string>', 'author of last commit')
  .option('--commitMessage <string>', 'message of last commit')
  .option('--commitHash <string>', 'hash of last commit')
  // version
  .option('--mpVersion <string>', 'miniProgram bundle version')

  .action((options) => {
    console.log('[options] ', options);
    const {
      branch,
      env,
      root,

      configKey: rainbowConfigKey,
      appid: rainbowAppId,
      envName: rainbowEnvName,
      groupName: rainbowGroupName,

      rdHost,
      bkStartType,
      bkBuildUrl,
      bkStartUserName,
      bkPipelineId,

      commitAuthor,
      commitMessage,
      commitHash,
      mpVersion,
    } = options;

    if (!branch
     || !env
     || !root

     || !rainbowConfigKey
     || !rainbowAppId
     || !rainbowEnvName
     || !rainbowGroupName

     || !rdHost
     || !bkStartType
     || !bkBuildUrl
     || !bkStartUserName
     || !bkPipelineId

     || !commitAuthor
     || !commitMessage
     || !commitHash
     || !mpVersion
    ) {
      console.error('缺少必要参数，请检查！');
      return;
    }

    mpUploadAndReport({
      branch,
      env,
      root,

      rainbowConfigKey,
      rainbowAppId,
      rainbowEnvName,
      rainbowGroupName,

      rdHost,
      bkStartType,
      bkBuildUrl,
      bkStartUserName,
      bkPipelineId,

      commitInfo: {
        author: commitAuthor,
        message: commitMessage,
        hash: commitHash,
        branch,
      },

      buildDesc: getInnerBundleBuildDesc({
        env,
        branch,
        author: commitAuthor,
        message: commitMessage,
      }),
      version: mpVersion,
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
