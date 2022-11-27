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
      a: ['bb', 'c'],
      bb: ['e', 'f', 'g', 'bb'],
      g: ['p', 'q', 'a'],
    };

    expect(getFlattenedDeps(deps)).toEqual({
      a: ['bb', 'e', 'f', 'g', 'p', 'q', 'c'],
      bb: ['e', 'f', 'g', 'p', 'q'],
      g: ['p', 'q'],
    });
  });

  it('getFlattenedDeps.repeat', () => {
    const deps = {
      a: ['bb', 'c', 't'],
      bb: ['e', 'f', 'g', 'bb', 't'],
      g: ['p', 'q', 'a', 't'],
    };

    expect(getFlattenedDeps(deps)).toEqual({
      a: ['bb', 'e', 'f', 'g', 'p', 'q', 't', 'c'],
      bb: ['e', 'f', 'g', 'p', 'q', 't'],
      g: ['p', 'q', 't'],
    });
  });
});
