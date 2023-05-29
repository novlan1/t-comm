export const RAINBOW_VALUE_TYPE_MAP = {
  1: {
    type: 'NUMBER',
    ext: 'txt',
  },
  2: {
    type: 'STRING',
    ext: 'txt',
  },
  3: {
    type: 'TEXT',
    ext: 'txt',
  },
  4: {
    type: 'JSON',
    ext: 'json',
  },
  5: {
    type: 'XML',
    ext: 'xml',
  },
  18: {
    type: 'DATE',
    ext: 'txt',
  },
  20: {
    type: 'YAML',
    ext: 'yml',
  },
};

export type RainbowKeyValueType = keyof typeof RAINBOW_VALUE_TYPE_MAP;
