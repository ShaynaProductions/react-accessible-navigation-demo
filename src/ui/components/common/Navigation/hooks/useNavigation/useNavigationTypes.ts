import {
  NavigationContextReturnValueProps,
  NavigationObjectProps,
} from "../../providers";
import { ControllingElementType, FocusableElementType } from "../../utilities";

export interface UseNavigationInternalTypes {
  _getFirstElementInIndexedRow: (index: number) => FocusableElementType;
  _getIndexInTopRow: (focusedEl: FocusableElementType | undefined) => number;
  _getNavigationObjectByListElement: (
    focusedEl: FocusableElementType,
  ) => Partial<NavigationObjectProps>;
  _getNavigationObjectByParent: (
    parentEl: ControllingElementType,
  ) => Partial<NavigationObjectProps>;
  _getParentByElement: (
    focusedEl: FocusableElementType,
  ) => ControllingElementType;
  _getPreviousByElement: (
    focusedEl: FocusableElementType,
  ) => FocusableElementType | undefined;
  _getTopRowElement: (focusedEl: FocusableElementType) => FocusableElementType;
  _isElementInTopRow: (focusedEl: FocusableElementType) => boolean;
  _isLastElementInCurrentList: (focusedEl: FocusableElementType) => boolean;
}

export interface NavigationHookFunctionsProps {
  _getNextElementInList: (
    focusedEl: FocusableElementType,
    currentList: FocusableElementType[],
  ) => FocusableElementType;
  _getPreviousElementInList: (
    focusedEl: FocusableElementType,
    currentList: FocusableElementType[],
  ) => FocusableElementType;
  _getRecursiveTopElementByElement: (
    focusableEl: FocusableElementType,
    getNavObjectContainingElement: UseNavigationInternalTypes["_getNavigationObjectByListElement"],
    isElementInTopRow: UseNavigationInternalTypes["_isElementInTopRow"],
  ) => FocusableElementType;
  _returnStoredListArray: (
    storedList: NavigationObjectProps["storedList"] | undefined,
  ) => NavigationObjectProps["storedList"];
}

export interface UseNavigationReturnTypes {
  getNavigationArray: NavigationContextReturnValueProps["getNavigationArray"];
  getNextByButton: (
    buttonEl: FocusableElementType,
    isSubListOpen: boolean,
  ) => FocusableElementType | undefined;
  getNextByLink: (linkEl: FocusableElementType) => FocusableElementType;
  getPreviousByButton: (
    buttonEl: FocusableElementType,
  ) => FocusableElementType | undefined;
  getPreviousByLink: (
    linkEl: FocusableElementType,
  ) => FocusableElementType | undefined;
  registerButtonAsParent: NavigationContextReturnValueProps["registerButtonAsParent"];
  registerItemInNavigationArray: NavigationContextReturnValueProps["registerItemInNavigationArray"];
  setIsListOpen: NavigationContextReturnValueProps["setIsListOpen"];
}
