export function insertStyle({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  const idObjectStyle = document.getElementById(id);
  idObjectStyle?.parentNode?.removeChild(idObjectStyle);

  const styleNode = document.createElement('style');
  styleNode.id = id;
  styleNode.type = 'text/css';
  styleNode.innerHTML = content;

  document.getElementsByTagName('head')[0].appendChild(styleNode);
}


export function insertHtml({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  const idObject = document.getElementById(id);
  idObject?.parentNode?.removeChild(idObject);

  const shareNode = document.createElement('div');
  shareNode.id = id;
  shareNode.style.display = 'none';
  shareNode.innerHTML = content;
  document.getElementsByTagName('body')[0].appendChild(shareNode);
}
