import { insertHtml, insertStyle } from '../dom/dom';

const DEFAULT_CUSTOM_DIALOG_ID = 'customDialogId';
const DEFAULT_CUSTOM_DIALOG_STYLE_ID = 'customDialogStyle';


export function initCustomDom({
  styleId,
  styleContent,
  dialogId,
  dialogContent,
}: {
  styleId: string;
  styleContent: string;
  dialogId: string;
  dialogContent: string;
}) {
  insertStyle({
    id: styleId,
    content: styleContent,
  });
  insertHtml({
    id: dialogId,
    content: dialogContent,
  });
}


export function initCustomDialog({
  title,
  content,
  confirmText,
  cancelText,
  styleId = DEFAULT_CUSTOM_DIALOG_STYLE_ID,
  dialogId = DEFAULT_CUSTOM_DIALOG_ID,
}: {
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  styleId?: string;
  dialogId?: string;
}) {
  const styleContent = `
  .tip-toc-dialog-wrap,.tip-toc-operating-layer,.tip-toc-sharetips{position:fixed;top:0;left:0;z-index:9999;width:100%;height:100%;background:rgba(0,0,0,.8)}
.tip-toc-dialog,.tip-toc-sharedialog,.tip-toc-tipsdialog{position:fixed;top:50%;left:50%;z-index:10000;background:#fff;transform:translate(-50%,-50%)}
.tip-toc-dialog{padding-top:.32rem;width:5.6rem;border-radius:4px}
.tip-toc-tipsdialog{padding-top:.48rem;width:5rem;border-radius:4px}
.tip-toc-sharedialog{width:6.3rem;border-radius:2px}
.tip-toc-dialog-close{position:absolute;top:.16rem;right:.16rem;display:block;width:.5rem;height:.5rem;background:url(https://image-1251917893.file.myqcloud.com/TIP_GameSystem_2020/toB/icon/ico-close.png) center center no-repeat;background-size:.3rem .3rem}
.tip-toc-dialog-title{color:#4a4a4a;text-align:center;font-weight:700;font-size:.32rem;line-height:.44rem}
.tip-toc-dialog-texttips{margin:.16rem auto -.36rem;color:#9b9b9b;text-align:center;font-size:.24rem;line-height:.34rem}
.tip-toc-dialog-content{padding:.12rem .6rem .24rem}
.tip-toc-content-tips-normal,.tip-toc-content-tips-warn{text-align:center;font-size:.28rem;line-height:.4rem}
.tip-toc-content-tips-normal{color:#999}
.tip-toc-dialogtextbtn{display:flex;border-top:1px solid #d8d8d8}
.tip-textbtn-cancel,.tip-textbtn-primary{display:block;width:100%;height:.88rem;text-align:center;font-size:.28rem;line-height:.88rem}
.tip-textbtn-primary{color:#d49b38}
.tip-textbtn-cancel{border-right:1px solid #d8d8d8;color:#4a4a4a}
  `;

  const dialogContent = `
  <div
    class="tip-toc-dialog-wrap"
    id="${dialogId}"
    onclick="document.getElementById('${dialogId}').style.display='none';"
  >
  <div class="tip-toc-tipsdialog">
    <h4 class="tip-toc-dialog-title">
      ${title}
    </h4>
    <div class="tip-toc-dialog-content">
      <p class="tip-toc-content-tips-normal">
        ${content}
      </p>
    </div>
    <div class="tip-toc-dialogtextbtn">
     ${cancelText ? `
      <a
        id="cancel_btn"
        class="tip-textbtn-primary"
        style="color: #9b9b9b;border-right: 1px solid #d8d8d8;"
        onclick="document.getElementById('${dialogId}').style.display='none';"
        >${cancelText}</a>
     ` : ''}
      <a
        id="confirm_btn"
        class="tip-textbtn-primary"
        onclick="document.getElementById('${dialogId}').style.display='none';"
      >
      ${confirmText}
      </a>
    </div>
  </div>
</div>
  `;
  initCustomDom({
    styleId,
    styleContent,
    dialogId,
    dialogContent,
  });
}


export function showCustomDialog(domId = DEFAULT_CUSTOM_DIALOG_ID) {
  const dom = document.getElementById(domId);
  if (dom) {
    dom.style.display = 'block';
  }
}
