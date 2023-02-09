const DEFAULT_TIMEOUT = 6000;

export async function waitEle(element, page, timeout = DEFAULT_TIMEOUT) {
  let dom;
  try {
    dom = await page.waitForSelector(element, {
      timeout,
    });
  } catch (e) {
  }
  return dom;
}

export async function clickBtn(btn) {
  if (btn) {
    await btn.evaluate(b => b.click());
    return true;
  }
  return false;
}

export async function findAndClick(element, page, timeout = DEFAULT_TIMEOUT) {
  const btn = await waitEle(element, page, timeout);
  await clickBtn(btn);
  return btn;
}


export function justWait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


export async function closeBlankPage(browser) {
  const BLANK_PAGE_HREF = 'about:blank';

  const target = await browser.waitForTarget(t => t.url() === BLANK_PAGE_HREF, {
    timeout: DEFAULT_TIMEOUT,
  });
  if (!target) return;

  const page = await target.page();
  if (!page) return;

  page.close();
}

export async function getRect(element, page) {
  if (typeof element === 'string') {
    element = await waitEle(element, page);
  }
  return await page.evaluate((ele) => {
    const { top, left, bottom, right, x, y, width, height } = ele.getBoundingClientRect();
    return { top, left, bottom, right, x, y, width, height };
  }, element);
}

export async function getInnerText(element, page) {
  const ele = await waitEle(element, page);
  if (!ele) return null;

  const text = await page.evaluate(ele => ele.innerText, ele);
  return text;
}


export async function findListItemAndClick({
  page,
  element,
  innerText,
}) {
  await page.evaluate(({ element, innerText }) => {
    const buttons = document.querySelectorAll(element);
    const btn = Array.from(buttons).find(item => item.innerText === innerText);
    if (btn) {
      btn.click();
    }
  }, { element, innerText });
}

