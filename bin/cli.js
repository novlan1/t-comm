#!/usr/bin/env node
const { program } = require('commander');
const { version } = require('../package.json');
const { writeEnvAndPrivateKeyByOptions, mpUploadAndReportByOptions } = require('../lib');

const { publish } = require('./publish');
const { deployGithubPage } = require('./deploy-github-page');

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
  .action(publish);


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
  .action(writeEnvAndPrivateKeyByOptions);


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
  .action(mpUploadAndReportByOptions);


program
  .command('deploy:github')
  .description('Deploy Github Page')
  .option('--repo <repo>', 'Repository Name')
  .option('--user <user>', 'User Name')
  .option('--email <email>', 'Login Email')
  .option('--dir <dir>', 'Target Directory')
  .option('--token <token>', 'Github Token')
  .option('--branch <branch>', 'Repository Branch')
  .option('--message <message>', 'Commit Message')
  .action(deployGithubPage);


program.parse();


