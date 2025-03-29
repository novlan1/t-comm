const { hsv2rgb, parseRGBHex, rgb2hsv } = require('../../../lib');


function main() {
  console.log(parseRGBHex('fff'));
  console.log(parseRGBHex('83ce13d1'));
  console.log(parseRGBHex('868e7a42'));
  console.log(parseRGBHex('000'));


  const { r, g, b } = parseRGBHex('868e7a42');
  console.log();
  const { h, s, v } = rgb2hsv(r, g, b);
  console.log(hsv2rgb(h, s, v));
}


main();
