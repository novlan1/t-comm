import { flatten, shuffle  } from '../../src';

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


