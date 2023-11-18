const { merge } = require('../../../lib');

function main() {
  const rawObject =  {
    a: 'a',
    b: 'b',
  };
  const res = merge(
    {},
    rawObject,
    {
      a: 'new-a',
      b: 'new-b',
      c: 'new-c',
    },
  );

  const res2 = merge(
    rawObject,
    {
      a: 'new-a',
      b: 'new-b',
      c: 'new-c',
    },
  );

  console.log('res', res);
  console.log('rawObject', rawObject);
  console.log('res2', res2);
  console.log('rawObject', rawObject);
}

main();
