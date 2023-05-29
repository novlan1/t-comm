import type { IBrowser, IPage } from './types';

const DEFAULT_TIMEOUT = 6000;

export async function waitEle(element: HTMLSelectElement, page: IPage, timeout = DEFAULT_TIMEOUT) {
  let dom;
  try {
    dom = await page.waitForSelector(element, {
      timeout,
    });
  } catch (e) {
  }
  return dom;
}

export async function clickBtn(btn: any) {
  if (btn) {
    await btn.evaluate((b: any) => b.click());
    return true;
  }
  return false;
}

export async function findAndClick(element: HTMLSelectElement, page: IPage, timeout = DEFAULT_TIMEOUT) {
  const btn = await waitEle(element, page, timeout);
  await clickBtn(btn);
  return btn;
}


export function justWait(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}


export async function closeBlankPage(browser: IBrowser) {
  const BLANK_PAGE_HREF = 'about:blank';

  const target = await browser.waitForTarget((t: any) => t.url() === BLANK_PAGE_HREF, {
    timeout: DEFAULT_TIMEOUT,
  });
  if (!target) return;

  const page = await target.page();
  if (!page) return;

  page.close();
}

export async function getRect(element: HTMLSelectElement, page: IPage) {
  if (typeof element === 'string') {
    element = await waitEle(element, page);
  }
  return await page.evaluate((ele: HTMLSelectElement) => {
    const { top, left, bottom, right, x, y, width, height } = ele.getBoundingClientRect();
    return { top, left, bottom, right, x, y, width, height };
  }, element);
}

export async function getInnerText(element: HTMLSelectElement, page: IPage) {
  const ele = await waitEle(element, page);
  if (!ele) return null;

  const text = await page.evaluate((ele: HTMLSelectElement) => ele.innerText, ele);
  return text;
}


export async function findListItemAndClick({
  page,
  element,
  innerText,
}: {
  page: IPage;
  element: HTMLSelectElement;
  innerText: string;
}) {
  await page.evaluate(({ element, innerText }: {
    element: string
    innerText: string;
  }) => {
    const buttons = document.querySelectorAll(element);
    const btn: any = Array.from(buttons).find((item: any) => item.innerText === innerText);
    if (btn) {
      btn.click();
    }
  }, { element, innerText });
}

export async function getHref(page: IPage) {
  return page.evaluate(() => location.href);
}

