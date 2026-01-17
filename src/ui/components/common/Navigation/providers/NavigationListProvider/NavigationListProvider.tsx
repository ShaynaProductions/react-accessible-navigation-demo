"use client";

import { createContext, useCallback, useState } from "react";
import { FocusableElementType } from "@/ui/components";
import { EmptyObject } from "@/ui/types";
import { NavigationListContextReturnValueProps } from "./NavigationListProviderTypes";

export const NavigationListContext = createContext<
  Partial<NavigationListContextReturnValueProps> | EmptyObject
>({});

export function NavigationListProvider({ children }) {
  const [currentListItems, setCurrentListItems] = useState<
    FocusableElementType[]
  >([]);

  const getCurrentListItems: NavigationListContextReturnValueProps["getCurrentListItems"] =
    useCallback(() => {
      return currentListItems;
    }, [currentListItems]);

  const registerItemInCurrentList: NavigationListContextReturnValueProps["registerItemInCurrentList"] =
    useCallback(
      (focusableEl: FocusableElementType) => {
        const mutableArray = currentListItems;
        /* istanbul ignore else */
        if (mutableArray?.indexOf(focusableEl) === -1) {
          mutableArray.push(focusableEl);
          setCurrentListItems(mutableArray);
        }
      },
      [currentListItems, setCurrentListItems],
    );

  return (
    <NavigationListContext.Provider
      value={{
        getCurrentListItems,
        registerItemInCurrentList,
      }}
    >
      {children}
    </NavigationListContext.Provider>
  );
}
NavigationListProvider.context = NavigationListContext;
