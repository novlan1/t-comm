import {
  getUnitPreviousRatio,
  getThousandSeparator,
  getThousandSeparator2,
} from '../../src';

describe('getUnitPreviousRatio', () => {
  it('getUnitPreviousRatio', () => {
    expect(getUnitPreviousRatio(1, 1)).toBe('0.0%');

    expect(getUnitPreviousRatio(1, 2)).toBe('-50.0%');
    expect(getUnitPreviousRatio(2, 1)).toBe('+100.0%');

    expect(getUnitPreviousRatio(0.5, 0)).toBe('+999+%');
    expect(getUnitPreviousRatio(1, 0)).toBe('+999+%');
    expect(getUnitPreviousRatio(2, 0)).toBe('+999+%');
    expect(getUnitPreviousRatio(3, 0)).toBe('+999+%');
    expect(getUnitPreviousRatio(4, 0)).toBe('+999+%');

    expect(getUnitPreviousRatio(0.5, 1)).toBe('-50.0%');
    expect(getUnitPreviousRatio(0, 1)).toBe('-100.0%');
    expect(getUnitPreviousRatio(0, 2)).toBe('-100.0%');
    expect(getUnitPreviousRatio(0, 3)).toBe('-100.0%');
    expect(getUnitPreviousRatio(0, 4)).toBe('-100.0%');
  });
});


describe('getThousandSeparator', () => {
  it('getThousandSeparator', () => {
    expect(getThousandSeparator('123123123')).toBe('123,123,123');
  });
});


describe('getThousandSeparator2', () => {
  it('getThousandSeparator2', () => {
    expect(getThousandSeparator2('12345678 123456789')).toBe('12,345,678 123,456,789');
  });
});
