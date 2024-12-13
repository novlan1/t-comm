import { flattenUsingComponentMap } from '../../src';


describe('flattenUsingComponentMap', () => {
  it('flattenUsingComponentMap', () => {
    const result = flattenUsingComponentMap({
      a: { ABC: { DDD: { JJJ: {} } }, EEE: {}, Z: {} },
      ABC: { DDD: { JJJ: {} } },
      DDD: { JJJ: {} },
    });

    expect(result).toEqual({
      a: ['ABC', 'EEE', 'Z', 'DDD', 'JJJ'],
      ABC: ['DDD', 'JJJ'],
      DDD: ['JJJ'],
    });
  });

  it('circular-1', () => {
    // 组件C 循环引用了 组件A
    // 间隔 2 级
    const page = { compA: { compB: { compC: {} } } };
    page.compA.compB.compC = page.compA;

    const result = flattenUsingComponentMap(page);

    expect(result).toEqual({
      compA: ['compB'],
    });
  });

  it('circular-2', () => {
    // 组件C 循环引用了 组件B
    // 间隔 1 级

    const page = { compA: { compB: { compC: {} } } };
    page.compA.compB.compC = page.compA.compB;

    const result = flattenUsingComponentMap(page);

    expect(result).toEqual({
      compA: ['compB'],
    });
  });


  it('circular-3', () => {
    // 组件B 循环引用了 组件B
    // 间隔 0 级
    const page = { compA: { compB: { compB: {} } } };
    page.compA.compB.compB = page.compA.compB;

    const result = flattenUsingComponentMap(page);

    expect(result).toEqual({
      compA: ['compB'],
    });
  });

  it('circular-4', () => {
    // 组件C 循环引用了 组件C
    // 相比上例，层次更深
    const page = { compA: { compB: { compC: { compC: {} } } } };
    page.compA.compB.compC.compC = page.compA.compB.compC;

    const result = flattenUsingComponentMap(page);

    expect(result).toEqual({
      compA: ['compB'],
    });
  });

  it('circular-5', () => {
    // 组件A 循环引用了 组件C
    // 组件C 循环引用了 组件A
    const page = {
      compAA: { compBB: {} },
      compBB: { compCC: {} },
      compCC: { compAA: {} },
    };

    page.compAA.compBB = page.compBB;
    page.compBB.compCC = page.compCC;
    page.compCC.compAA = page.compAA;

    const result = flattenUsingComponentMap(page);

    expect(result).toEqual({
      compAA: ['compBB', 'compCC'],
      compBB: ['compCC', 'compAA'],
      compCC: ['compAA', 'compBB'],
    });
  });
});
