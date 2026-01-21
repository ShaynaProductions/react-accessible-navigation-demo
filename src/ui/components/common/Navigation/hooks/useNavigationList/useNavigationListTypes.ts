import { FocusableElementType } from "@/ui/components";
import { ControllingElementType } from "@/ui/components/common/Navigation/utilities/types";

export interface UseNavigationListInternalProps {
  _getCurrentIndex: (focusedElement: FocusableElementType) => number;
  _shiftFocus: (focusableEl: FocusableElementType) => void;
}

export interface UseNavigationListReturnProps {
  currentListItems: FocusableElementType[];
  parentEl: ControllingElementType;
  registerItemInCurrentList: (focusableEl: FocusableElementType) => void;
  setFirstFocus: () => void;
  setLastFocus: () => void;
  setNextFocus: (currentlyFocusedEl: FocusableElementType) => void;
  setPreviousFocus: (currentlyFocusedEl: FocusableElementType) => void;
}
