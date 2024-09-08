import { encode } from '../../src/base64';


describe('encode', () => {
  it('encode', () => {
    expect(encode('dankogai')).toBe('ZGFua29nYWk=');
    expect(encode('zhongguo')).toBe('emhvbmdndW8=');
    expect(encode('abc')).toBe('YWJj');
    expect(encode('xxxxxxxadfadf')).toBe('eHh4eHh4eGFkZmFkZg==');
  });

  it('chinese', () => {
    expect(encode('杨')).toBe('5p2o');
    expect(encode('中国')).toBe('5Lit5Zu9');
    expect(encode('三个字')).toBe('5LiJ5Liq5a2X');
    expect(encode('大江大河')).toBe('5aSn5rGf5aSn5rKz');
    expect(encode('教育部学籍在线验证报告')).toBe('5pWZ6IKy6YOo5a2m57GN5Zyo57q/6aqM6K+B5oql5ZGK');
  });
});
