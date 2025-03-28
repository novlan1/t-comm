/* eslint-disable @typescript-eslint/no-require-imports */
import { execCommand } from '../node/node-command';

import { sendWxRobotMarkdown } from '../wecom-robot/base';

import { genVersion } from './gen-version';
import { genVersionTip } from './gen-version-tip';

import type { IAppInfo } from './types';

/**
 * 运行standard-version，并且发送changelog到机器人
 * @param {object} options 配置
 * @param {object} config.appInfo package.json信息
 * @param {string} config.root 项目根路径
 * @param {string} config.changeLogFilePath changelog文件地址
 * @param {string} config.webhookUrl 机器人hook地址
 * @param {string} config.chatId 会话id
 */
export function genVersionAndSendChangeLog({
  root,
  changeLogFilePath,
  webhookUrl,
  chatId,
  forceGenVersion,
  pushRemote = true,
}: {
  root?: string
  changeLogFilePath?: string
  webhookUrl: string
  chatId?: string
  forceGenVersion?: boolean
  pushRemote?: boolean
}) {
  return new Promise((resolve, reject) => {
    if (!root) {
      reject('ERROR: root不可以为空');
      return;
    }

    if (!changeLogFilePath) {
      changeLogFilePath = `${root}/CHANGELOG.md`;
    }

    const hasGenVersion = genVersion({
      root,
      forceGenVersion,
    });

    if (!hasGenVersion) {
      resolve({
        hasGenVersion: false,
      });
      return;
    }

    if (pushRemote) {
      try {
        console.log('[GEN SEND VERSION] Doing git push --follow-tags origin ...');

        execCommand('git push --follow-tags origin', root, 'inherit');

        console.log('[GEN SEND VERSION] Done git push --follow-tags origin.');
      } catch (err) {
        reject(err);
        return;
      }
    }


    // appInfo 不要用传入的参数，因此传入是旧的，新的还未生成
    const appInfo = require(`${root}/package.json`);
    sendVersionTip({
      appInfo,
      changeLogFilePath,
      webhookUrl,
      chatId,
    }).then(resolve)
      .catch(reject);
  });
}

function sendVersionTip({
  appInfo,
  changeLogFilePath,
  webhookUrl,
  chatId,
}: {
  appInfo: IAppInfo,
  changeLogFilePath: string,
  webhookUrl: string,
  chatId?: string,
}) {
  return new Promise((resolve, reject) => {
    const content = genVersionTip({
      readmeFilePath: changeLogFilePath,
      appInfo,
    });

    if (!content) {
      resolve({
        hasGenVersion: true,
        hasSendChangeLog: false,
        sendChangeLogError: 'empty changelog content',
      });
      return;
    }

    console.log('[GEN SEND VERSION] Doing send wecom robot markdown ...');

    sendWxRobotMarkdown({
      chatId,
      content,
      webhookUrl,
    }).then(() => {
      resolve({
        hasGenVersion: true,
        hasSendChangeLog: true,
      });

      console.log('[GEN SEND VERSION] Done send wecom robot markdown.');
    })
      .catch((err) => {
        reject(err);
      });
  });
}
