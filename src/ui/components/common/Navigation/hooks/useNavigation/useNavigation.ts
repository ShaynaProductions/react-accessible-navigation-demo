"use client";
import { use, useCallback } from "react";

import { returnTrueElementOrUndefined } from "@/ui/utilities";
import { NavigationContext } from "../../providers";
import { ControllingElementType, FocusableElementType } from "../../utilities";
import {
  UseNavigationInternalTypes,
  UseNavigationReturnTypes,
} from "./useNavigationTypes";
import {
  _getNextElementInList,
  _getPreviousElementInList,
  _getRecursiveTopElementByElement,
  _returnStoredListArray,
} from "./hookFunctions";

export function useNavigation() {
  const navigationContextObj = use(NavigationContext);

  const {
    getNavigationArray,
    registerButtonAsParent,
    registerItemInNavigationArray,
    setIsListOpen,
    setListItems,
  } = returnTrueElementOrUndefined(
    !!navigationContextObj,
    navigationContextObj,
  );

  const _getIndexInTopRow: UseNavigationInternalTypes["_getIndexInTopRow"] =
    useCallback(
      (focusedEl) => {
        const { storedList } = getNavigationArray()[0];
        return storedList.indexOf(focusedEl);
      },
      [getNavigationArray],
    );

  const _getFirstElementInIndexedRow: UseNavigationInternalTypes["_getFirstElementInIndexedRow"] =
    useCallback(
      (index) => {
        return getNavigationArray()[index].storedList[0];
      },
      [getNavigationArray],
    );

  const _getNavigationObjectByParent: UseNavigationInternalTypes["_getNavigationObjectByParent"] =
    useCallback(
      (parentEl) => {
        let returnObj = {};
        const navArray = getNavigationArray();
        for (const navObject of navArray) {
          /* istanbul ignore else */
          if (parentEl === navObject.storedParentEl) {
            returnObj = navObject;
            break;
          }
        }
        return returnObj;
      },
      [getNavigationArray],
    );

  const _getNavigationObjectByListElement: UseNavigationInternalTypes["_getNavigationObjectByListElement"] =
    useCallback(
      (focusedEl) => {
        let returnObj = {};
        for (const navObject of getNavigationArray()) {
          const storedList = navObject.storedList;
          /* istanbul ignore else */
          if (storedList.length > 0 && storedList.indexOf(focusedEl) > -1) {
            returnObj = navObject;
            break;
          }
        }
        return returnObj;
      },
      [getNavigationArray],
    );

  const _getParentByElement: UseNavigationInternalTypes["_getParentByElement"] =
    useCallback(
      (focusedEl) => {
        const { storedParentEl } = _getNavigationObjectByListElement(focusedEl);
        return storedParentEl as ControllingElementType;
      },
      [_getNavigationObjectByListElement],
    );

  const _isElementInTopRow: UseNavigationInternalTypes["_isElementInTopRow"] =
    useCallback(
      (focusedEl) => {
        return _getIndexInTopRow(focusedEl) >= 0;
      },
      [_getIndexInTopRow],
    );

  const _getTopRowElement: UseNavigationInternalTypes["_getTopRowElement"] =
    useCallback(
      (focusedEl: FocusableElementType): FocusableElementType => {
        if (_isElementInTopRow(focusedEl)) {
          return focusedEl;
        } else {
          return _getRecursiveTopElementByElement(
            focusedEl,
            _getNavigationObjectByListElement,
            _isElementInTopRow,
          );
        }
      },
      [_getNavigationObjectByListElement, _isElementInTopRow],
    );
  const _isLastElementInCurrentList: UseNavigationInternalTypes["_isLastElementInCurrentList"] =
    useCallback(
      (focusedEl) => {
        const { storedList } = _getNavigationObjectByListElement(focusedEl);
        const currentList = _returnStoredListArray(storedList);
        return currentList.indexOf(focusedEl) === currentList.length - 1;
      },
      [_getNavigationObjectByListElement],
    );

  const _getPreviousByElement: UseNavigationInternalTypes["_getPreviousByElement"] =
    useCallback(
      (focusedEl) => {
        const { storedList, storedParentEl } =
          _getNavigationObjectByListElement(focusedEl);
        const currentItemsList = _returnStoredListArray(storedList);
        const isInTopRow = _isElementInTopRow(focusedEl);

        // default to previous item in List
        let focusableEl = _getPreviousElementInList(
          focusedEl,
          currentItemsList,
        );

        // Not in top row, and is first child in its list.
        if (!isInTopRow && currentItemsList.indexOf(focusedEl) === 0) {
          focusableEl = storedParentEl as FocusableElementType;
        }

        /* istanbul ignore next */
        if (!isInTopRow || focusedEl !== _getFirstElementInIndexedRow(0)) {
          return focusableEl;
        }
      },
      [
        _getFirstElementInIndexedRow,
        _getNavigationObjectByListElement,
        _isElementInTopRow,
      ],
    );

  /* ------------------------------------------------------------------ */

  const getNextByButton: UseNavigationReturnTypes["getNextByButton"] = (
    buttonEl,
    isSubListOpen,
  ) => {
    const { storedList: currentList } =
      _getNavigationObjectByListElement(buttonEl);
    const currentItemsList = _returnStoredListArray(currentList);

    // default to next item in List
    let focusableEl = _getNextElementInList(buttonEl, currentItemsList);

    const currentNavObject = _getNavigationObjectByParent(
      buttonEl as ControllingElementType,
    );
    const { storedList: subNavList } = currentNavObject;
    const subNavigation = _returnStoredListArray(subNavList);

    // list open, move into the first child.
    if (isSubListOpen && subNavigation.length > 0) {
      focusableEl = subNavigation[0];
    }

    // last focusable element and sub list is collapsed. Set to parent.
    if (
      !isSubListOpen &&
      currentItemsList.indexOf(buttonEl) === currentItemsList.length - 1
    ) {
      focusableEl = _getParentByElement(buttonEl) as FocusableElementType;
    }

    return focusableEl;
  };

  const getNextByLink: UseNavigationReturnTypes["getNextByLink"] = (linkEl) => {
    const { storedParentEl, storedList } =
      _getNavigationObjectByListElement(linkEl);
    const currentItemsList = _returnStoredListArray(storedList);

    // default to next item in List
    let focusableEl: FocusableElementType | undefined = _getNextElementInList(
      linkEl,
      currentItemsList,
    );

    // Link is the last element in the current list.
    if (currentItemsList.indexOf(linkEl) === currentItemsList.length - 1) {
      const topParent = _getTopRowElement(linkEl);
      const isParentLast = _isLastElementInCurrentList(
        storedParentEl as FocusableElementType,
      );
      const parentNavObject = _getNavigationObjectByListElement(
        storedParentEl as FocusableElementType,
      );
      const isLinkLast = _isLastElementInCurrentList(linkEl);
      const isParentInTopRow =
        storedParentEl && _isElementInTopRow(storedParentEl);
      if (isParentInTopRow) {
        focusableEl = storedParentEl;
      } else {
        if (isParentLast && isLinkLast) {
          focusableEl = topParent;
        } else {
          // focus goes to parents' next sibling
          const parentList = _returnStoredListArray(parentNavObject.storedList);
          focusableEl = _getNextElementInList(
            storedParentEl as FocusableElementType,
            parentList,
          );
        }
      }
    }
    return focusableEl;
  };

  const getPreviousByButton: UseNavigationReturnTypes["getPreviousByButton"] = (
    buttonEl,
  ) => {
    return _getPreviousByElement(buttonEl) as FocusableElementType;
  };

  const getPreviousByLink: UseNavigationReturnTypes["getPreviousByLink"] = (
    linkEl: FocusableElementType,
  ) => {
    const hasButtonType = () => {
      return !!focusableEl?.type && focusableEl.type === "button";
    };

    let focusableEl = _getPreviousByElement(linkEl);

    const { isSubListOpen, storedList } = _getNavigationObjectByParent(
      focusableEl as ControllingElementType,
    );
    const currentList = _returnStoredListArray(storedList);

    if (hasButtonType() && isSubListOpen && currentList.indexOf(linkEl) < 0) {
      focusableEl = currentList[currentList.length - 1];
    }

    return focusableEl;
  };

  return {
    getNextByButton,
    getNextByLink,
    getPreviousByButton,
    getPreviousByLink,
    registerButtonAsParent,
    registerItemInNavigationArray,
    setIsListOpen,
    setListItems,
  };
}
