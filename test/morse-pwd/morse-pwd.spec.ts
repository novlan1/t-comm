import * as sinon from 'sinon';
import { MorsePwd } from '../../src';


let mockDom: any;

beforeEach(() => {
  document.querySelector = jest.fn();
  mockDom = {
    eventQueue: {},
    addEventListener(type: string, cb: Function) {
      this.eventQueue[type] = cb;
    },
    dispatch(type: string) {
      if (typeof this.eventQueue[type] === 'function') {
        this.eventQueue[type]();
      }
    },
    removeEventListener(type: string) {
      delete this.eventQueue[type];
    },
  };
});


describe('MorsePwd', () => {
  it('MorsePwd.mp', () => {
    const mockFn = jest.fn();
    const morsePwd =  MorsePwd.init({
      pwd: [1, 1, 1, 1, 2],
      cb: () => {
        mockFn();
      },
      envType: 'MP',
    });
    morsePwd.click();
    expect(mockFn).not.toHaveBeenCalled();

    morsePwd.click();
    expect(mockFn).not.toHaveBeenCalled();

    morsePwd.click();
    expect(mockFn).not.toHaveBeenCalled();

    morsePwd.click();
    expect(mockFn).not.toHaveBeenCalled();

    morsePwd.longPress();
    expect(mockFn).toHaveBeenCalled();
  });

  it('MorsePwd.web', () => {
    // @ts-ignore
    document.querySelector.mockReturnValue(mockDom);
    const mockFn = jest.fn();
    const morsePwd: any =  MorsePwd.init({
      pwd: [1, 1, 1],
      cb: () => {
        mockFn();
      },
      envType: 'H5',
      selector: '#app' as keyof HTMLElementTagNameMap,

    });

    mockDom.dispatch('touchstart');
    mockDom.dispatch('touchend');
    expect(mockFn).not.toHaveBeenCalled();

    mockDom.dispatch('touchstart');
    mockDom.dispatch('touchend');
    expect(mockFn).not.toHaveBeenCalled();

    mockDom.dispatch('touchstart');
    mockDom.dispatch('touchend');
    expect(mockFn).toHaveBeenCalled();


    morsePwd.clear();
    mockDom.dispatch('touchstart');
    mockDom.dispatch('touchend');
    expect(mockFn.mock.calls.length).toBe(1);

    mockDom.dispatch('touchstart');
    mockDom.dispatch('touchend');
    expect(mockFn.mock.calls.length).toBe(1);

    mockDom.dispatch('touchstart');
    mockDom.dispatch('touchend');
    expect(mockFn.mock.calls.length).toBe(1);
  });

  it('MorsePwd.web.longPress', () => {
    const clock = sinon.useFakeTimers();
    // @ts-ignore
    document.querySelector.mockReturnValue(mockDom);

    const mockFn = jest.fn();
    MorsePwd.init({
      pwd: [1, 1, 2],
      cb: () => {
        mockFn();
      },
      envType: 'H5',
      selector: '#app' as keyof HTMLElementTagNameMap,
    });

    mockDom.dispatch('touchstart');
    mockDom.dispatch('touchend');
    expect(mockFn).not.toHaveBeenCalled();

    mockDom.dispatch('touchstart');
    mockDom.dispatch('touchmove');
    mockDom.dispatch('touchend');
    expect(mockFn).not.toHaveBeenCalled();

    mockDom.dispatch('touchstart');
    clock.tick(400);
    mockDom.dispatch('touchend');
    expect(mockFn).toHaveBeenCalled();

    clock.restore();
  });
});
