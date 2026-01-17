import { FocusableElementType } from "@/ui/components";

export interface UseNavigationListInternalProps {
  _getCurrentIndex: (focusedElement: FocusableElementType) => number;
  _shiftFocus: (focusableEl: FocusableElementType) => void;
}

export interface UseNavigationListReturnProps {
  currentListItems: FocusableElementType[];
  registerItemInCurrentList: (focusableEl: FocusableElementType) => void;
  setFirstFocus: () => void;
  setLastFocus: () => void;
  setNextFocus: (currentlyFocusedEl: FocusableElementType) => void;
  setPreviousFocus: (currentlyFocusedEl: FocusableElementType) => void;
}
