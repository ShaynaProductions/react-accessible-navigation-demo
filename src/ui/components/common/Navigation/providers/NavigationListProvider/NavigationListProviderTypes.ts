import { FocusableElementType } from "@/ui/components/common";

export interface NavigationListContextReturnValueProps {
  getCurrentListItems: () => FocusableElementType[];
  registerItemInCurrentList: (focusableEl: FocusableElementType) => void;
}
