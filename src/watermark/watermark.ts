const WATER_MARK_ELEMENT = '__wm';

/**
 * canvas 实现 watermark
 * @param {object} params 参数
 * @param {HTMLElement} params.container 容器
 * @param {number} params.width 图片宽
 * @param {number} params.height 图片高
 * @param {string} params.textAlign 同 ctx.textAlign
 * @param {string} params.textBaseline 同 ctx.textBaseline
 * @param {string} params.font 同 ctx.font
 * @param {string} params.fillStyle 同 ctx.fillStyle
 * @param {string} params.content 内容
 * @param {number} params.rotate 旋转角度
 * @param {number} params.zIndex 层级
 *
 * @example
 *
 * ```ts
 * const rtx = 'pony';
 *
 * createWatcherMark({
 *   content: rtx,
 *   width: '300',
 *   height: '300',
 *   textAlign: 'center',
 *   textBaseline: 'middle',
 *   font: '25px Microsoft Yahei',
 *   fillStyle: 'rgba(184, 184, 184, 0.3)',
 *   rotate: '-50',
 *   zIndex: 1000,
 * });
 * ```
 */
export function createWatcherMark({
  container = document.body,
  width = 300,
  height = 300,
  textAlign = 'center',
  textBaseline = 'middle',
  font = '25px Microsoft Yahei',
  fillStyle = 'rgba(184, 184, 184, 0.01)',
  content = '请勿外传',
  rotate = -50,
  zIndex = 10000,
} = {}) {
  const args = arguments[0];
  const canvas = document.createElement('canvas');

  canvas.setAttribute('width', `${width}px`);
  canvas.setAttribute('height', `${height}px`);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.textAlign = textAlign as CanvasTextAlign;
  ctx.textBaseline = textBaseline as CanvasTextBaseline;
  ctx.font = font;
  ctx.fillStyle = fillStyle;

  ctx.translate(width / 2, height / 2);
  ctx.rotate(Math.PI / 180 * rotate);
  ctx.fillText(content, 30, 30);
  ctx.translate(-width / 2, - height / 2);

  const base64Url = canvas.toDataURL();
  const watermarkDom = document.querySelector(`.${WATER_MARK_ELEMENT}`);

  const watermarkDiv = watermarkDom || document.createElement('div');
  const styleStr = `
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:${zIndex};
      pointer-events:none;
      background-repeat:repeat;
      background-image:url('${base64Url}')`;

  watermarkDiv.setAttribute('style', styleStr);
  watermarkDiv.classList.add(WATER_MARK_ELEMENT);

  if (!watermarkDom) {
    container.style.position = 'relative';
    container.insertBefore(watermarkDiv, container.firstChild);
  }

  // @ts-ignore
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  if (MutationObserver) {
    let mo: any = new MutationObserver(() => {
      const watermarkDom = document.querySelector(`.${WATER_MARK_ELEMENT}`);

      // 只在 watermarkDom 元素变动才重新调用 createWatcherMark
      if ((watermarkDom && watermarkDom.getAttribute('style') !== styleStr) || !watermarkDom) {
        // 避免一直触发
        mo.disconnect();
        mo = null;
        createWatcherMark(JSON.parse(JSON.stringify(args)));
      }
    });

    mo.observe(container, {
      attributes: true,
      subtree: true,
      childList: true,
    });
  }
}
