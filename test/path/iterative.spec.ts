import { genIterativeComponentMap } from '../../src';

describe('genIterativeComponentMap', () => {
  it('genIterativeComponentMap', () => {
    const result = {
      a: {
        ABC: {},
        EEE: {},
        Z: {},
      },
      ABC: {
        DDD: {},
      },
      DDD: {
        JJJ: {},
      },
    };
    genIterativeComponentMap(result);

    expect(result).toEqual({
      a: { ABC: { DDD: { JJJ: {} } }, EEE: {}, Z: {} },
      ABC: { DDD: { JJJ: {} } },
      DDD: { JJJ: {} },
    });
  });

  it('circular', () => {
    const page = {
      compAA: { compBB: {} },
      compBB: { compCC: {} },
      compCC: { compAA: {} },
    };

    page.compAA.compBB = page.compBB;
    page.compBB.compCC = page.compCC;
    page.compCC.compAA = page.compAA;

    genIterativeComponentMap(page);

    expect(() => JSON.stringify(page)).toThrow(/Converting circular structure to JSON/);
  });
});
