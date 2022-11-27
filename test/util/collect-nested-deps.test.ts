import { collectNestedDeps } from '../../src';

describe('collectNestedDeps', () => {
  it('collectNestedDeps.empty', () => {
    const deps = {};

    expect(collectNestedDeps({ deps })).toEqual([]);
  });

  it('collectNestedDeps.a', () => {
    const deps = {
      a: ['b'],
      b: ['g', 'a'],
    };

    expect(collectNestedDeps({ deps })).toEqual([
      {
        name: 'a',
        children: [
          {
            name: 'b',
            children: [
              {
                name: 'g',
                children: [

                ],
              },
            ],
          },
        ],
      },
      {
        name: 'b',
        children: [
          {
            name: 'g',
            children: [

            ],
          },
        ],
      },
    ]);
  });

  it('collectNestedDeps.b', () => {
    const deps = {
      a: ['b'],
      b: ['g', 'a'],
      g: ['p'],
    };

    expect(collectNestedDeps({ deps })).toEqual([
      {
        name: 'a',
        children: [
          {
            name: 'b',
            children: [
              {
                name: 'g',
                children: [
                  {
                    name: 'p',
                    children: [

                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'b',
        children: [
          {
            name: 'g',
            children: [
              {
                name: 'p',
                children: [

                ],
              },
            ],
          },
        ],
      },
      {
        name: 'g',
        children: [
          {
            name: 'p',
            children: [

            ],
          },
        ],
      },
    ]);
  });

  it('collectNestedDeps.c', () => {
    const deps = {
      a: ['b'],
      b: ['g', 'a'], // 循环引用
      g: ['p'],
      p: ['d', 'a', 'p', 'b'],
    };

    expect(collectNestedDeps({ deps })).toEqual([
      {
        name: 'a',
        children: [
          {
            name: 'b',
            children: [
              {
                name: 'g',
                children: [
                  {
                    name: 'p',
                    children: [
                      {
                        name: 'd',
                        children: [

                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'b',
        children: [
          {
            name: 'g',
            children: [
              {
                name: 'p',
                children: [
                  {
                    name: 'd',
                    children: [

                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'g',
        children: [
          {
            name: 'p',
            children: [
              {
                name: 'd',
                children: [

                ],
              },
            ],
          },
        ],
      },
      {
        name: 'p',
        children: [
          {
            name: 'd',
            children: [

            ],
          },
        ],
      },
    ]);
  });

  it('collectNestedDeps.d', () => {
    const deps = {
      a: ['b', 'c'],
      b: ['e', 'f', 'g', 'b'],
      g: ['p', 'q', 'a'],
    };

    expect(collectNestedDeps({ deps })).toEqual([
      {
        name: 'a',
        children: [
          {
            name: 'b',
            children: [
              {
                name: 'e',
                children: [

                ],
              },
              {
                name: 'f',
                children: [

                ],
              },
              {
                name: 'g',
                children: [
                  {
                    name: 'p',
                    children: [

                    ],
                  },
                  {
                    name: 'q',
                    children: [

                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'c',
            children: [

            ],
          },
        ],
      },
      {
        name: 'b',
        children: [
          {
            name: 'e',
            children: [

            ],
          },
          {
            name: 'f',
            children: [

            ],
          },
          {
            name: 'g',
            children: [
              {
                name: 'p',
                children: [

                ],
              },
              {
                name: 'q',
                children: [

                ],
              },
            ],
          },
        ],
      },
      {
        name: 'g',
        children: [
          {
            name: 'p',
            children: [

            ],
          },
          {
            name: 'q',
            children: [

            ],
          },
        ],
      },
    ]);
  });


  it('collectNestedDeps.parseExistFn.a', () => {
    const deps = {
      a: ['b'],
      b: ['g', 'a'],
    };
    function parseExistFn() {
      return null;
    }
    expect(collectNestedDeps({ deps, parseExistFn })).toEqual([
      {
        name: 'a',
        children: [
          {
            name: 'b',
            children: [
              {
                name: 'g',
                children: [
                ],
              },
            ],
          },
        ],
      },
    ]);
  });

  it('collectNestedDeps.parseExistFn.b', () => {
    const deps = {
      a: ['b'],
      b: ['g', 'a'],
    };
    function parseExistFn(child) {
      return {
        name: `EXIST_${child}`,
        children: [],
      };
    }

    expect(collectNestedDeps({ deps, parseExistFn })).toEqual([
      {
        name: 'a',
        children: [
          {
            name: 'b',
            children: [
              {
                name: 'g',
                children: [
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'EXIST_b',
        children: [],
      },
    ]);
  });

  it('collectNestedDeps.filterFn.a', () => {
    const deps = {
      a: ['b', 'e'],
      b: ['g', 'a'],
    };
    function filterFn(key) {
      if (key === 'b') {
        return null;
      }
    }
    expect(collectNestedDeps({ deps, filterFn })).toEqual([
      {
        name: 'a',
        children: [
          {
            name: 'e',
            children: [
            ],
          },
        ],
      },
    ]);
  });
});
