export function genQueryToStr(query: Record<string, string | number> = {}) {
  return Object.keys(query).map((key) => {
    const value = query[key];
    return `${key}=${value}`;
  })
    .join('&');
}
