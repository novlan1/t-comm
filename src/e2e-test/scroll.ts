import { IPage } from './types';

export async function autoScroll(element: HTMLAnchorElement, page: IPage, bottomTimes = 0) {
  await page.evaluate(({
    element,
    bottomTimes,
  }: {
    element: string,
    bottomTimes: number
  }) => new Promise((resolve) => {
    const UNIT_DISTANCE = 100;
    const ele = document.querySelector(element) as HTMLAnchorElement;

    let totalHeight = 0;
    let curBottomTimes = 0;
    let lastScrollHeight = ele?.scrollHeight;

    const doScroll = (ele: HTMLElement) => {
      totalHeight = ele.scrollTop + UNIT_DISTANCE;
      ele.scrollTop = totalHeight;
    };

    const timer = setInterval(() => {
      const { scrollHeight } = ele;
      doScroll(ele);

      if (scrollHeight > lastScrollHeight) {
        curBottomTimes += 1;
        lastScrollHeight = scrollHeight;
      }

      console.log('[autoScroll] scrollHeight & totalHeight', scrollHeight, totalHeight);

      if (totalHeight >= scrollHeight
          || (bottomTimes && curBottomTimes > bottomTimes)
      ) {
        console.log('[autoScroll] end');
        clearInterval(timer);
        resolve(1);
      }
    }, 100);
  }), { element, bottomTimes });
}

