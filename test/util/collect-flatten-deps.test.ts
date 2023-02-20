import { getFlattenedDeps } from '../../src';


describe('getFlattenedDeps', () => {
  it('getFlattenedDeps.a', () => {
    const deps = {
      a: ['b'],
      b: ['g', 'a'],
      g: ['p'],
      p: ['d', 'a', 'p', 'b'],
    };

    expect(getFlattenedDeps(deps)).toEqual({
      a: ['b', 'g', 'p', 'd'],
      b: ['g', 'p', 'd', 'a'],
      g: ['p', 'd', 'a', 'b'],
      p: ['d', 'a', 'b', 'g'],
    });
  });

  it('getFlattenedDeps.b', () => {
    const deps = {
      'src/common/tools/url/index.ts': [
        'src/common/tools/env/env.ts',
      ],
      'src/common/tools/env/env.ts': [
        'src/common/tools/env/index.ts',
      ],
      'src/common/tools/url/msdk-suffix.ts': [
        'src/common/tools/url/index.ts',
      ],
      'src/common/tools/url/url.ts': [
        'src/common/tools/url/index.ts',
        'src/common/tools/url/msdk-suffix.ts',
      ],
      'src/common/tools/env/index.ts': [
        'src/common/tools/url/msdk-suffix.ts',
      ],
    };


    expect(getFlattenedDeps(deps)).toEqual({
      'src/common/tools/url/index.ts': [
        'src/common/tools/env/env.ts',
        'src/common/tools/env/index.ts',
        'src/common/tools/url/msdk-suffix.ts',
      ],
      'src/common/tools/env/env.ts': [
        'src/common/tools/env/index.ts',
        'src/common/tools/url/msdk-suffix.ts',
        'src/common/tools/url/index.ts',
      ],
      'src/common/tools/url/msdk-suffix.ts': [
        'src/common/tools/url/index.ts',
        'src/common/tools/env/env.ts',
        'src/common/tools/env/index.ts',
      ],
      'src/common/tools/url/url.ts': [
        'src/common/tools/url/index.ts',
        'src/common/tools/env/env.ts',
        'src/common/tools/env/index.ts',
        'src/common/tools/url/msdk-suffix.ts',
      ],
      'src/common/tools/env/index.ts': [
        'src/common/tools/url/msdk-suffix.ts',
        'src/common/tools/url/index.ts',
        'src/common/tools/env/env.ts',
      ],
    });
  });
});
