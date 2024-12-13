export const getFromName = (delta = 0) => {
  const pages = getCurrentPages();
  const page = pages[pages.length - 1 - delta];

  return page?.route || '';
};

export const getToName = (routerParams?: Array<any>) => {
  if (!routerParams?.[0]) {
    return '';
  }
  const { url = '' } = routerParams?.[0] || {};
  const name = url.split('?')[0] || '';
  return name;
};


export function getUniRouteName({
  isNavigateBack,
  routerParams,
}: {
  isNavigateBack?: boolean;
  routerParams?: Array<any>;
}): {
    from: string;
    to: string;
  } {
  if (isNavigateBack) {
    const { delta = 1 } = routerParams?.[0] || {};

    return {
      from: getFromName(),
      to: getFromName(delta),
    };
  }

  return {
    from: getFromName(),
    to: getToName(routerParams),
  };
}
