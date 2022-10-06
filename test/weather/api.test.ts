import { fetchWeatherData } from '../../src';


describe('fetchWeatherData', () => {
  it('fetchWeatherData', async () => {
    jest.mock('axios', () => ({
      get: () => Promise.resolve({
        data: {
          subAlarm: { mockData: 1 },
        },
      }),
    }));

    const data = await fetchWeatherData();

    expect(data).not.toBe([]);
    expect(data).toEqual({
      mockData: 1,
    });
  });
});

