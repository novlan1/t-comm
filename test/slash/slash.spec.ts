import { removeFirstAndLastSlash, removeFirstSlash, removeLastSlash } from '../../src/slash';


describe('removeFirstAndLastSlash', () => {
  it('removeFirstAndLastSlash', () => {
    expect(removeLastSlash('')).toBe('');
    expect(removeFirstAndLastSlash('//')).toBe('');
    expect(removeFirstAndLastSlash('/abc.adf.adf/')).toBe('abc.adf.adf');
    expect(removeFirstAndLastSlash('/abc.adf.adf')).toBe('abc.adf.adf');
    expect(removeFirstAndLastSlash('abc.adf.adf/')).toBe('abc.adf.adf');
    expect(removeFirstAndLastSlash('abc.adf.adf')).toBe('abc.adf.adf');
  });
});

describe('removeFirstSlash', () => {
  it('removeFirstSlash', () => {
    expect(removeLastSlash('')).toBe('');
    expect(removeFirstSlash('//')).toBe('/');
    expect(removeFirstSlash('/abc.adf.adf/')).toBe('abc.adf.adf/');
    expect(removeFirstSlash('/abc.adf.adf')).toBe('abc.adf.adf');
    expect(removeFirstSlash('abc.adf.adf/')).toBe('abc.adf.adf/');
    expect(removeFirstSlash('abc.adf.adf')).toBe('abc.adf.adf');
  });
});


describe('removeLastSlash', () => {
  it('removeLastSlash', () => {
    expect(removeLastSlash('')).toBe('');
    expect(removeLastSlash('//')).toBe('/');
    expect(removeLastSlash('/abc.adf.adf/')).toBe('/abc.adf.adf');
    expect(removeLastSlash('/abc.adf.adf')).toBe('/abc.adf.adf');
    expect(removeLastSlash('abc.adf.adf/')).toBe('abc.adf.adf');
    expect(removeLastSlash('abc.adf.adf')).toBe('abc.adf.adf');
  });
});
