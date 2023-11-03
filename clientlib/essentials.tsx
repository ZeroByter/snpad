export const isElementInsideTarget = (
  target: HTMLElement,
  search: HTMLElement
): boolean => {
  if (target === search) {
    return true;
  }

  if (target.parentElement) {
    return isElementInsideTarget(target.parentElement, search);
  }

  return false;
};
