import { flatten, shuffle, isListAllEqual, getKeyValuesMap } from '../../src';

describe('flatten', () => {
  it('flatten', () => {
    expect(typeof flatten([{ id: 1, name: 'a' }], 'id')).toBe('object');

    expect(flatten([{ id: 1, name: 'a' }], 'id')[1].name).toBe('a');
  });
});


describe('shuffle', () => {
  it('shuffle', () => {
    const list = shuffle([1, 2, 3, 4, 5, 6]);
    expect(typeof list).toBe('object');
    expect(list.length).toBe(6);
  });
});


describe('isListAllEqual', () => {
  it('isListAllEqual', () => {
    expect(isListAllEqual([1, 1, 1, 1, 1, 1])).toBe(true);
    expect(isListAllEqual([1, 1, 1, 1, 1, 2])).toBe(false);
  });
});


describe('getKeyValuesMap', () => {
  it('getKeyValuesMap', () => {
    expect(typeof getKeyValuesMap([])).toBe('object');
    expect(Object.keys(getKeyValuesMap([])).length).toBe(0);
  });

  it('not empty', () => {
    const data = [
      {
        Project: {
          value: 'x',
        },
      }, {
        Project: {
          value: 'y',
        },
      }];
    expect(getKeyValuesMap(data)).toMatchObject({
      Project: ['x', 'y'],
    });
  });

  it('do not have value property', () => {
    const data = [
      {
        Project: 'x',
      }, {
        Project: 'y',
      }];
    expect(getKeyValuesMap(data)).toMatchObject({
      Project: ['x', 'y'],
    });
  });
});
