"use client";
import { use } from "react";

import { returnTrueElementOrUndefined } from "@/ui/utilities";
import { NavigationContext } from "../../providers";

export function useNavigation() {
  const navigationContextObj = use(NavigationContext);

  const {
    registerButtonAsParent,
    registerItemInNavigationArray,
    setIsListOpen,
    setListItems,
  } = returnTrueElementOrUndefined(
    !!navigationContextObj,
    navigationContextObj,
  );

  return {
    registerButtonAsParent,
    registerItemInNavigationArray,
    setIsListOpen,
    setListItems,
  };
}
