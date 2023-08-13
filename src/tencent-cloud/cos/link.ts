export function getCosUrlLink({
  bucket,
  region,
  dir,
  fileName,
}: {
  bucket: string;
  region: string;
  dir: string;
  fileName: string;
}) {
  const dirDesc = dir ? `${dir}/` : '';

  return `https://${bucket}.cos.${region}.myqcloud.com/${dirDesc}${fileName}`;
}
