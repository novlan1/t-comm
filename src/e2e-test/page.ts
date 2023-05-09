/* eslint-disable @typescript-eslint/no-require-imports */

// eslint-disable-next-line @typescript-eslint/naming-convention
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


const openedPageList = new Set();

export async function openOrFindPage(browser, href, device) {
  let page;

  if (openedPageList.has(href)) {
    try {
      const target = await browser.waitForTarget(t => t.url().includes(href), {
        timeout: 2000,
      });
      page = await target.page();

      return page;
    } catch (err) {}
  }

  page = await getNewPage(browser, device);
  await page.goto(href);
  openedPageList.add(href);

  return page;
}

export async function setUserAgent(useragent, page) {
  await page.setUserAgent(useragent);
  await page.evaluate(() => location.reload());
  await page.waitForNavigation();
}


export async function setSessionStorage(key, value, page) {
  await page.evaluate(({ key, value }) => {
    sessionStorage.setItem(key, value);
  }, { key, value });
}

export async function setRoute(page, route = '/') {
  if (!page) return;
  // @ts-ignore
  await page.evaluate(route => window.app.$router.push(route), route);
}
