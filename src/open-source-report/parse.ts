const DISABLE_STATUS = [100, -1];

export function parseOpenSourceReport({
  reportArr,
  date,
  formattedDate,
  searchInfo,
  requestInfo,
  maxShowLinkNum,
}) {
  const problemArr = reportArr
    .filter(item => !DISABLE_STATUS.includes(item.code_specification_score)
    || !DISABLE_STATUS.includes(item.code_security_score))
    .sort((a, b) => {
      const aSpec = a.code_specification_score;
      const aSecurity = a.code_security_score;

      const bSpec = b.code_specification_score;
      const bSecurity = b.code_security_score;

      const getScore = score => (DISABLE_STATUS.indexOf(score) > -1 ? 100 : score);
      return getScore(aSpec) + getScore(aSecurity) - (getScore(bSpec) + getScore(bSecurity));
    });

  if (!problemArr.length) {
    console.log('Error: 没有开源治理问题数据');
    return;
  }
  const list =  problemArr.reduce((acc, item, index) => {
    const temp: any = [];

    if (!DISABLE_STATUS.includes(item.code_specification_score)) {
      temp.push(`规范: ${parseInt(`${item.code_specification_score}`, 10)}分`);
    }
    if (!DISABLE_STATUS.includes(item.code_security_score)) {
      temp.push(`安全: ${parseInt(`${item.code_security_score}`, 10)}分`);
    }

    const showProject = `[${item.project_name}](${item.codecc_url})`;

    if (index < maxShowLinkNum) {
      acc.push(`${index + 1}. ${showProject}: ${temp.join(', ')}`);
    } else if (index === maxShowLinkNum) {
      acc.push(`... 已省略${problemArr.length - maxShowLinkNum}条 ...`);
    } else {
    }

    return acc;
  }, []);

  const chatContent = [
    `>【${requestInfo?.groupName || requestInfo?.centerName || ''}开源治理问题】[${formattedDate}](${getTechMapWebsiteUrl(date, searchInfo)})`,
    ...list,
  ];

  return chatContent.join('\n');
}


function getTechMapWebsiteUrl(date, searchInfo = {}) {
  const prefix = 'https://techmap.woa.com/report?report=segment-project&record=';

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
  return `${prefix}${encodeURIComponent(JSON.stringify(data))}`;
}
