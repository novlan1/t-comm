import { getCountDownObj, timeStampFormat } from '../../src';

describe('timeStampFormat', () => {
  it('timeStampFormat', () => {
    expect(timeStampFormat(1647503559488, 'yyyy-MM-dd hh:mm:ss')).toBe('2022-03-17 15:52:39');
    expect(timeStampFormat(1647503559488, 'yy-M-d h:m:s')).toBe('22-3-17 15:52:39');

    expect(timeStampFormat(1662336488000, 'yy-M-d h:m:s')).toBe('22-9-5 8:8:8');
    expect(timeStampFormat(1662336488000, 'yyyy-MM-dd hh:mm:ss')).toBe('2022-09-05 08:08:08');
  });

  it('whitePrefix', () => {
    expect(timeStampFormat(1662336488000, 'Dea\\dline: M-d at hh:mm', '', '\\\\')).toBe('Deadline: 9-5 at 08:08');
    expect(timeStampFormat(1662336488000, 'Dea$dline: M-d at hh:mm', '', '\\$')).toBe('Deadline: 9-5 at 08:08');
    expect(timeStampFormat(1662336488000, 'Dea%dline: M-d at hh:mm', '', '%')).toBe('Deadline: 9-5 at 08:08');
    expect(timeStampFormat(1662336488000, 'Dea%ddline: M-d at hh:mm', '', '%')).toBe('Deaddline: 9-5 at 08:08');

    expect(timeStampFormat(1662336488000, 'xxx \\y \\d \\h \\m: M-d at hh:mm', '', '\\\\')).toBe('xxx y d h m: 9-5 at 08:08');
    expect(timeStampFormat(1662336488000, 'xxx yy \\y \\d \\h \\m: M-d at hh:mm', '', '\\\\')).toBe('xxx 22 y d h m: 9-5 at 08:08');
    expect(timeStampFormat(1662336488000, '\\y \\d \\h \\m: M-d at hh:mm', '', '\\\\')).toBe('y d h m: 9-5 at 08:08');
    expect(timeStampFormat(1662336488000, '\\yy \\d \\h \\m: M-d at hh:mm', '', '\\\\')).toBe('yy d h m: 9-5 at 08:08');
    expect(timeStampFormat(1662336488000, '\\yyyy \\d \\h \\m: M-d at hh:mm', '', '\\\\')).toBe('yyyy d h m: 9-5 at 08:08');
    expect(timeStampFormat(1662336488000, 'yyyy \\d \\h \\m: M-d at hh:mm', '', '\\\\')).toBe('2022 d h m: 9-5 at 08:08');
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
