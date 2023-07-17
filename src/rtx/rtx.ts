/**
 * 获取rtx信息
 * @private
 */
export function getRtxInfo() {
  return new Promise((resolve, reject) => {
    const cached = localStorage.getItem('AEGIS_RTX');
    if (cached) {
      resolve(cached);
      return;
    }
    const url = `${location.origin}/ts:auth/tauth/info.ashx`;
    fetch(url).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return {};
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
