import { parseHexChannel } from './helper';
import { hsl2hsv, rgb2hsv } from './transform';

function commonParseRGBOrHSL({
  value,
  reg = /hsla|hsl|\(|\)/gm,
  transformFunc = hsl2hsv,
}: {
  value: string;
  reg?: RegExp;
  transformFunc?: Function
}) {
  let alpha = 100;
  let h = 0;
  let s = 100;
  let v = 100;


  const parts = value.replace(reg, '')
    .split(/\s|,/g)
    .filter(val => val !== '')
    .map((val, index) => (index > 2 ? parseFloat(val) : parseInt(val, 10)));

  if (parts.length === 4) {
    alpha = Math.floor(parseFloat(`${parts[3]}`) * 100);
  } else if (parts.length === 3) {
    alpha = 100;
  }
  if (parts.length >= 3) {
    const res = transformFunc(parts[0], parts[1], parts[2]);
    h = res.h;
    s = res.s;
    v = res.v;
    // fromHSV(h, s, v);
  }
  return {
    h,
    s,
    v,
    alpha,
  };
}

export function parseHSLString(value: string) {
  return commonParseRGBOrHSL({
    value,
    reg: /hsla|hsl|\(|\)/gm,
    transformFunc: hsl2hsv,
  });
}

export function parseHSVString(value: string) {
  let h = 0;
  let s = 100;
  let v = 100;
  let alpha = 100;

  const parts = value.replace(/hsva|hsv|\(|\)/gm, '')
    .split(/\s|,/g)
    .filter(val => val !== '')
    .map((val, index) => (index > 2 ? parseFloat(val) : parseInt(val, 10)));

  if (parts.length === 4) {
    alpha = Math.floor(parseFloat(`${parts[3]}`) * 100);
  } else if (parts.length === 3) {
    alpha = 100;
  }

  h = parts[0];
  s = parts[1];
  v = parts[2];

  return {
    h,
    s,
    v,
    alpha,
  };
}


export function parseRGBBracket(value: string) {
  return commonParseRGBOrHSL({
    value,
    reg: /rgba|rgb|\(|\)/gm,
    transformFunc: rgb2hsv,
  });
}

export function parseRGBHex(value: any) {
  const hex = value.replace('#', '').trim();
  let r = 0;
  let g = 0;
  let b = 0;
  let alpha = 0;

  if (!/^(?:[0-9a-fA-F]{3}){1,2}|[0-9a-fA-F]{8}$/.test(hex)) {
    return {
      r,
      g,
      b,
      alpha,
    };
  }


  if (hex.length === 3) {
    r = parseHexChannel(hex[0] + hex[0]);
    g = parseHexChannel(hex[1] + hex[1]);
    b = parseHexChannel(hex[2] + hex[2]);
  } else if (hex.length === 6 || hex.length === 8) {
    r = parseHexChannel(hex.substring(0, 2));
    g = parseHexChannel(hex.substring(2, 4));
    b = parseHexChannel(hex.substring(4, 6));
  }

  if (hex.length === 8) {
    alpha = Math.floor(parseHexChannel(hex.substring(6)) / 255 * 100);
  } else if (hex.length === 3 || hex.length === 6) {
    alpha = 100;
  }

  return {
    r,
    g,
    b,
    alpha,
  };
}

export function parseColorToHSV(value: string) {
  let alpha = 100;
  let h = 0;
  let s = 100;
  let v = 100;

  const fromHSV = (_h: number, _s: number, _v: number) => {
    h = Math.max(0, Math.min(360, _h));
    s = Math.max(0, Math.min(100, _s));
    v = Math.max(0, Math.min(100, _v));
  };

  if (value.indexOf('hsl') !== -1) {
    const res = parseHSLString(value);
    h = res.h;
    s = res.s;
    v = res.v;
    alpha = res.alpha;
  } else if (value.indexOf('hsv') !== -1) {
    const res = parseHSVString(value);
    h = res.h;
    s = res.s;
    v = res.v;
    alpha = res.alpha;
  } else if (value.indexOf('rgb') !== -1) {
    const res = parseRGBBracket(value);
    h = res.h;
    s = res.s;
    v = res.v;
    alpha = res.alpha;
  } else if (value.indexOf('#') !== -1) {
    const rgb = parseRGBHex(value);
    const { r, g, b } = rgb;
    alpha = rgb.alpha;

    const res = rgb2hsv(r, g, b);
    h = res.h;
    s = res.s;
    v = res.v;
  }

  fromHSV(h, s, v);

  return {
    h,
    s,
    v,
    alpha,
  };
}
