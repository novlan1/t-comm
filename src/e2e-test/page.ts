/* eslint-disable @typescript-eslint/no-require-imports */

export enum DEVICE_TYPE {
  PC = 'PC',
  MOBILE_HOR = 'MOBILE_HORPC',
  MOBILE_VERT = 'MOBILE_VERT',
}


export async function initBrowser({
  puppeteer,
  args = [],
  headless = true,
  devtools = true,
}) {
  const defaultArgs = ['--disable-setuid-sandbox'];

  const type = require('os').type();
  const isLinux = type == 'Linux';

  if (isLinux) {
    defaultArgs.push('--no-sandbox');
  }

  const launchArgs = {
    headless,
    devtools,
    args: [
      ...defaultArgs,
      ...args,
    ],
  };
  const browser = await puppeteer.launch(launchArgs);
  return browser;
}

export async function getNewPage(browser, device: DEVICE_TYPE) {
  const page = await browser.newPage();

  if (device === DEVICE_TYPE.MOBILE_VERT) {
    // await page.emulate(puppeteer.devices['iPhone 11']);
    await page.setViewport({
      width: 414,
      height: 736,
      isMobile: true,
    });
  } else if (device === DEVICE_TYPE.MOBILE_HOR) {
    await page.setViewport({
      width: 736,
      height: 414,
      isMobile: true,
    });
  }

  return page;
}
