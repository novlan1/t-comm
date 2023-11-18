const { toPromise } = require('../../../lib/index');

const bar = () => 1;
toPromise(bar()).then(res => console.log(res)); // 1

function foo() {
  return new Promise(resolve => setTimeout(() => resolve(2), 1000));
}
toPromise(foo()).then(res => console.log(res)); // 2
