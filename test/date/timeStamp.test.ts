import {
  getDBYEndTimeStamp,
  getDBYStartTimeStamp,
  getDayEndTimeStamp,
  getDayStartTimestamp,
  getTodayEndTimeStamp,
  getTodayStartTimestamp,
  getYesterdayEndTimeStamp,
  getYesterdayStartTimeStamp,
} from '../../src';

describe('getDayStartTimestamp', () => {
  it('getDayStartTimestamp', () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    expect(getDayStartTimestamp(0)).toBe(parseInt(`${date.getTime() / 1000}`, 10));
    expect(getDayStartTimestamp(0, 'ms')).toBe(date.getTime());
    expect(getDayStartTimestamp(0, 'MS')).toBe(date.getTime());
  });
});

describe('getDayEndTimeStamp', () => {
  it('getDayEndTimeStamp', () => {
    const date = new Date();
    date.setHours(23, 59, 0, 0);

    expect(getDayEndTimeStamp(0)).toBe(parseInt(`${date.getTime() / 1000}`, 10));
    expect(getDayEndTimeStamp(0, 'ms')).toBe(date.getTime());
    expect(getDayEndTimeStamp(0, 'MS')).toBe(date.getTime());
    expect(getDayEndTimeStamp(0, 'MS', 'm')).toBe(date.getTime());

    date.setHours(23, 59, 59, 0);
    expect(getDayEndTimeStamp(0, 'MS', 's')).toBe(date.getTime());

    date.setHours(23, 59, 59, 999);
    expect(getDayEndTimeStamp(0, 'MS', 'ms')).toBe(date.getTime());

    date.setHours(23, 0, 0, 0);
    expect(getDayEndTimeStamp(0, 'MS', 'h')).toBe(date.getTime());
  });
});


describe('getTodayStartTimestamp', () => {
  it('getTodayStartTimestamp', () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    expect(getTodayStartTimestamp()).toBe(parseInt(`${date.getTime() / 1000}`, 10));
    expect(getTodayStartTimestamp('ms')).toBe(date.getTime());
    expect(getTodayStartTimestamp('MS')).toBe(date.getTime());
  });
});

describe('getTodayEndTimeStamp', () => {
  it('getTodayEndTimeStamp', () => {
    const date = new Date();
    date.setHours(23, 59, 0, 0);

    expect(getTodayEndTimeStamp()).toBe(parseInt(`${date.getTime() / 1000}`, 10));
    expect(getTodayEndTimeStamp('ms')).toBe(date.getTime());
    expect(getTodayEndTimeStamp('MS')).toBe(date.getTime());
  });
});


describe('getYesterdayStartTimeStamp', () => {
  it('getYesterdayStartTimeStamp', () => {
    const date = new Date(Date.now() - 24 * 60 * 60 * 1000);
    date.setHours(0, 0, 0, 0);

    expect(getYesterdayStartTimeStamp()).toBe(parseInt(`${date.getTime() / 1000}`, 10));
    expect(getYesterdayStartTimeStamp('ms')).toBe(date.getTime());
    expect(getYesterdayStartTimeStamp('MS')).toBe(date.getTime());
  });
});

describe('getYesterdayEndTimeStamp', () => {
  it('getYesterdayEndTimeStamp', () => {
    const date = new Date(Date.now() - 24 * 60 * 60 * 1000);
    date.setHours(23, 59, 0, 0);

    expect(getYesterdayEndTimeStamp()).toBe(parseInt(`${date.getTime() / 1000}`, 10));
    expect(getYesterdayEndTimeStamp('ms')).toBe(date.getTime());
    expect(getYesterdayEndTimeStamp('MS')).toBe(date.getTime());
  });
});

describe('getDBYStartTimeStamp', () => {
  it('getDBYStartTimeStamp', () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    date.setHours(0, 0, 0, 0);

    expect(getDBYStartTimeStamp()).toBe(parseInt(`${date.getTime() / 1000}`, 10));
    expect(getDBYStartTimeStamp('ms')).toBe(date.getTime());
    expect(getDBYStartTimeStamp('MS')).toBe(date.getTime());
  });
});

describe('getDBYEndTimeStamp', () => {
  it('getDBYEndTimeStamp', () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    date.setHours(23, 59, 0, 0);

    expect(getDBYEndTimeStamp()).toBe(parseInt(`${date.getTime() / 1000}`, 10));
    expect(getDBYEndTimeStamp('ms')).toBe(date.getTime());
    expect(getDBYEndTimeStamp('MS')).toBe(date.getTime());
  });
});
