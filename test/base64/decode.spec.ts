import { decode } from '../../src/base64/';


describe('decode', () => {
  it('decode', () => {
    expect(decode('ZGFua29nYWk=')).toBe('dankogai');
    expect(decode('emhvbmdndW8=')).toBe('zhongguo');
    expect(decode('YWJj')).toBe('abc');
    expect(decode('eHh4eHh4eGFkZmFkZg==')).toBe('xxxxxxxadfadf');
  });

  it('chinese', () => {
    expect(decode('5p2o')).toBe('杨');
    expect(decode('5Lit5Zu9')).toBe('中国');
    expect(decode('5LiJ5Liq5a2X')).toBe('三个字');
    expect(decode('5aSn5rGf5aSn5rKz')).toBe('大江大河');
    expect(decode('5pWZ6IKy6YOo5a2m57GN5Zyo57q/6aqM6K+B5oql5ZGK')).toBe('教育部学籍在线验证报告');
  });
});
