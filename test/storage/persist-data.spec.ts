import { savePersist, getPersist, clearPersist } from '../../src/index';

describe('savePersist', () => {
  it('savePersist', () => {
    expect(savePersist('name', 'mike')).toBe(true);
    expect(getPersist('name')).toBe('mike');
    expect(getPersist('name')).not.toBe('yang');

    clearPersist('name');
    expect(getPersist('name')).toBe(undefined);
  });
});
