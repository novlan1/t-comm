import { getCountDownObj, timeStampFormat } from '../../src';

describe('timeStampFormat', () => {
  it('timeStampFormat', () => {
    expect(timeStampFormat(1647503559488, 'yyyy-MM-dd hh:mm:ss')).toBe('2022-03-17 15:52:39');
  });
});

describe('getCountDownObj', () => {
  it('getCountDownObj', () => {
    expect(getCountDownObj(100)).toEqual({
      fDay: '00',
      fHour: '00',
      fMinute: '01',
      fSecond: '40',
      day: 0,
      hour: 0,
      minute: 1,
      second: 40,
    });

    expect(getCountDownObj(1 * 24 * 60 * 60 + 200)).toEqual({
      fDay: '01',
      fHour: '00',
      fMinute: '03',
      fSecond: '20',
      day: 1,
      hour: 0,
      minute: 3,
      second: 20,
    });

    expect(getCountDownObj(1 * 24 * 60 * 60 + 2 * 60 * 60 + 1 * 60 + 11)).toEqual({
      fDay: '01',
      fHour: '02',
      fMinute: '01',
      fSecond: '11',
      day: 1,
      hour: 2,
      minute: 1,
      second: 11,
    });
  });

  it('test maxUnit', () => {
    expect(getCountDownObj(2 * 60 * 60 + 6 * 60 + 12, 'MINUTE')).toEqual({
      fMinute: '126',
      fSecond: '12',
      minute: 126,
      second: 12,
    });

    expect(getCountDownObj(2 * 60 * 60 + 6 * 60 + 12, 'HOUR')).toEqual({
      fHour: '02',
      fMinute: '06',
      fSecond: '12',
      hour: 2,
      minute: 6,
      second: 12,
    });

    expect(getCountDownObj(1 * 24 * 60 * 60 + 2 * 60 * 60 + 1 * 60 + 11, 'HOUR')).toEqual({
      fHour: '26',
      fMinute: '01',
      fSecond: '11',
      hour: 26,
      minute: 1,
      second: 11,
    });
  });
});
