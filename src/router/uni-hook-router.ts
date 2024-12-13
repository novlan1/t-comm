export function uniHookRouter({
  navigateToHooks,
  navigateBackHooks,
  redirectToHooks,
}: {
  navigateToHooks?: Array<Function>;
  navigateBackHooks?: Array<Function>;
  redirectToHooks?: Array<Function>;
}) {
  const originNavigateTo = uni.navigateTo;
  const originNavigateBack = uni.navigateBack;
  const originReplaceTo = uni.redirectTo;

  if (originNavigateTo) {
    uni.navigateTo = (...args: Array<any>) => {
      navigateToHooks?.forEach(cb => cb?.(...args));
      originNavigateTo(...args);
    };
  }

  if (originNavigateBack) {
    uni.navigateBack = (...args: Array<any>) => {
      navigateBackHooks?.forEach(cb => cb?.(...args));
      originNavigateBack(...args);
    };
  }

  if (originReplaceTo) {
    uni.redirectTo = (...args: Array<any>) => {
      redirectToHooks?.forEach(cb => cb?.(...args));
      originReplaceTo(...args);
    };
  }
}
