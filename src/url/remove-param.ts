export function removeUrlParams(url: string, params: Array<string>) {
  if (!url || !params.length) return url;
  let newUrl = url;

  params.forEach((name) => {
    const reg = new RegExp(`${name}=[^&]*&?`, 'g');
    newUrl = newUrl.replace(reg, '').replace(/[?&]$/, '');
  });
  return newUrl;
}
