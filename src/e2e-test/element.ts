export async function waitEle(ele, page, timeout = 2000) {
  let dom;
  try {
    dom = await page.waitForSelector(ele, {
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

export async function findAndClick(ele, page, timeout = 2000) {
  const btn = await waitEle(ele, page, timeout);
  await clickBtn(btn);
}


export function justWait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


export async function closeBlankPage(browser) {
  const BLANK_PAGE_HREF = 'about:blank';

  const target = await browser.waitForTarget(t => t.url() === BLANK_PAGE_HREF, {
    timeout: 2000,
  });
  if (!target) return;

  const page = await target.page();
  if (!page) return;

  page.close();
}

export async function getRect(page, element) {
  if (typeof element === 'string') {
    element = await waitEle(element, page);
  }
  return await page.evaluate(ele => ele.getBoundingClientRect(), element);
}

async function findListItem({
  page,
  ele,
  innerText,
  cb,
}) {
  await page.$$eval(ele, async (buttons) => {
    const btn = Array.from(buttons).find((item: any) => item.innerText === innerText);
    if (btn && typeof cb === 'function') {
      await cb(btn);
    }
    return btn;
  });
}

export async function findListItemAndClick({
  page,
  ele,
  innerText,
}) {
  await findListItem({
    page,
    ele,
    innerText,
    cb: btn => btn.click(),
  });
}
