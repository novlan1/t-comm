import { flatten, flat, shuffle, getAccCellWidth, sortByStr } from '../../src';
import * as listUtils from '../../src/base/list';

describe('flatten', () => {
  it('flatten', () => {
    expect(typeof flatten([{ id: 1, name: 'a' }], 'id')).toBe('object');

    expect(flatten([{ id: 1, name: 'a' }], 'id')[1].name).toBe('a');


    expect(listUtils.flatten([{ id: 1, name: 'a' }], 'id')[1].name).toBe('a');
  });
});


describe('flat', () => {
  it('flat', () => {
    expect(flat([[1, 2, 3]])).toEqual([1, 2, 3]);
    expect(flat([[1, 2, 3], [2, 2, 2]])).toEqual([1, 2, 3, 2, 2, 2]);
    expect(flat([[1, 2, 3, [1, [1]]], [2, 2, 2]]))
      .toEqual([1, 2, 3, 1, 1, 2, 2, 2]);

    expect(flat([[1, 2, 3, [1, [{ a: 1 }]]], [{ b: 2 }, 2, 2]]))
      .toEqual([1, 2, 3, 1, { a: 1 }, { b: 2 }, 2, 2]);
  });
});


describe('shuffle', () => {
  it('shuffle', () => {
    const list = shuffle([1, 2, 3, 4, 5, 6]);
    expect(typeof list).toBe('object');
    expect(list.length).toBe(6);
  });
});


describe('getAccCellWidth', () => {
  it('getAccCellWidth', () => {
    expect(getAccCellWidth([1, 2, 3], 0)).toBe(1);
    expect(getAccCellWidth([1, 2, 3], 1)).toBe(3);
    expect(getAccCellWidth([1, 2, 3], 2)).toBe(6);
    expect(getAccCellWidth([1, 2, 3], 3)).toBe(6);
    expect(getAccCellWidth([1, 2, 3], 4)).toBe(6);
  });
});


describe('sortByStr', () => {
  it('sortByStr', () => {
    const list = [
      'abcd',
      'addf',
      'ddf',
      'dd/da',
    ];
    sortByStr(list);
    expect(list).toStrictEqual([
      'abcd',
      'addf',
      'dd/da',
      'ddf',
    ]);
  });
});
