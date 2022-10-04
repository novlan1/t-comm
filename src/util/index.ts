/**
 * 判断数据是不是正则对象
 * @param {any} value - 输入数据
 * @returns {boolean} - 是否是正则对象
 *
 * @example
 *
 * isRegExp(1)
 *
 * // => false
 *
 * isRegExp(/\d/)
 *
 * // => true
 */
export function isRegExp(value) {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

/**
 * 判断数据是不是时间对象
 * @param {any} value - 输入数据
 * @returns {boolean} 是否是时间对象
 *
 * @example
 *
 * isDate(1)
 *
 * // => false
 *
 * isDate(new Date())
 *
 * // => true
 */
export function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}

/**
 * 判断数据是不是函数
 * @param {any} value - 输入数据
 * @returns {boolean} 是否是函数
 *
 * @example
 *
 * isFunction(1)
 *
 * // => false
 *
 * isFunction(()=>{})
 *
 * // => true
 */
export function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]';
}

/**
 * 记忆函数：缓存函数的运算结果
 * @param {Function} fn 输入函数
 * @returns {any} 函数计算结果
 *
 * @example
 * function test(a) {
 *   return a + 2
 * }
 *
 * const cachedTest = cached(test)
 *
 * cachedTest(1)
 *
 * // => 3
 *
 * cachedTest(1)
 *
 * // => 3
 */
export function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    if (hit) return hit;
    cache[str] = fn(str);
    return cache[str];
  };
}

/**
 * 横线转驼峰命名
 * @param {string} str  输入字符串
 * @returns {string} 处理后的字符串
 * @example
 *
 * camelize('ab-cd-ef')
 *
 * // => abCdEf
 *
 */
export function camelize(str) {
  const camelizeRE = /-(\w)/g;
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
}

/**
 * 驼峰命名转横线命名：拆分字符串，使用 - 相连，并且转换为小写
 * @param {string} str 输入字符串
 * @returns {string} 处理后的字符串
 *
 * @example
 *
 * hyphenate('abCd')
 *
 * // => ab-cd
 *
 */
export function hyphenate(str) {
  const hyphenateRE = /\B([A-Z])/g;
  return str.replace(hyphenateRE, '-$1').toLowerCase();
}

/**
 * 字符串首位大写
 * @param {string} str 输入字符串
 * @returns {string} 处理后的字符串
 *
 * @example
 *
 * capitalize('abc')
 *
 * // => Abc
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 将每个单词的首字母转换为大写
 * @param {string} str 输入字符串
 * @returns {string} 处理后的字符串
 *
 * @example
 *
 * titleize('my name is yang')
 *
 * // My name is Yang
 *
 * titleize('foo-bar')
 *
 * // Foo-Bar
 */
export function titleize(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  return str.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
}

/**
 * 将属性混合到目标对象中
 * @param {object} to 目标对象
 * @param {object} from 原始对象
 * @returns 处理后的对象
 *
 * @example
 * const a = { name: 'lee' }
 * const b = { age: 3 }
 * extend(a, b)
 *
 * console.log(a)
 *
 * // => { name: 'lee', age: 3 }
 */
export function extend(to: Object, from: object): object {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in from) {
    to[key] = from[key];
  }
  return to;
}

/**
 * 获取千分位分隔符
 * @param {string | number} value 输入数字
 * @return {string} 处理后的数字
 *
 * @example
 *
 * getThousandSeparator('123123123')
 *
 * // => 123,123,123
 *
 * getThousandSeparator('12312312')
 *
 * // => 12,312,312
 */
export function getThousandSeparator(value) {
  const reg = /(?!^)(?=(\d{3})+$)/g;
  return `${value}`.replace(reg, ',');
}

/**
 * 获取千分位分隔符，处理数字之间有空格的情况
 * @param {string | number} value 输入数字
 * @return {string} 处理后的数字
 *
 * @example
 * getThousandSeparator2('12345678 123456789')
 *
 * // => 12,345,678 123,456,789
 *
 */
export function getThousandSeparator2(value) {
  const reg = /\B(?=(\d{3})+\b)/g;
  return `${value}`.replace(reg, ',');
}


/**
 * 获取提交信息
 * @returns {Object} 提交对象
 *
 * @example
 * getCommitInfo()
 * {
 *   author: 'novlan1',
 *   message: ' 优化一部分文档',
 *   hash: '0cb71f9',
 *   date: '2022-10-02 10:34:31 +0800',
 *   timeStamp: '1664678071',
 *   branch: 'master'
 * }
 */
export function getCommitInfo() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { execSync } = require('child_process');
  const command = 'git log --no-merges -1 \
  --date=iso --pretty=format:\'{"author": "%aN","message": "%s", "hash": "%h", "date": "%ad", "timeStamp": "%at"},\' \
  $@ | \
  perl -pe \'BEGIN{print "["}; END{print "]\n"}\' | \
  perl -pe \'s/},]/}]/\'';
  const stdout = execSync(command, {
    encoding: 'utf-8',
  });

  const info = Object.assign({}, JSON.parse(stdout)[0], {
    branch: execSync('git symbolic-ref --short -q HEAD', {
      encoding: 'utf-8',
    }).replace(/\n$/, ''),
  });


  const res = Object.assign({}, info, {
    message:
    info.message.split(':')[1] || info.message.split('：')[1] || '',
  });
  return res;
}
