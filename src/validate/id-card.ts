/**
 * 判断是否合法的身份证号
 * 除了基本的格式校验外，还检查了第18位是否合法，方法如下：
 * - 逆序排列，放到数组 list 中
 * - x/X 代表数字10
 * - 遍历 list，累加 `item * ((2 ** index) % 11)`，item 为list的每一位，index为下标值
 * - 将上一步的累加和余11，判断是否等于1
 *
 * @param {string} idCard 输入字符串
 * @example
 * isIdCard('123')
 * // false
 *
 * isIdCard('34052419800101001X')
 * // true
 */
export function isIdCard(idCard) {
  const regExp = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return regExp.test(`${idCard}`) && validateMoreIdCard(`${idCard}`);
}

export function validateMoreIdCard(str: string): boolean {
  const list = str
    .split('')
    .reverse()
    .map((val, index) => {
      if (index === 0 && val.toUpperCase() === 'X') {
        return '10';
      }
      return val;
    });

  let res = 0;
  list.forEach((item, index) => res += +item * ((2 ** index) % 11));
  return res % 11 === 1;
}
