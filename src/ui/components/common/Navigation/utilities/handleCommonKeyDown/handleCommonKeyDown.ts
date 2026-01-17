import React from "react";
import { Keys } from "@/ui/utllities";
import type { FocusableElementType } from "@/ui/components";
import type { UseNavigationListReturnProps } from "../../hooks/useNavigationList";

export const handleCommonKeyDown = (
  e: React.KeyboardEvent,
  currentlyFocusedEl: FocusableElementType,
  setFirstFocus: UseNavigationListReturnProps["setFirstFocus"],
  setLastFocus: UseNavigationListReturnProps["setLastFocus"],
  setNextFocus: UseNavigationListReturnProps["setNextFocus"],
  setPreviousFocus: UseNavigationListReturnProps["setPreviousFocus"],
) => {
  switch (e.key) {
    case Keys.HOME:
      setFirstFocus();
      break;
    case Keys.END:
      setLastFocus();
      break;
    case Keys.LEFT:
      setPreviousFocus(currentlyFocusedEl);
      break;
    case Keys.RIGHT:
      setNextFocus(currentlyFocusedEl);
      break;
  }
};
