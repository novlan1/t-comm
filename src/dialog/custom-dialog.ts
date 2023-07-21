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
  const idObjectStyle = document.getElementById(styleId);
  idObjectStyle?.parentNode?.removeChild(idObjectStyle);

  const styleNode = document.createElement('style');
  styleNode.id = styleId;
  styleNode.type = 'text/css';
  styleNode.innerHTML = styleContent;
  document.getElementsByTagName('head')[0].appendChild(styleNode);

  const idObject = document.getElementById(dialogId);
  idObject?.parentNode?.removeChild(idObject);

  const shareNode = document.createElement('div');
  shareNode.id = dialogId;
  shareNode.style.display = 'none';
  shareNode.innerHTML = dialogContent;
  document.getElementsByTagName('body')[0].appendChild(shareNode);
}


export function initCustomDialog({
  title,
  content,
  confirmText,
  cancelText,
}: {
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
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
    id="customDialogId"
    onclick="document.getElementById('customDialogId').style.display='none';"
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
        onclick="document.getElementById('customDialogId').style.display='none';"
        >${cancelText}</a>
     ` : ''}
      <a
        id="confirm_btn"
        class="tip-textbtn-primary"
        onclick="document.getElementById('customDialogId').style.display='none';"
      >
      ${confirmText}
      </a>
    </div>
  </div>
</div>
  `;
  initCustomDom({
    styleId: 'customDialogStyle',
    styleContent,
    dialogId: 'customDialogDom',
    dialogContent,
  });
}
