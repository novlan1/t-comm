const { JsDocHandler } = require('../../lib/index');

JsDocHandler.init({
  author: 'novlan1',
  isHandleNav: true,
  extraScript: `
console.log('Hello!')
  `,
});

