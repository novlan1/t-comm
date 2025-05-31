
export function checkFileBaseMinimatch({
  file,
  include,
  exclude,
  minimatch,
}: {
  file: string;
  include: string | string[];
  exclude: string | string[];
  minimatch: Function;
}) {
  const curInclude = Array.isArray(include) ? include : [include];
  const curExclude = Array.isArray(exclude) ? exclude : [exclude];

  return curInclude.some(pattern => minimatch(file, pattern))
    && !curExclude.some(pattern => minimatch(file, pattern));
}
