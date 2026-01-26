import { FocusableElementType } from "@/ui/components";
import type { NavigationHookFunctionsProps } from "./useNavigationTypes";

export const _getNextElementInList: NavigationHookFunctionsProps["_getNextElementInList"] =
  (focusedEl, currentList) => {
    const currentIndex = currentList.indexOf(focusedEl);
    const newIndex = currentIndex + 1;
    return currentList[newIndex];
  };

export const _getPreviousElementInList: NavigationHookFunctionsProps["_getPreviousElementInList"] =
  (focusedEl, currentList) => {
    const currentIndex = currentList.indexOf(focusedEl);
    const newIndex = currentIndex - 1;
    return currentList[newIndex];
  };

export const _getRecursiveTopElementByElement: NavigationHookFunctionsProps["_getRecursiveTopElementByElement"] =
  (focusableEl, getNavObjectContainingElement, isElementInTopRow) => {
    const { storedParentEl } = getNavObjectContainingElement(focusableEl);

    if (isElementInTopRow(storedParentEl as FocusableElementType)) {
      return storedParentEl as FocusableElementType;
    } else {
      return _getRecursiveTopElementByElement(
        storedParentEl as FocusableElementType,
        getNavObjectContainingElement,
        isElementInTopRow,
      ) as FocusableElementType;
    }
  };

export const _returnStoredListArray: NavigationHookFunctionsProps["_returnStoredListArray"] =
  (storedList) => {
    /* istanbul ignore next */
    return storedList || [];
  };
