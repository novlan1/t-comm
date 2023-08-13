import { getRUMPerformance } from '../../tencent-cloud/rum/performance';
import { createCanvasTable } from '../../canvas/table';
import { batchSendWxRobotBase64Img } from '../../wecom-robot/batch-send';
import { compareTwoList, getMaxAndMinIdx } from '../../base/list';
import CountryMap from './country-map';

// const DEFAULT_REGION = '其他';
const CHINA_REGION = '中国';
const ONE_DAY_SECONDS = 24 * 60 * 60;
const SORT_KEY = 'allCount';
const TABLE_HEADER_MAP = {
  region: '地区',
  allCount: '请求数',
  firstScreen: '首屏耗时',
  dns: 'DNS查询',
  tcp: 'TCP连接',
  ssl: 'SSL建连',
  ttfb: '请求响应',
  contentDownload: '内容传输',
  domParse: '内容解析',
  resourceDownload: '资源加载',

  // appLaunch: '',
  // scriptEvaluate: '',
  // pageRoute: '',
  // firstPaint: '',
  // engineInit: '',
  // bundleLoad: '',
  // firstScreenRequest: '',
  // loadEnd: '',
  // durationCount000Ratio: '',
  // durationCount500Ratio: '',
  // durationCount1000Ratio: '',
  // durationCount3000Ratio: '',
  // durationCount5000Ratio: '',
  // bucketInf: '',
};

type TableHeaderType = keyof typeof TABLE_HEADER_MAP;

const RATIO_KEY_LIST = [
  'durationCount000Ratio',
  'durationCount500Ratio',
  'durationCount1000Ratio',
  'durationCount3000Ratio',
  'durationCount5000Ratio',
];

function isChina(region: string) {
  return !Object.values(CountryMap).includes(region);
}

function fixedNumber(num: number) {
  return Math.floor(num * 100) / 100;
}

function formatValue(value: number | string) {
  if (typeof value !== 'number') return value;
  return fixedNumber(value);
}

function genTableData(data: Array<any>) {
  const tableData = data.map((regionItem) => {
    const temp = Object.keys(regionItem).reduce((ac: Record<string, any>, perfName) => {
      let value = regionItem[perfName];
      if (RATIO_KEY_LIST.includes(perfName)) {
        value = value * 100;
      }

      ac[perfName] = { name: perfName, value: formatValue(value) };
      return ac;
    }, {});
    return temp;
  });
  return tableData;
}

function sortObj(obj: Record<string, any>, sortKeyList: Array<string>) {
  return sortKeyList.reduce((acc: Record<string, any>, key) => {
    if (obj[key] !== undefined) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

function clusterChina(obj: Record<string, any>) {
  obj[CHINA_REGION] = {
    region: CHINA_REGION,
  };

  Object.keys(obj).forEach((region) => {
    if (isChina(region)) {
      Object.keys(obj[region]).forEach((key) => {
        if (key === 'allCount') {
          obj[CHINA_REGION][key] = obj[region][key]  + (obj[CHINA_REGION][key] || 0);
        } else if (key !== 'region') {
          obj[CHINA_REGION][key] = obj[region][key] *  obj[region].allCount  + (obj[CHINA_REGION][key] || 0);
        }
      });
      delete obj[region];
    }
  });

  Object.keys(obj[CHINA_REGION]).map((key) => {
    if (!['allCount', 'region'].includes(key)) {
      obj[CHINA_REGION][key] = obj[CHINA_REGION][key] / obj[CHINA_REGION].allCount;
    }
  });
}

/**
 * [
 *   {
 *     region: '巴西',
 *     allCount: 100,
 *     firstScreen: 1000,
 *     [key]: value
 *   },
 *   'xx': {
 *      // ...
 *   }
 * ]
 */
function parseResult(results: Array<{
  [k: string]: any;
}>) {
  const obj: Record<string, {
    region: string;
  }> = {};
  for (const item of results) {
    item.series.forEach((it: {
      tags: {
        region: string;
      },
      columns: Array<TableHeaderType>;
      values: Array<any>
    }) => {
      const key = it.tags.region;

      if (key) {
        if (!obj[key]) obj[key] = { region: key };

        it.columns.reduce((acc: Record<string, any>, column, columnIndex) => {
          if (TABLE_HEADER_MAP[column] !== undefined) {
            acc[column] = it.values[0][columnIndex];
          }
          return acc;
        }, obj[key]);
      }
    });
  }

  clusterChina(obj);

  return Object.keys(obj).map((key) => {
    const value = sortObj(obj[key], Object.keys(TABLE_HEADER_MAP));
    return value;
  })
    .sort((a, b) => b[SORT_KEY] - a[SORT_KEY]);
  // .reduce((acc,item) => {})

  // return  Object.keys(obj).reduce((acc, key) => {
  //   acc[key] = sortObj(obj[key], Object.keys(TABLE_HEADER_MAP));
  //   return acc;
  // }, {});
}

function getTableHeaders(keyList: Array<TableHeaderType>) {
  return keyList.map(key => TABLE_HEADER_MAP[key] || key);
}

export async function genRUMnPerfData({
  secretId,
  secretKey,
  id,
  startTime,
  endTime,
  type = 'region',
}: {
  secretId: string;
  secretKey: string;
  id: string | number;
  startTime: number;
  endTime: number;
  type?: string;
}) {
  const res = await getRUMPerformance({
    secretId,
    secretKey,
    id,
    startTime,
    endTime,
    type,
  });
  const list = parseResult(res.data || []);
  const tableData = genTableData(list);
  return tableData;
}


export async function genRUMPerfImgAndSend({
  secretId,
  secretKey,
  id,
  startTime,
  endTime,
  type = 'region',

  title = '',
  chatId,
  webhookUrl,
}: {
  secretId: string;
  secretKey: string;
  id: string | number;
  startTime: number;
  endTime: number;
  type?: string;
  title?: string;
  chatId: string;
  webhookUrl: string;
}) {
  const data = await genRUMnPerfData({
    secretId,
    secretKey,
    id,
    startTime,
    endTime,
    type,
  });
  const preData = await genRUMnPerfData({
    secretId,
    secretKey,
    id,
    startTime: startTime - ONE_DAY_SECONDS,
    endTime: endTime - ONE_DAY_SECONDS,
    type,
  });

  compareTwoList(data, preData, 'region');
  const tableData = getMaxAndMinIdx(data);

  if (!tableData.length) return;
  const len = Object.keys(tableData[0]).length;

  const img = createCanvasTable({
    data: tableData,
    headers: getTableHeaders(Object.keys(tableData[0]) as any),
    title,
    cellWidthList: [95, ...Array.from({ length: len }).map(() => 65)],
  });

  if (!img || !chatId) {
    return;
  }

  await batchSendWxRobotBase64Img({
    img,
    webhookUrl,
    chatId,
  });
}
