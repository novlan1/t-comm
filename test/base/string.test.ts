import {
  toUnicodeAt,
  toUnicode,
  camelize,
  hyphenate,
  capitalize,
  titleize,
  replaceAllPolyfill,
} from '../../src';


/**
 * toUnicodeAt
 */
describe('toUnicodeAt', () => {
  it('ABC => \\u0041', () => {
    expect(toUnicodeAt('ABC')).toBe('\\u0041');
  });
  it('ABC, 1 => \\u0042', () => {
    expect(toUnicodeAt('ABC', 1)).toBe('\\u0042');
  });
});

/**
 * toUnicode
 */
describe('toUnicode', () => {
  it('ABC => \\u0041\\u0042\\u0043', () => {
    expect(toUnicode('ABC')).toBe('\\u0041\\u0042\\u0043');
  });
});


describe('camelize', () => {
  it('camelize', () => {
    expect(camelize('ab-cd-ef')).toBe('abCdEf');
  });
});


describe('hyphenate', () => {
  it('hyphenate', () => {
    expect(hyphenate('abCd')).toBe('ab-cd');
    expect(hyphenate('AbCd')).toBe('ab-cd');
    expect(hyphenate('MatchCommDialog')).toBe('match-comm-dialog');
  });
});

describe('capitalize', () => {
  it('capitalize', () => {
    expect(capitalize('abc')).toBe('Abc');
  });
});

describe('titleize', () => {
  it('titleize', () => {
    expect(titleize('foo-bar')).toBe('Foo-Bar');
  });
});


describe('replaceAllPolyfill', () => {
  it('replaceAllPolyfill', () => {
    replaceAllPolyfill();

    const str = 'a+a+a+a+a+';
    // @ts-ignore
    expect(str.replaceAll('a', 'b')).toBe('b+b+b+b+b+');
    // @ts-ignore
    expect(str.replaceAll('a+', 'b')).toBe('bbbbb');


    const strLong = 'node-modules/.pnpm/@ttt+press-ui@1.0.18/node-modules/@ttt/press-ui/press-switch/press-switch';
    // @ts-ignore
    expect((`${strLong}, ${strLong}`).replaceAll(strLong, 'b')).toBe('b, b');


    const strLong2 = 'node-modules/.pnpm/@*ttt+[press]?-ui@1.0.18/node-modules/@ttt/(press)-ui/press-switch/press-switch';
    // @ts-ignore
    expect((`${strLong2}, \n${strLong2}`).replaceAll(strLong2, 'd')).toBe('d, \nd');

    const str2 = '✨ Features | 新功能\n\n✨ Features | 新功能';
    // @ts-ignore
    expect(str2.replaceAll('✨ Features | 新功能', 'Features 🎉')).toBe('Features 🎉\n\nFeatures 🎉');
  });

  it('regexp', () => {
    replaceAllPolyfill();
    const str = 'a+a+a+a+a+';
    // @ts-ignore
    expect(str.replaceAll(/a/, 'b')).toBe('b+b+b+b+b+');
  });
});
