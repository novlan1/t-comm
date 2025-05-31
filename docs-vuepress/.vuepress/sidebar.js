const fs = require('fs');

const DOC_PATH = 'docs/zh';


function getSidebarConfig() {
  const list = fs.readdirSync(DOC_PATH);

  const result = list.map((item) => {
    const newPath = `${DOC_PATH}/${item}`;
    const stat = fs.lstatSync(newPath);
    const name = item.replace(/\.[\w]+$/, '');

    if (stat.isDirectory()) {
      const secondList = fs.readdirSync(newPath);
      const children = secondList.map((secondItem) => {
        const name = secondItem.replace(/\.[\w]+$/, '');
        return {
          title: name,
          path: `/zh/${item}/${secondItem}`,
        };
      });

      if (children.length === 1) {
        return {
          title: name,
          path: children[0].path,
        };
      }

      return {
        title: name,
        collapsable: true,
        children,
      };
    }


    return {
      title: name,
      path: `/zh/${item}`,
    };
  });

  // console.log('[result]', result);
  return result;
}


module.exports = { getSidebarConfig };
