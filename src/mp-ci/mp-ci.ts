/* eslint-disable @typescript-eslint/no-require-imports */
import { sendWxRobotMarkdown } from '../wecom-robot/base';
import { getGitCommitInfo } from '../git/git';
import { timeStampFormat } from '../date/time';
import { addTextForImg } from '../canvas/img-text';
import { uploadCOSFile } from '../cos/cos';
import { saveBase64ImgToFile } from '../node-img/img';

import { OptionsType } from './type';
import { DEFAULT_BUILD_SETTING } from './config';

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

  /**
   * 小程序自动化构建工具
   * @param {object} options 选项
   */
  constructor(options: OptionsType) {
    const path = require('path');
    const fs = require('fs');
    const ci = require('miniprogram-ci');
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
      this.projectPath = path.resolve(root, 'dist/build/mp-weixin');
    }
    if (!this.privateKeyPath) {
      this.privateKeyPath = path.resolve(root, 'private.key');
    }

    if (!fs.existsSync(this.privateKeyPath)) {
      throw new Error('ERROR: privateKeyPath 位置不存在');
    }
    if (!fs.existsSync(this.projectPath)) {
      throw new Error('ERROR: projectPath 位置不存在');
    }

    if (!fs.existsSync(this.pkgFile)) {
      throw new Error('ERROR: package.json 不存在');
    }

    this.init();
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
    const buildDesc = `环境：${env || ''}，分支：${commitInfo.branch}，提交：${commitInfo.author} - ${commitInfo.message}`;
    return buildDesc;
  }

  /**
   * 上传
   */
  async upload() {
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

  /**
   * 预览
   */
  async preview() {
    const previewResult = await this.ciLib.preview({
      project: this.projectCI,
      desc: this.buildDesc,
      setting: this.buildSetting,
      qrcodeFormat: 'image',
      qrcodeOutputDest: this.savePreviewPath,
      // pagePath: 'pages/index/index', // 预览页面
      // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`&`
    });
    console.log('PreviewResult:\n', previewResult);

    await this.uploadPreviewImg();
  }

  /**
   * 上传预览图片到COS
   */
  async uploadPreviewImg() {
    const { appName, robotNumber, env, buildTime, commitInfo, version } = this;

    const textList = [
      `【${appName}自动构建】`,
      `版本: ${version}, 提交者: CI机器人${robotNumber}, 环境: ${env}`,
      `分支: ${commitInfo.branch}`,
      `提交时间: ${buildTime}`,
      `提交信息: ${commitInfo.author} - ${commitInfo.message}`,
    ].map((item) => {
      if (item.length > 35) return `${item.slice(0, 35)}...`;
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
  async sendRobotMsg() {
    const { robotNumber, webhookUrl, version, buildDesc, buildTime } = this;
    let { chatId } = this;
    if (!webhookUrl) {
      return;
    }
    if (!chatId) {
      chatId = undefined;
    }

    const descList = [
      `版本：${version || ''}`,
      `提交者：CI机器人${robotNumber}`,
      buildDesc,
      `提交时间：${buildTime || ''}`,
      `[预览图片](${this.getCOSFilePath()})`,
    ];

    const template = `>【构建成功】${descList.join('，')}`;

    sendWxRobotMarkdown({
      webhookUrl,
      content: template,
      chatId,
    });
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


