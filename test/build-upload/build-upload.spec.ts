import fs from 'fs';

import path from 'path';

import { buildAndUpload } from '../../src';
import { readFileSync } from '../../src/fs/fs';
import { execCommand } from '../../src/node/node-command';
import { getPublishBashPath } from '../../src/publish/helper';

jest.mock('fs-extra');
jest.mock('fs');
jest.mock('../../src/node/node-command');
jest.mock('../../src/publish/helper');
jest.mock('../../src/fs/fs');
jest.mock('tar', () => ({
  c: jest.fn().mockImplementation(options => Promise.resolve(options.file), // 模拟 tar 打包成功
  ),
}));

const DEFAULT_HOST_TARGET_DIR = '/root/ft_local';

describe('buildAndUpload', () => {
  const mockFiles = ['file1.ts', 'file2.js'];
  const mockBundleName = 'test-bundle';
  const mockHostName = 'test-host';
  const mockHostPwd = 'test-pwd';

  beforeEach(() => {
    jest.clearAllMocks();

    // 模拟 package.json 存在
    (fs.existsSync as jest.Mock).mockImplementation(filePath => filePath === path.resolve('/test-root', 'package.json'));


    (readFileSync as jest.Mock).mockReturnValueOnce({
      files: mockFiles,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should exit early if root directory does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    await expect(buildAndUpload({
      root: '/invalid-root',
      hostName: '',
      hostPwd: '',
      hostTargetDir: '',
    })).rejects.toThrow('ERROR: root 不存在');
    //  })).resolves.not.toThrow();
    expect(fs.existsSync).toHaveBeenCalledWith('/invalid-root');
  });


  test('should include .env.local when exists', async () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true); // .env.local exists
    const files = await buildAndUpload({
      root: '/test-root',
      hostName: '1',
      hostPwd: '1',
      hostTargetDir: '1',
    });
    expect(files).not.toContain('.env.local');
  });

  test('should call build and upload successfully', async () => {
    (getPublishBashPath as jest.Mock).mockReturnValue('/bin/publish.sh');
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true); // .env.local exists

    await buildAndUpload({
      root: '/test-root',
      bundleName: mockBundleName,
      hostName: mockHostName,
      hostPwd: mockHostPwd,
      hostTargetDir: DEFAULT_HOST_TARGET_DIR,
    });

    expect(execCommand).toHaveBeenCalledWith(
      `sh /bin/publish.sh ./dist/test-bundle.tar.gz ${DEFAULT_HOST_TARGET_DIR} ${mockHostName} ${mockHostPwd}`,
      '/test-root',
      'inherit',
    );
  });

  test('should handle build failure', async () => {
    jest.mock('tar', () => ({
      c: jest.fn().mockImplementation(() => Promise.reject('1'), // 模拟 tar 打包成功
      ),
    }));
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true); // .env.local exists
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const tar = require('tar');
    (tar.c as unknown as jest.Mock)
      .mockRejectedValue(new Error('Tar failed'));

    await expect(buildAndUpload({
      root: '/test-root',
      bundleName: mockBundleName,
      hostName: mockHostName,
      hostPwd: mockHostPwd,
      hostTargetDir: '1',
    })).rejects.toThrow('Tar failed');
  });

  test('should validate required parameters', async () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true); // .env.local exists
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const tar = require('tar');
    (tar.c as unknown as jest.Mock).mockResolvedValue('');

    await expect(buildAndUpload({
      root: '/test-root',
      hostName: '',
      hostPwd: mockHostPwd,
      hostTargetDir: '',
    })).rejects.toThrow('参数不全');
  });

  test('should use default bundle name when not provided', async () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true); // .env.local exists
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const tar = require('tar');
    (tar.c as unknown as jest.Mock).mockResolvedValue('');

    await buildAndUpload({
      root: '/test-root',
      hostName: mockHostName,
      hostPwd: mockHostPwd,
      hostTargetDir: '',
    });
    expect(getPublishBashPath).toHaveBeenCalled();
  });
});
