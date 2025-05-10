import { setWithString } from '../../src';


describe('setWithString', () => {
  it('setWithString', () => {
    const obj = { a: { b: { c: 1 } } };

    setWithString(obj, 'a.b.c', { d: 2 });
    expect(obj).toMatchObject({
      a: {
        b: {
          c: {
            d: 2,
          },
        },
      },
    });
  });

  it('key is number', () => {
    const obj = { a: { b: { c: 1 } } };

    setWithString(obj, 'a.b.1.2', { d: 2 });
    setWithString(obj, 'a.b.3', { d: 2 });
    setWithString(obj, 'a.b[4].c', { d: 2 });
    setWithString(obj, 'a.b[5].6', { d: 2 });
    // core test
    setWithString(obj, 'a.b.e.7', { d: 2 });

    expect(obj).toMatchObject({
      a: {
        b: {
          c: 1,
          1: [undefined, undefined, { d: 2 }],
          3: { d: 2 },
          4: { c: { d: 2 } },
          5: [
            undefined, undefined, undefined,
            undefined, undefined, undefined,
            { d: 2 },
          ],
          e: [
            undefined, undefined, undefined,
            undefined, undefined, undefined,
            undefined, { d: 2 },
          ],
        },
      },
    });
  });

  it('key is number 2', () => {
    const obj = { a: [{ b: { c: 3 } }] };
    setWithString(obj, 'a[0].b.c', 4);
    expect(obj).toMatchObject({
      a: [
        {
          b: {
            c: 4,
          },
        },
      ],
    });
  });
});
