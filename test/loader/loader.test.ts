import { loadCSS } from '../../src';

describe('loadCSS', () => {
  it('loadCSS', () => {
    const mockFunc = jest.fn();
    const oriFunc = document.createElement;
    document.createElement = function (...args) {
      mockFunc();
      // @ts-ignore
      return oriFunc.apply(this, args);
    };
    loadCSS('https://test.css');

    expect(mockFunc).toHaveBeenCalled();
  });
});

