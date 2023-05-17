export function getCosUrlLink({
  bucket,
  region,
  dir,
  fileName,
}) {
  const dirDesc = dir ? `${dir}/` : '';

  return `https://${bucket}.cos.${region}.myqcloud.com/${dirDesc}${fileName}`;
}
