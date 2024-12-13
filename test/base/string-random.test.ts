import { randomString } from '../../src';


describe('randomString', () => {
  it('randomString', () => {
    expect(randomString().length).toBe(32);
    expect(randomString(8).length).toBe(8);
    expect(randomString(12).length).toBe(12);
  });
});
