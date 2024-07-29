import {
  composeRobotContent,
  // compareData,
  // parseWeatherData,
} from '../../src/weather/parse';

describe('composeRobotContent', () => {
  it('composeRobotContent', () => {
    expect(composeRobotContent([])).toBe('当前深圳预警已全部解除');

    expect(composeRobotContent([{
      date: 1,
      alarmArea: 2,
      alarmType: 3,
      alarmColor: 4,
    }]))
      .toMatch(/>【深圳当前生效的预警】/);
  });
});


// describe('compareData', () => {
//   it('compareData', () => {
//     // jest.mock('fs', () => ({
//     //   writeFileSync: jest.fn(),
//     //   existsSync: jest.fn(),
//     //   mkdirSync: jest.fn(),
//     //   readFileSync: () => 1,
//     // }));

//     expect(compareData([])).toBe(true);
//   });
// });

// describe('parseWeatherData', () => {
//   it('parseWeatherData', () => {
//     expect(parseWeatherData([])).toEqual({
//       isSame: true,
//       content: '当前深圳预警已全部解除',
//     });
//   });
// });
