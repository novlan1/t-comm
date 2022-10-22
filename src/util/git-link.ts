export function rmFirstAndLastSlash(str = '') {
  return str.replace(/^\/|\/$/g, '');
}

export function getGitCodeLink({
  domain = 'https://git.woa.com/',
  repo,
  branch,
  localFile,
  line,
}) {
  const pwd = process.cwd();

  const file = localFile.replace(new RegExp(`^${pwd}`), '');
  const pDomain = rmFirstAndLastSlash(domain);
  const pRepo = rmFirstAndLastSlash(repo);
  const pBranch = rmFirstAndLastSlash(branch);
  const pFile = rmFirstAndLastSlash(file);

  const link = [pDomain, pRepo, 'blob', pBranch, pFile].join('/');

  if (line) {
    return `${link}#L${line}`;
  }
  return link;
}


export function getGitMRLink({
  domain,
  repo,
  id = '',
}) {
  const pDomain = rmFirstAndLastSlash(domain);
  const pRepo = rmFirstAndLastSlash(repo);
  const list = [pDomain, pRepo];
  if (id) {
    list.push(...['merge_requests', id]);
  }
  return list.join('/');
}
