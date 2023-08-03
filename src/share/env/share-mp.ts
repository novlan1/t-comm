export function getCurrentPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}


export function initShareMp(shareInfo: {
  title?: string;
  mpPath?: string;
  path?: string;
  imageUrl?: string;
  icon?: string;
  mpImageUrl?: string;
}) {
  const page = getCurrentPage() as any;
  if (!page) return;
  page.onShareAppMessage = () => ({
    title: `${shareInfo.title}` || '',
    path: shareInfo.mpPath || shareInfo.path || '',
    imageUrl: shareInfo.mpImageUrl || shareInfo.imageUrl || shareInfo.icon || '',
  });
}

export function openShareUIMp(text = '点击右上角"..."分享', duration = 3000) {
  uni.showToast({
    title: text,
    icon: 'none',
    duration,
    success() {
    },
    fail() {
    },
  });
}
