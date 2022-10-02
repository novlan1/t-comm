/**
 * 判断数据是不是正则对象
 * @param value
 * @returns boolean
 */
export function isRegExp(value) {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

/**
 * 判断数据是不是时间对象
 * @param value
 * @returns boolean
 */
export function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}

/**
 * 判断数据是不是函数
 */
export function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]';
}

/**
 * 记忆函数：缓存函数的运算结果
 * @param fn
 * @returns 函数计算结果
 */
export function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    if (hit) return hit;
    cache[str] = fn(str);
    return cache(str);
  };
}

/**
 * 横线转驼峰命名
 * @param str  输入字符串
 * @example
 * ```ts
 *
 * camelize('ab-cd-ef')  // abCdEf
 *
 * ```
 */
export function camelize(str) {
  const camelizeRE = /-(\w)/g;
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
}

/**
 * 驼峰命名转横线命名：拆分字符串，使用 - 相连，并且转换为小写
 * @param str
 * @returns abCd ==> ab-cd
 *
 */
export function hyphenate(str) {
  const hyphenateRE = /\B([A-Z])/g;
  return str.replace(hyphenateRE, '-$1').toLowerCase();
}

/**
 * 字符串首位大写
 * @param str
 * @returns 处理后的字符串
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 将每个单词的首字母转换为大写
 * @param str 字符串
 * @returns 字符串
 *
 * @example
 *
 * ```ts
 * titleize('my name is yang') // My name is Yang
 * titleize('foo-bar') // Foo-Bar
 * ```
 */
export function titleize(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  return str.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
}

/**
 * 将属性混合到目标对象中
 * @param to
 * @param _from
 * @returns 处理后的对象
 */
export function extend(to, _from) {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * 获取千分位分隔符
 *
 * @example
 * ```ts
 * getThousandSeparator('123123123') // 123,123,123
 * getThousandSeparator('12312312') // 12,312,312
 * ```
 */
export function getThousandSeparator(value) {
  const reg = /(?!^)(?=(\d{3})+$)/g;
  return `${value}`.replace(reg, ',');
}

/**
 * 获取千分位分隔符，数字之间有空格
 * @example
 * ```ts
 * getThousandSeparator2('12345678 123456789') // 12,345,678 123,456,789
 * ```
 */
export function getThousandSeparator2(value) {
  // const reg = /(?!\b)(?=(\d{3})+\b)/g
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
