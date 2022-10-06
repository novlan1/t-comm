import {
  execCommand,
} from '../../src';


describe('execCommand', () => {
  it('execCommand', () => {
    const mockFunc = jest.fn(command => `mockResult-${command}`);
    jest.mock('child_process', () => ({
      execSync: mockFunc,
    }));

    expect(execCommand('ll')).toBe('mockResult-ll');
    expect(mockFunc).toHaveBeenCalled();
  });
});

describe('t', () => {
  it('ttt', () => {
    console.log(execCommand('ll'));
    expect(1 + 1).toBe(2);
  });
});
