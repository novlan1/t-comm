const HEX_INT_MAP = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 };
const INT_HEX_MAP = { 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F' };

type IHexKey = keyof typeof HEX_INT_MAP;
type IHexIntKey = keyof typeof INT_HEX_MAP;


export const isOnePointZero = function (n: any) {
  return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
};

export const isPercentage = function (n: any) {
  return typeof n === 'string' && n.indexOf('%') !== -1;
};


// Take input from [0, n] and return it as [0, 1]
export const bound01 = function (value: any, max: number) {
  if (isOnePointZero(value)) value = '100%';

  const processPercent = isPercentage(value);
  value = Math.min(max, Math.max(0, parseFloat(value)));

  // Automatically convert percentage into number
  if (processPercent) {
    value = parseInt(`${value * max}`, 10) / 100;
  }

  // Handle floating point rounding errors
  if ((Math.abs(value - max) < 0.000001)) {
    return 1;
  }

  // Convert into [0, 1] range if it isn't already
  return (value % max) / parseFloat(`${max}`);
};


export const parseHexChannel = function (hex: any) {
  if (hex.length === 2) {
    return (HEX_INT_MAP[hex[0].toUpperCase() as IHexKey] || +hex[0]) * 16
    + (HEX_INT_MAP[hex[1].toUpperCase() as IHexKey] || +hex[1]);
  }

  return HEX_INT_MAP[hex[0].toUpperCase() as IHexKey] || +hex[0];
};


export const rgbToHex = function ({ r, g, b }: {
  r: number;
  g: number;
  b: number;
}) {
  const hexOne = function (value: number) {
    value = Math.min(Math.round(value), 255);
    const high = Math.floor(value / 16);
    const low = value % 16;
    return `${INT_HEX_MAP[high as IHexIntKey] || high}${INT_HEX_MAP[low as IHexIntKey] || low}`;
  };

  if (isNaN(r) || isNaN(g) || isNaN(b)) return '';

  return `#${hexOne(r)}${hexOne(g)}${hexOne(b)}`;
};
