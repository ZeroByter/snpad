export const isElementUnderElement = (search: EventTarget, isUnder: HTMLElement) => {
  if (search.parentElement) {
    return isElementUnderElement(search.parentElement, isUnder)
  }

  return false
}