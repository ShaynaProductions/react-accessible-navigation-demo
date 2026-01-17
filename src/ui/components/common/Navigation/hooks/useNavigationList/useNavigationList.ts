"use client";
import { use, useCallback } from "react";
import type { FocusableElementType } from "@/ui/components/common";
import { returnTrueElementOrUndefined } from "@/ui/utllities";
import { NavigationListContext } from "@/ui/components/common/Navigation/providers";
import type {
  UseNavigationListInternalProps,
  UseNavigationListReturnProps,
} from "./useNavigationListTypes";

export function useNavigationList(): UseNavigationListReturnProps {
  const navigationListContextObj = use(NavigationListContext);
  const { getCurrentListItems, registerItemInCurrentList } =
    returnTrueElementOrUndefined(
      !!navigationListContextObj,
      navigationListContextObj,
    );

  const currentListItems: FocusableElementType[] = getCurrentListItems();

  const _getCurrentIndex: UseNavigationListInternalProps["_getCurrentIndex"] =
    useCallback(
      (currentlyFocusedEl: FocusableElementType): number => {
        return currentListItems.indexOf(currentlyFocusedEl);
      },
      [currentListItems],
    );

  const _shiftFocus: UseNavigationListInternalProps["_shiftFocus"] = (
    focusableEl,
  ) => {
    focusableEl.focus({ preventScroll: true });
  };

  const setFirstFocus: UseNavigationListReturnProps["setFirstFocus"] = () => {
    _shiftFocus(currentListItems[0]);
  };

  const setLastFocus: UseNavigationListReturnProps["setLastFocus"] = () => {
    _shiftFocus(currentListItems[currentListItems.length - 1]);
  };

  const setNextFocus: UseNavigationListReturnProps["setNextFocus"] = (
    currentlyFocusedEl,
  ) => {
    const newIndex = _getCurrentIndex(currentlyFocusedEl) + 1;
    if (newIndex >= currentListItems.length) {
      setFirstFocus();
    } else {
      _shiftFocus(currentListItems[newIndex]);
    }
  };

  const setPreviousFocus: UseNavigationListReturnProps["setPreviousFocus"] = (
    currentlyFocusedEl,
  ) => {
    const newIndex = _getCurrentIndex(currentlyFocusedEl) - 1;
    if (newIndex < 0) {
      setLastFocus();
    } else {
      _shiftFocus(currentListItems[newIndex]);
    }
  };

  return {
    currentListItems,
    registerItemInCurrentList,
    setFirstFocus,
    setLastFocus,
    setNextFocus,
    setPreviousFocus,
  };
}
