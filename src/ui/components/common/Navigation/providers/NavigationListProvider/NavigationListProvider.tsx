"use client";

import { createContext, useCallback, useState } from "react";
import type { EmptyObject } from "@/ui/types";
import type { FocusableElementType } from "../../utilities";
import type { NavigationListContextReturnValueProps } from "./NavigationListProviderTypes";

export const NavigationListContext = createContext<
  Partial<NavigationListContextReturnValueProps> | EmptyObject
>({});

export function NavigationListProvider({ children, value }) {
  const { parentEl } = value;
  const [currentListItems] = useState<FocusableElementType[]>([]);

  const getCurrentListItems: NavigationListContextReturnValueProps["getCurrentListItems"] =
    useCallback(() => {
      return currentListItems;
    }, [currentListItems]);

  const getParentEl = useCallback(() => {
    return parentEl;
  }, [parentEl]);

  const registerItemInCurrentList: NavigationListContextReturnValueProps["registerItemInCurrentList"] =
    useCallback(
      (focusableEl: FocusableElementType) => {
        /* istanbul ignore else */
        if (!currentListItems.includes(focusableEl)) {
          currentListItems.push(focusableEl);
        }
      },
      [currentListItems],
    );

  return (
    <NavigationListContext.Provider
      value={{
        getCurrentListItems,
        getParentEl,
        registerItemInCurrentList,
      }}
    >
      {children}
    </NavigationListContext.Provider>
  );
}
NavigationListProvider.context = NavigationListContext;
