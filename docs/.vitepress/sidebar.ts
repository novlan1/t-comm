import fs from 'fs';

const DOC_PATH = 'docs/zh';


export function getSidebarConfig() {
  const list = fs.readdirSync(DOC_PATH);

  const result = list.map((item) => {
    const newPath = `${DOC_PATH}/${item}`;
    const stat = fs.lstatSync(newPath);
    const name = item.replace(/\.[\w]+$/, '');

    if (stat.isDirectory()) {
      const secondList = fs.readdirSync(newPath);
      const items = secondList.map((secondItem) => {
        const name = secondItem.replace(/\.[\w]+$/, '');
        return {
          text: name,
          link: `/zh/${item}/${secondItem}`,
        };
      });

      if (items.length === 1) {
        return {
          text: name,
          link: items[0].link,
        };
      }

      return {
        text: name,
        collapsed: true,
        items,
      };
    }


    return {
      text: name,
      link: `/zh/${item}`,
    };
  });

  // console.log('[result]', result);
  return result;
}


