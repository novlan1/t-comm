import { getFlattenedDeps } from '../../src';


describe('getFlattenedDeps', () => {
  it('getFlattenedDeps.a', () => {
    const deps = {
      a: ['b'],
      b: ['g', 'a'],
    };

    expect(getFlattenedDeps(deps)).toEqual({
      a: ['b', 'g'],
      b: ['g'],
    });
  });

  it('getFlattenedDeps.b', () => {
    const deps = {
      a: ['b'],
      b: ['g', 'a'],
      g: ['p'],
    };


    expect(getFlattenedDeps(deps)).toEqual({
      a: ['b', 'g', 'p'],
      b: ['g', 'p'],
      g: ['p'],
    });
  });


  it('getFlattenedDeps.c', () => {
    const deps = {
      a: ['b'],
      b: ['g', 'a'], // 循环引用
      g: ['p'],
      p: ['d', 'a', 'p', 'b'],
    };

    expect(getFlattenedDeps(deps)).toEqual({
      a: ['b', 'g', 'p', 'd'],
      b: ['g', 'p', 'd'],
      g: ['p', 'd'],
      p: ['d'],
    });
  });

  it('getFlattenedDeps.d', () => {
    const deps = {
      a: ['b', 'c'],
      b: ['e', 'f', 'g', 'b'],
      g: ['p', 'q', 'a'],
    };

    expect(getFlattenedDeps(deps)).toEqual({
      a: ['b', 'e', 'f', 'g', 'p', 'q', 'c'],
      b: ['e', 'f', 'g', 'p', 'q'],
      g: ['p', 'q'],
    });
  });
});
