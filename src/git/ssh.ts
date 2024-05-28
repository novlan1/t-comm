
export function transformGitToSSH(link = '') {
  if (!link.startsWith('http')) {
    return link;
  }

  const reg = /https:\/\/([^/]+)\/(.*)$/;
  const match = link.match(reg);

  if (!match) {
    return '';
  }

  const result =  `git@${match[1]}:${match[2]}`;

  if (result.endsWith('.git')) {
    return result;
  }

  return `${result}.git`;
}
