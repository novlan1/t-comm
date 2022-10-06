import { getAccCellWidth } from '../../src';

describe('getAccCellWidth', () => {
  it('getAccCellWidth', () => {
    expect(getAccCellWidth([1, 2, 3], 0)).toBe(1);
    expect(getAccCellWidth([1, 2, 3], 1)).toBe(3);
    expect(getAccCellWidth([1, 2, 3], 2)).toBe(6);
    expect(getAccCellWidth([1, 2, 3], 3)).toBe(6);
    expect(getAccCellWidth([1, 2, 3], 4)).toBe(6);
  });
});
