/* eslint-disable @typescript-eslint/no-require-imports */
import { sendWxRobotMarkdown } from '../wecom-robot/base';
import { getGitCommitInfo } from '../git/git';
import { timeStampFormat } from '../date/time';
import { addTextForImg } from '../canvas/img-text';
import { uploadCOSFile } from '../cos/cos';
import { saveBase64ImgToFile } from '../node-img/img';
import { formatBite } from '../util/format-bite';

import { OptionsType } from './type';
import { DEFAULT_BUILD_SETTING, BUNDLE_NAME_MAP, MAX_TRY_TIMES_MAP, PREVIEW_IMG_MAX_WORD_LENGTH } from './config';


/**
 * 解析上传结果
 */
function parseUploadResult(result) {
  const {
    subPackageInfo,
  } = result;
  subPackageInfo.reverse();
  const list = subPackageInfo.sort((a, b) => {
    const keys = Object.keys(BUNDLE_NAME_MAP);
    if (keys.indexOf(a) > -1 || keys.indexOf(b) > -1) {
      return keys.indexOf(b) - keys.indexOf(a);
    }
    return b.size - a.size;
  })
    .map(pkg => `- ${BUNDLE_NAME_MAP[pkg.name] || pkg.name}: ${formatBite(pkg.size)}`);
  list.unshift('包体积大小：');
  return list;
}


export class MpCI {
  ciLib: any;
  options: OptionsType;

  projectCI: any;
  savePreviewPath: any;

  appId: string;
  appName: string;
  type: string;
  root: string;
  ignores: Array<string>;
  pkgFile: string;
  env: string;
  robotNumber: number;
  webhookUrl?: string = '';
  chatId?: string = '';

  buildSetting: any;
  projectPath: string;
  privateKeyPath: string;
  cosInfo: any;
  commitInfo: any;
  buildDesc: string;
  buildTime?: string;
  version: string;

  tryTimesMap = {
    UPLOAD: 1,
    PREVIEW: 1,
  };

  /**
  * 小程序自动化构建工具
  * @param {object} options 选项
  *
  * @example
  *
  * const { MpCI, fetchRainbowConfig } = require('t-comm');
  *
  * const env = \"${env}\"
  * const branch = \"${branch}\"
  *
  * const root = \"${WORKSPACE}\";
  *
  * async function getCIConfig() {
  *   let res = {};
  *   const str = await fetchRainbowConfig('mp_ci', {
  *     appId: '',
  *     envName: 'x',
  *     groupName: 'x',
  *   });
  *   try {
  *     res = JSON.parse(str);
  *   } catch (err) {}
  *   return res;
  * }
  *
  * function getRobot(config = {}) {
  *   return config?.robotMap?.[branch]?.[env] || 1;
  * }
  *
  * async function main() {
  *   const config = await getCIConfig();
  *   console.log('config: \n', config, typeof config);
  *   const {
  *     appName,
  *     appId,
  *     webhookUrl,
  *     chatId,
  *     cosInfo,
  *   } = config;
  *
  *   const ci = new MpCI({
  *     appName,
  *     appId,
  *     root,
  *     env,
  *     robotNumber: getRobot(config),
  *
  *     webhookUrl,
  *     chatId,
  *
  *     cosInfo,
  *   });
  *
  *   await ci.upload();
  *   await ci.preview();
  *   await ci.sendRobotMsg();
  * }
  *
  * main();
  */
  constructor(options: OptionsType) {
    const path = require('path');
    const fs = require('fs');
    let ci;
    try {
      ci = require('miniprogram-ci');
    } catch (err) {
      console.log('err', err);
    }
    this.ciLib = ci;

    this.options = options;
    this.projectCI = null;
    this.savePreviewPath = path.resolve(process.cwd(), 'mp_ci_preview_destination.png');
    const {
      appId,
      appName,
      projectPath,
      privateKeyPath,
      ignores,
      type,
      root,
      env,
      robotNumber,
      buildSetting,

      webhookUrl,
      chatId,
      cosInfo,
    } = options;

    this.appId = appId;
    this.appName = appName || '';
    this.type = type || 'miniProgram';

    this.root = root || process.cwd();
    this.ignores = ignores || ['node_modules/**/*'];
    this.pkgFile = path.resolve(this.root, './package.json');

    this.env = env || 'test';
    this.robotNumber = robotNumber || 30;

    this.webhookUrl = webhookUrl;
    this.chatId = chatId;

    this.buildSetting = {
      ...DEFAULT_BUILD_SETTING,
      ...(buildSetting || {}),

    };
    this.projectPath = projectPath || '';
    this.privateKeyPath = privateKeyPath || '';
    this.cosInfo = cosInfo || {};

    if (!this.projectPath) {
      this.projectPath = path.resolve(this.root, 'dist/build/mp-weixin');
    }
    if (!this.privateKeyPath) {
      this.privateKeyPath = path.resolve(this.root, 'private.key');
    }

    if (this.ciLib && !fs.existsSync(this.privateKeyPath)) {
      throw new Error('ERROR: privateKeyPath 位置不存在');
    }
    if (!fs.existsSync(this.projectPath)) {
      throw new Error('ERROR: projectPath 位置不存在');
    }

    if (!fs.existsSync(this.pkgFile)) {
      throw new Error('ERROR: package.json 不存在');
    }

    if (this.ciLib) {
      this.init();
    }

    this.getBuildTime();

    this.commitInfo = getGitCommitInfo(this.root);
    this.buildDesc = this.getBuildDesc() || '';
    this.version = this.getVersion();
  }

  init() {
    const { appId, projectPath, privateKeyPath, ignores, type } = this;

    this.projectCI = new this.ciLib.Project({
      appid: appId,
      type,
      projectPath,
      privateKeyPath,
      ignores,
    });
  }

  getBuildTime() {
    this.buildTime = timeStampFormat(Date.now(), 'yyyy-MM-dd hh:mm:ss');
  }

  getPkgInfo() {
    return require(this.pkgFile) || {};
  }

  getVersion() {
    return this.getPkgInfo().version;
  }

  getBuildDesc() {
    const { env, commitInfo } = this;
    const buildDesc = `环境: ${env || ''}, 分支: ${commitInfo.branch}，最后提交: ${commitInfo.author} - ${commitInfo.message}`;
    return buildDesc;
  }

  /**
   * 上传
   */
  async upload() {
    try {
      await this.tryUpload();
    } catch (err) {
      if (this.tryTimesMap.UPLOAD < MAX_TRY_TIMES_MAP.UPLOAD) {
        this.tryTimesMap.UPLOAD += 1;

        await this.tryUpload();
      }
    }
  }

  async tryUpload() {
    const { robotNumber, version, buildDesc } = this;

    const uploadResult = await this.ciLib.upload({
      project: this.projectCI,
      version,
      desc: buildDesc,
      robot: robotNumber,
      setting: this.buildSetting,
    });
    this.getBuildTime();
    console.log('UploadResult:\n', uploadResult);
  }

  async preview() {
    try {
      await this.tryPreview();
    } catch (err) {
      if (this.tryTimesMap.UPLOAD < MAX_TRY_TIMES_MAP.UPLOAD) {
        this.tryTimesMap.UPLOAD += 1;

        await this.tryPreview();
      }
    }
  }

  /**
   * 预览
   */
  async tryPreview() {
    const previewResult = await this.ciLib.preview({
      project: this.projectCI,
      desc: this.buildDesc,
      setting: this.buildSetting,
      qrcodeFormat: 'image',
      qrcodeOutputDest: this.savePreviewPath,
      robot: this.robotNumber,
      // pagePath: 'pages/index/index', // 预览页面
      // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`&`
    });
    console.log('PreviewResult:\n', previewResult);

    await this.uploadPreviewImg(previewResult);
  }

  /**
   * 上传预览图片到COS
   */
  async uploadPreviewImg(previewResult) {
    const { appName, robotNumber, env, buildTime, commitInfo, version } = this;

    const textList = [
      `【${appName}自动构建】`,
      `版本: ${version}`,
      `提交者: CI机器人${robotNumber}`,
      `环境: ${env}`,
      `分支: ${commitInfo.branch}`,
      `构建时间: ${buildTime}`,
      `最后提交: ${commitInfo.author} - ${commitInfo.message}`,
      ...parseUploadResult(previewResult),
    ].map((item) => {
      if (item.length > PREVIEW_IMG_MAX_WORD_LENGTH) return `${item.slice(0, PREVIEW_IMG_MAX_WORD_LENGTH)}...`;
      return item;
    });

    const newPreviewImg = await addTextForImg({
      width: 300,
      height: 300,
      imgPath: this.savePreviewPath,
      textList,
    });

    await saveBase64ImgToFile({
      imgUrl: newPreviewImg,
      savePath: this.savePreviewPath,
    });
    this.uploadFiles([
      {
        key: this.getCosKey(),
        path: this.savePreviewPath,
      },
    ]);
  }

  getCosKey() {
    const { cosInfo, env, commitInfo } = this;
    return `${cosInfo.dir}/${commitInfo.branch.replace(/\//g, '-')}_${env}.png`;
  }

  getCOSFilePath() {
    const { bucket, region } = this.cosInfo;
    const cosKey = this.getCosKey();
    return `https://${bucket}.cos.${region}.myqcloud.com/${cosKey}`;
  }

  /**
   * 发送机器人消息
   */
  async sendRobotMsg(hasImg = true) {
    const { robotNumber, webhookUrl, env, commitInfo, version } = this;
    let { chatId } = this;
    if (!webhookUrl) {
      return;
    }
    if (!chatId) {
      chatId = undefined;
    }

    const descList = [
      `分支：${commitInfo.branch}`,
      `环境：${env}`,
      `版本：${version || ''}`,
      `机器人：${robotNumber}`,
      `最后提交: ${commitInfo.author} - ${commitInfo.message}`,
      // `${buildTime || ''}`,
    ];

    if (hasImg) {
      descList.push(`[预览图片](${this.getCOSFilePath()})`);
    }

    const template = `>【构建成功】${descList.join('，')}`;

    sendWxRobotMarkdown({
      webhookUrl,
      content: template,
      chatId,
    });
  }

  async uploadAndPreview() {
    await Promise.all([this.upload(), this.preview()]);
  }

  async uploadFiles(files) {
    const { secretId, secretKey, bucket, region } = this.cosInfo || {};
    await uploadCOSFile({
      files,
      secretId,
      secretKey,
      bucket,
      region,
    });
  }
}


