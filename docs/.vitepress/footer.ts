const MESSAGE_LIST = [
  {
    text: 'Press Plus',
    link: 'https://h5.igame.qq.com/pmd-mobile.support.press-plus.press-ui/',
  },
  {
    text: 'Press Next',
    link: 'https://h5.igame.qq.com/pmd-mobile.pmd-h5.press-next.press-next/',
  },
  {
    text: 'Press Components',
    link: 'https://h5.igame.qq.com/pmd-mobile.pmd-h5.press-components.press/',
  },
];

export function getFooterMessage() {
  return MESSAGE_LIST
    .map(item => `<a href="${item.link}" target="_blank" style="text-decoration: none;">${item.text}</a>`)
    .join('<span style="width: 20px;display: inline-block;"> | </span>');
}
