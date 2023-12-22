import { getMonthDay, getMonthDay2, isSameWeek, isSameDay } from '../../src';

describe('getMonthDay', () => {
  it('getMonthDay', () => {
    expect(getMonthDay(2022, 2)).toBe(28);
    expect(getMonthDay(2022, 3)).toBe(31);
    expect(getMonthDay(2022, 4)).toBe(30);
    expect(getMonthDay(2022, 5)).toBe(31);
  });
});


describe('getMonthDay2', () => {
  it('getMonthDay2', () => {
    expect(getMonthDay2(2022, 2)).toBe(28);
    expect(getMonthDay2(2022, 3)).toBe(31);
    expect(getMonthDay2(2022, 4)).toBe(30);
    expect(getMonthDay2(2022, 5)).toBe(31);
  });
});


describe('isSameWeek', () => {
  it('isSameWeek', () => {
    expect(isSameWeek(1601308800000, 1601395200000)).toBe(true);
    expect(isSameWeek(1601308800000, 1601913600000)).toBe(false);
  });
});


describe('isSameDay', () => {
  it('isSameDay', () => {
    expect(isSameDay(1, 2)).toBe(true);
    expect(isSameDay(1702613769418, 1702527420000)).toBe(false);
    expect(isSameDay(1702613769418, 1702613769419)).toBe(true);
  });
});
