import { getRect, justWait } from './element';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum DRAG_TYPE {
  DOT_TO_DOT = 'DOT_TO_DOT',
  STEPS = 'STEPS',
}


const STEP_UNIT = 56;

export async function dragElement({
  page,
  source,
  target,
  mode,
  reverse = false,
  stepUnit = STEP_UNIT,
}: {
  page: any,
  source: any,
  target: any,
  mode?: DRAG_TYPE,
  reverse?: boolean,
  stepUnit?: number
}) {
  const sourceRect = await getRect(source, page);
  const targetRect = await getRect(target, page);

  const start = (sourceRect.top + sourceRect.bottom) / 2;
  let end = (targetRect.top + targetRect.bottom) / 2;
  if (reverse) {
    end = start - (end - start);
  }

  await page.mouse.move((sourceRect.left + sourceRect.right) / 2, start);
  await page.mouse.down();

  switch (mode) {
    case DRAG_TYPE.DOT_TO_DOT: {
      await page.mouse.move((targetRect.left + targetRect.right) / 2, end);
      await justWait(1000);
      break;
    }
    case DRAG_TYPE.STEPS: {
      const unit = end > start ? stepUnit : -stepUnit;
      const steps = Math.abs(Math.round((end - start) / unit));

      for (let i = 0;i < steps;i++) {
        await page.mouse.move((targetRect.left + targetRect.right) / 2,  start + unit * (i + 1), {
          steps: 1,
        });
        await justWait(200);
      }
      break;
    }
    default: {}
  }
  await page.mouse.up();
}

