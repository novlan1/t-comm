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
