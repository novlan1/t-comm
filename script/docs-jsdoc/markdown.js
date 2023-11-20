const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs-extra');
const path = require('path');

const sourceList = require('./config.js');

const template = fs.readFileSync('./script/docs-jsdoc/template.hbs', 'utf8');
const configure =  path.resolve(process.cwd(), './script/docs-jsdoc/jsdoc2md.json');

function getAllExports(str) {
  const reg = /\n##\s`?([^()\n`]+)/g;
  let regRes = reg.exec(str);
  const res = [];

  while (regRes) {
    res.push(regRes[1]);
    regRes = reg.exec(str);
  }
  return res;
}

function getInsertImportWay(methods, fileName) {
  if (!methods.length) {
    return '';
  }

  const newFileName = fileName.replace('./src/', '').replace('/*', '/index');

  if (methods.length <= 2) {
    const methodStr = methods.join(', ');
    return `
## 引入方式

\`\`\`ts
import { ${methodStr} } from 't-comm';

// or

import { ${methodStr}} from 't-comm/lib/${newFileName}';
\`\`\`
`;
  }

  const methodStr = methods.join(',\n  ');
  return `
## 引入方式

\`\`\`ts
import {
  ${methodStr}
} from 't-comm';

// or

import {
  ${methodStr}
} from 't-comm/lib/${newFileName}';
\`\`\`
`;
}

const makeMarkDownDoc = function (sourceName, sourceRootPath, outputPath) {
  let sourcePath = `${sourceRootPath}/${sourceName}`;
  let outputName = sourceName;

  // 处理js文件的路径，需要区分是文件或目录，目录会将目录下所有文件生成为一个md
  const stat = fs.lstatSync(sourcePath);
  if (stat.isDirectory()) {
    const list = fs.readdirSync(sourcePath);

    list.forEach((item) => {
      const newPath = `${sourcePath}/${item}`;
      const stat = fs.lstatSync(newPath);
      if (stat.isDirectory()) {
        makeMarkDownDoc(item, sourcePath, `${outputPath}/${sourceName}`);
        return;
      }
    });
    sourcePath = `${sourcePath}/*`;
  }


  if (sourceName.indexOf('.js') !== -1) {
    outputName = sourceName.replace('.js', '');
  }

  if (sourceName.indexOf('.ts') !== -1) {
    outputName = sourceName.replace('.ts', '');
  }
  // console.log('outputName', outputName);
  console.log('开始构建文档---', sourcePath);

  jsdoc2md
    .render({
      'example-lang': 'typescript',
      files: path.resolve(process.cwd(), sourcePath),
      'name-format': 'backticks',
      'heading-depth': 2,
      'module-index-format': 'none',
      configure,
      template,
    })
    .then((mdStr) => {
      // 删除第一行的 a 标签，否则 vueperss 生成侧边栏的时候，会出错
      const lines = mdStr
        .replace(/&nbsp;/g, ' ')
        .replace(/(?<=##.*)\\_/g, '_')
        .replace(/Array\.&lt;/g, 'Array&lt;')
        .split('\n');
      lines.splice(0, 1);
      let newText = lines.join('\n');


      const reg = /<dl>[\s\S]+?<\/dl>\n+<a.*?<\/a>/;
      if (reg.test(newText)) {
        newText = newText.replace(reg, '');
      }

      newText = newText.replace(/<p>:::/g, ':::');
      newText = newText.replace(/:::<\/p>/g, ':::');

      if (newText.trim().length) {
        const allExports = getAllExports(newText);
        const importWayStr = getInsertImportWay(allExports, sourcePath);

        fs.outputFile(path.resolve(process.cwd(), `${outputPath}/${outputName}.md`), `[[toc]]\n${importWayStr}\n${newText}`);
      }
    })
    .catch((err) => {
      console.log('[err]', err);
    });
};


function main() {
  sourceList.forEach((sourceObject) => {
    const { root, output, ignoreList, onlyList = [] } = sourceObject;

    const fileList = fs.readdirSync(root);

    fileList.forEach((fileName) => {
      if (onlyList.length) {
        if (onlyList.includes(fileName)) {
          makeMarkDownDoc(fileName, root, output);
        }
      } else if (ignoreList.indexOf(fileName) === -1) {
        makeMarkDownDoc(fileName, root, output);
      }
    });
  });
}


main();
