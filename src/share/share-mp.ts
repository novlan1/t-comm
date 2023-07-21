export function getCurrentPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}


export function initShareMp(shareInfo: {
  title?: string;
  path?: string;
  imageUrl?: string;
}) {
  const page = getCurrentPage() as any;
  page.onShareAppMessage = () => ({
    title: `${shareInfo.title}` || '',
    path: shareInfo.path || '',
    imageUrl: shareInfo.imageUrl || '',
  });
}
