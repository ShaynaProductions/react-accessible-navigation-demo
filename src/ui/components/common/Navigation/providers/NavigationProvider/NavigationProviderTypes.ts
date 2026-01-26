import type { FocusableElementType } from "@/ui/components";
import { ControllingElementType } from "@/ui/components/common/Navigation/utilities/types";

export interface NavigationContextStoredValueProps {
  data: {
    isSubListOpen: boolean;
    storedParentEl: ControllingElementType;
  };
}

export interface NavigationObjectProps {
  storedList: FocusableElementType[];
  storedParentEl: ControllingElementType;
  isSubListOpen: boolean;
}

export interface NavigationContextInternalProps {
  _getNavigationIndex: (
    parentEl: ControllingElementType,
    navigationArray?: NavigationObjectProps[],
  ) => number;
  _setNavigationArrayObject: (
    index: number,
    updatedContent: Partial<NavigationObjectProps>,
  ) => void;
  _setParentEl: (
    parentEl: ControllingElementType,
    isSubListOpen: boolean,
  ) => void;
}

export interface NavigationContextReturnValueProps {
  getNavigationArray: () => NavigationObjectProps[];
  registerButtonAsParent: (
    isListOpen: boolean,
    parentEl: ControllingElementType,
  ) => void;
  registerItemInNavigationArray: (
    navigationList: FocusableElementType[],
    parentEl: ControllingElementType,
  ) => void;
  setIsListOpen: (
    isListOpen: boolean,
    parentEl: ControllingElementType,
  ) => void;
  setListItems: (
    navigationList: FocusableElementType[],
    parentEl: ControllingElementType,
  ) => void;
}
