import { splitLongList } from '../../src/base/list';

describe('splitLongList', () => {
  it('splitLongList', () => {
    const list = Array.from({ length: 7 }).map((_, i) => `${i + 1}`);
    const result = splitLongList(list, 2, 3);
    expect(result).toMatchObject([
      ['1', '2'],
      ['3', '4'],
      ['5', '6', '7'],
    ]);

    const result2 = splitLongList(list, 3, 3);
    expect(result2).toMatchObject([
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7'],
    ]);
  });
});
