import {
  ControllingElementType,
  FocusableElementType,
} from "../../utilities/types";

export interface NavigationListContextStoredValueProps {
  parentEl: ControllingElementType;
}

export interface NavigationListContextReturnValueProps {
  getCurrentListItems: () => FocusableElementType[];
  getParentEl: () => ControllingElementType;
  registerItemInCurrentList: (focusableEl: FocusableElementType) => void;
}
