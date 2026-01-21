import {
  NavigationContextReturnValueProps,
  NavigationObjectProps,
} from "../../providers";
import { ControllingElementType, FocusableElementType } from "../../utilities";

export interface UseNavigationInternalTypes {
  _getNavigationObjectByParent: (
    parentEl: ControllingElementType,
  ) => Partial<NavigationObjectProps>;
}

export interface UseNavigationReturnTypes {
  getNavigationArray: NavigationContextReturnValueProps["getNavigationArray"];
  registerButtonAsParent: NavigationContextReturnValueProps["registerButtonAsParent"];
  registerItemInNavigationArray: NavigationContextReturnValueProps["registerItemInNavigationArray"];
  registerButtonInNavigationArray: (
    buttonEl: FocusableElementType,
    parentEl: ControllingElementType,
  ) => void;
  setIsListOpen: NavigationContextReturnValueProps["setIsListOpen"];
  setListItemsOpen: NavigationContextReturnValueProps["setListItems"];
}
