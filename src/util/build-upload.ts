/* eslint-disable @typescript-eslint/no-require-imports */
import { execCommand } from './node-command';


const DEFAULT_HOST_TARGET_DIR = '/root/ft_local';

function build({ files, bundleName }: {
  files: Array<string>;
  bundleName: string;
}) {
  return new Promise((resolve, reject) => {
    console.log('[build] 开始打包...');
    console.log('[build] Files: ', files);

    // 创建dist目录
    const fse = require('fs-extra');
    fse.ensureDirSync('./dist');

    const tar = require('tar');
    // 打包
    tar.c(
      {
        gzip: true,
        file: `dist/${bundleName}.tar.gz`,
        filter() {
          return true;
        },
      },
      [...files],
    ).then(() => {
      console.log('[build] 打包完成');
      resolve(true);
    })
      .catch((err: unknown) => {
        console.log('[build] 打包失败');
        reject(err);
      });
  });
}


function upload({
  root,
  bundleName,
  hostName,
  hostPwd,
  hostTargetDir = DEFAULT_HOST_TARGET_DIR,
}: {
  root: string;
  bundleName: string;
  hostName: string;
  hostPwd: string;
  hostTargetDir?: string;
}) {
  if (!hostName || !hostName || !bundleName) {
    throw new Error('参数不全');
  }
  console.log('[upload] 开始上传...');

  const publishBash = require('path').resolve(__dirname, '../script/publish.sh');

  execCommand(`sh ${publishBash} ./dist/${bundleName}.tar.gz ${hostTargetDir} ${hostName} ${hostPwd}`, root, 'inherit');

  console.log('[upload] 上传完成');
}


/**
 * 打包并上传到服务器
 * @param {object} options 配置
 * @param {string} options.hostName 服务器名称
 * @param {string} options.hostPwd 服务器密码
 * @param {string} [options.root] 项目根目录
 * @param {string} [options.bundleName] 打包文件名称
 * @example
 *
 * await buildAndUpload({
 *   hostName: '9.9.9.9',
 *   hostPwd: 'xxxx',
 *   bundleName: 'cron-job-svr',
 * });
 *
 */
export async function buildAndUpload({
  root = process.cwd(),
  bundleName = 'bundle',
  hostName,
  hostPwd,
  hostTargetDir,
}: {
  root?: string;
  bundleName?: string;
  hostName: string;
  hostPwd: string;
  hostTargetDir: string;
}) {
  if (!root) {
    root = process.cwd();
  }
  const path = require('path');
  const pkgPath = path.resolve(root, 'package.json');
  const fs = require('fs');
  if (!fs.existsSync(root)) {
    return;
  }
  if (!fs.existsSync(pkgPath)) {
    throw new Error('ERROR: package.json 不存在');
  }

  const files = require(pkgPath).files || [];

  if (files.indexOf('.env.local') < 0 && fs.existsSync('.env.local')) {
    files.push('.env.local');
  }

  const flag = await build({ files, bundleName });
  if (!flag) return;

  upload({
    root,
    bundleName,
    hostName,
    hostPwd,
    hostTargetDir,
  });
}

