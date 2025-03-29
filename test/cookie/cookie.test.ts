import { clearAll, clearCookie, getCookie, setCookie } from '../../src';

describe('getCookie', () => {
  it('getCookie', () => {
    expect(getCookie('name')).toBe('');

    window.document.cookie = 'name=mike; ';
    expect(getCookie('name')).toBe('mike');
  });
});


describe('setCookie', () => {
  it('setCookie', () => {
    setCookie('name', 'lee');
    setCookie('age', '19');
    expect(getCookie('name')).toBe('lee');
    expect(getCookie('age')).toBe('19');
  });
});


describe('clearCookie', () => {
  it('clearCookie', () => {
    setCookie('name', 'lee');
    clearCookie('name');
    expect(getCookie('name')).toBe('');
  });
});


describe('clearAll', () => {
  it('clearAll', () => {
    setCookie('name', 'lee');
    setCookie('age', '19');
    clearAll();
    expect(getCookie('name')).toBe('');
    expect(getCookie('age')).toBe('');
  });
});
