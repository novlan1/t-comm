export function setHtmlResponsiveFontsize() {
  // 自适应
  (function (win, doc) {
    if (!win.addEventListener) return;
    const html = doc.documentElement;

    function setFont() {
      const cliWidth = html.clientWidth;
      html.style.fontSize = `${100 * (cliWidth / 750)}px`;
    }
    win.addEventListener('resize', setFont, false);
    setFont();
  }(window, document));
}
