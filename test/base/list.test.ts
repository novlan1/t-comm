import { flatten } from '../../src';

describe('flatten', () => {
  it('flatten', () => {
    expect(typeof flatten([{ id: 1, name: 'a' }], 'id')).toBe('object');

    expect(flatten([{ id: 1, name: 'a' }], 'id')[1].name).toBe('a');
  });
});
