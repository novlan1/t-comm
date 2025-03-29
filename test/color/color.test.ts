import {
  hsl2hsv,
  hsv2rgb,
  parseColorToHSV,
  parseHexChannel,
  rgb2hsv,
  rgbToHex,
} from '../../src';

describe('parseHexChannel', () => {
  it('parseHexChannel', () => {
    expect(parseHexChannel('12')).toBe(18);
    expect(parseHexChannel('aa')).toBe(170);
    expect(parseHexChannel('ff')).toBe(255);
    expect(parseHexChannel('00')).toBe(0);
    expect(parseHexChannel('0')).toBe(0);
    expect(parseHexChannel('a')).toBe(10);
    expect(parseHexChannel('f')).toBe(15);
  });
});


describe('rgbToHex', () => {
  it('rgbToHex', () => {
    expect(rgbToHex({
      r: 1,
      g: 1,
      b: 1,
    })).toBe('#010101');

    expect(rgbToHex({
      r: 255,
      g: 255,
      b: 255,
    })).toBe('#FFFFFF');

    expect(rgbToHex({
      r: 0,
      g: 0,
      b: 0,
    })).toBe('#000000');
  });
});

describe('rgb2hsv', () => {
  it('rgb2hsv', () => {
    expect(rgb2hsv(0, 0, 0)).toEqual({
      h: 0,
      s: 0,
      v: 0,
    });

    expect(rgb2hsv(255, 255, 255)).toEqual({
      h: 0,
      s: 0,
      v: 100,
    });

    expect(rgb2hsv(217, 236, 188)).toEqual({
      h: 83.75000000000003,
      s: 20.338983050847457,
      v: 92.54901960784314,
    });
  });
});


describe('hsv2rgb', () => {
  it('hsv2rgb', () => {
    expect(hsv2rgb(0, 0, 0)).toEqual({
      r: 0,
      g: 0,
      b: 0,
    });

    expect(hsv2rgb(0, 0, 100)).toEqual({
      r: 255,
      g: 255,
      b: 255,
    });

    expect(hsv2rgb(83.75000000000003, 20.338983050847457, 92.54901960784314)).toEqual({
      r: 217,
      g: 236,
      b: 188,
    });
  });
});

describe('hsl2hsv', () => {
  it('hsl2hsv', () => {
    expect(hsl2hsv(1, 1, 1)).toEqual({
      h: 1,
      s: 1.9801980198019802,
      v: 1.01,
    });
    expect(hsl2hsv(0, 0, 0)).toEqual({
      h: 0,
      s: 0,
      v: 0,
    });
    expect(hsl2hsv(310, 80, 80)).toEqual({
      h: 310,
      s: 33.33333333333333,
      v: 96,
    });
  });
});


describe('parseColorToHSV', () => {
  it('hex', () => {
    expect(parseColorToHSV('#fff')).toEqual({
      h: 0,
      s: 0,
      v: 100,
      alpha: 100,
    });

    expect(parseColorToHSV('#83ce13d1')).toEqual({
      h: 84.06417112299467,
      s: 90.77669902912622,
      v: 80.7843137254902,
      alpha: 81,
    });
  });

  it('rgb', () => {
    expect(parseColorToHSV('rgba(122, 170, 10)')).toEqual({
      h: 78,
      s: 94.11764705882352,
      v: 66.66666666666666,
      alpha: 100,
    });

    expect(parseColorToHSV('rgba(122, 163, 10, .8)')).toEqual({
      h: 76.07843137254902,
      s: 93.86503067484662,
      v: 63.921568627450974,
      alpha: 80,
    });
  });

  it('hsv', () => {
    expect(parseColorToHSV('hsva(310, 10, 2)')).toEqual({
      h: 310,
      s: 10,
      v: 2,
      alpha: 100,
    });

    expect(parseColorToHSV('hsva(310, 10, 2, .1)')).toEqual({
      h: 310,
      s: 10,
      v: 2,
      alpha: 10,
    });
  });

  it('hsl', () => {
    expect(parseColorToHSV('hsl(310, 10, 2)')).toEqual({
      h: 310,
      s: 18.181818181818183,
      v: 2.1999999999999997,
      alpha: 100,
    });

    expect(parseColorToHSV('hsla(310, 10, 2, .1)')).toEqual({
      h: 310,
      s: 18.181818181818183,
      v: 2.1999999999999997,
      alpha: 10,
    });
  });
});
