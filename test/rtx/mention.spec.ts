import { getMentionRtx } from '../../src';


describe('getMentionRtx', () => {
  it('getMentionRtx', () => {
    expect(getMentionRtx('foo,bar')).toBe('<@foo><@bar>');

    expect(getMentionRtx('foo')).toBe('<@foo>');

    expect(getMentionRtx('')).toBe('');
  });

  it('getMentionRtx with;', () => {
    expect(getMentionRtx('foo;bar')).toBe('<@foo><@bar>');
    expect(getMentionRtx('foo;bar,hello')).toBe('<@foo><@bar><@hello>');
  });
});
