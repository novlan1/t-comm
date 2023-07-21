import * as fs from 'fs';

function replaceContent(content: string) {
  const pattern = new RegExp('([0-9.]*[0-9]+)([\\s]*)(rem)', 'g');

  return content.replace(pattern, (_, b: string) => {
    let number = (+b * 50).toFixed(2);

    if (number == `${parseInt(number, 10)}`) {
      // 去掉无效的小数点，比如：28.00
      number = `${parseInt(number, 10)}`;
    }

    return `${number}px`;
  });
}


export function remToPxInFile(filePath: string) {
  const data = fs.readFileSync(filePath, {
    encoding: 'utf-8',
  });

  const newData = replaceContent(data);

  fs.writeFileSync(filePath, newData, {
    encoding: 'utf-8',
  });
}
