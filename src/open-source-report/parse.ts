import type { IReportArr, IRequestInfo, ISearchInfo } from './types';

const DISABLE_STATUS = [100, -1];

function isWhiteProject(whiteList: Array<string>, codeUrl = '') {
  const projectName = getWholeProjectName(codeUrl);
  if (whiteList.includes(projectName)) return true;
  return false;
}


function getWholeProjectName(codeUrl = '') {
  const reg = /https?:\/\/[\w\-.]+\/([/\w-]+)(.git)?/;
  const match = codeUrl.match(reg);
  return match?.[1] || codeUrl;
}


export function parseOpenSourceReport({
  reportArr,
  date,
  formattedDate,
  searchInfo,
  requestInfo,
  maxShowLinkNum = 0,
  whiteList = [],
  filterOrgPath = '',
}: {
  reportArr: IReportArr;
  date: string;
  formattedDate: string;

  searchInfo: ISearchInfo;
  requestInfo: IRequestInfo;
  maxShowLinkNum?: number;
  whiteList?: Array<string>;
  filterOrgPath?: string
}) {
  const problemArr = reportArr
    .filter(item => !DISABLE_STATUS.includes(item.code_specification_score)
    || !DISABLE_STATUS.includes(item.code_security_score))
    .filter((item: any) => !isWhiteProject(whiteList, item.code_url))
    .filter((item: any) => !filterOrgPath || filterOrgPath === item.org_path)
    .sort((a, b) => {
      const aSpec = a.code_specification_score;
      const aSecurity = a.code_security_score;

      const bSpec = b.code_specification_score;
      const bSecurity = b.code_security_score;

      const getScore = (score: number) => (DISABLE_STATUS.indexOf(score) > -1 ? 100 : score);
      return getScore(aSpec) + getScore(aSecurity) - (getScore(bSpec) + getScore(bSecurity));
    });

  if (!problemArr.length) {
    console.log('[parseOpenSourceReport] Error: 没有开源治理问题数据');
    // 没问题时也返回数据
    // return;
  }

  const list =  problemArr.reduce((acc, item, index) => {
    const temp: any = [];

    if (!DISABLE_STATUS.includes(item.code_specification_score)) {
      temp.push(`规范: ${parseInt(`${item.code_specification_score}`, 10)}分`);
    }
    if (!DISABLE_STATUS.includes(item.code_security_score)) {
      temp.push(`安全: ${parseInt(`${item.code_security_score}`, 10)}分`);
    }
    const { owners = '' } = item;
    temp.push(owners.split(';')
      .map(item => `<@${item}>`));
    const showProject = `[${item.project_name}](${item.codecc_url})`;

    if (index < maxShowLinkNum) {
      acc.push(`${index + 1}. ${showProject}: ${temp.join(', ')}`);
    } else if (index === maxShowLinkNum) {
      acc.push(`... 已省略${problemArr.length - maxShowLinkNum}条 ...`);
    } else {
    }

    return acc;
  }, [] as Array<string>);

  if (!reportArr.length && !list.length) {
    list.push('抱歉，未拉取到数据～');
  } else if (!list.length) {
    list.push('恭喜，暂未发现问题，请继续保持 🚀');
  }

  const chatContent = [
    `>【${requestInfo?.groupName || requestInfo?.centerName || ''}开源治理问题】[${formattedDate}](${getTechMapWebsiteUrl(date, searchInfo)})`,
    ...list,
  ];

  return chatContent.join('\n');
}


function getTechMapWebsiteUrl(date: string, searchInfo = { prefix: '' }) {
  const data = {
    org: 0,
    step: 'days',
    period_type: 'date',
    data_date: `${date}`,
    displayGroup: ['sum'],
    compare: false,
    sort_column: 'code_specification_score',
    sort_direction: 'asc',
    ...(searchInfo || {}),
  };
  return `${searchInfo.prefix}${encodeURIComponent(JSON.stringify(data))}`;
}
