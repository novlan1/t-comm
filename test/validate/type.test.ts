import {
  isDate,
  isFunction,
  isRegExp,
} from '../../src';


describe('isRegExp', () => {
  it('isRegExp', () => {
    expect(isRegExp(1)).toBe(false);
    expect(isRegExp(/\d/)).toBe(true);
  });
});

describe('isDate', () => {
  it('isDate', () => {
    expect(isDate(1)).toBe(false);
    expect(isDate(new Date())).toBe(true);
  });
});

describe('isFunction', () => {
  it('isFunction', () => {
    expect(isFunction(1)).toBe(false);
    expect(isFunction(() => {})).toBe(true);
  });
});
