import { getFullCompName, getPureCompName  } from '../../src';


describe('getFullCompName', () => {
  it('getFullCompName', () => {
    expect(getFullCompName('swiper-item', 'press-')).toBe('press-swiper-item');
    expect(getFullCompName('press-swiper-item', 'press-')).toBe('press-swiper-item');
    expect(getFullCompName('button', 'press-')).toBe('press-button');
    expect(getFullCompName('press-button', 'press-')).toBe('press-button');
  });
});


describe('getPureCompName', () => {
  it('getPureCompName', () => {
    expect(getPureCompName('swiper-item', 'press-')).toBe('swiper-item');
    expect(getPureCompName('press-swiper-item', 'press-')).toBe('swiper-item');
    expect(getPureCompName('button', 'press-')).toBe('button');
    expect(getPureCompName('press-button', 'press-')).toBe('button');
  });
});
