"use client";

import { createContext, type JSX, useCallback, useState } from "react";
import type { EmptyObject } from "@/ui/types";
import { arraysEqual } from "@/ui/utilities";

import {
  NavigationContextInternalProps,
  NavigationContextReturnValueProps,
  NavigationObjectProps,
} from "./NavigationProviderTypes";

export const NavigationContext = createContext<
  NavigationContextReturnValueProps | EmptyObject
>({});

export function NavigationProvider({ children, value }): JSX.Element {
  const { data } = value;
  const navObject: NavigationObjectProps = {
    storedParentEl: data.storedParentEl,
    isSubListOpen: data.isSubListOpen,
    storedList: [],
  };
  const [navigationArray, setNavigationArray] = useState([navObject]);

  const getNavigationArray: NavigationContextReturnValueProps["getNavigationArray"] =
    useCallback(() => {
      return navigationArray;
    }, [navigationArray]);

  const _getNavigationIndex: NavigationContextInternalProps["_getNavigationIndex"] =
    useCallback(
      (parentEl) => {
        let foundIndex = -1;
        const currentNavigationArray = getNavigationArray();
        for (let i = 0; i < currentNavigationArray.length; i++) {
          if (currentNavigationArray[i].storedParentEl === parentEl) {
            foundIndex = i;
          }
        }
        return foundIndex;
      },
      [getNavigationArray],
    );

  const _setNavigationArrayObject: NavigationContextInternalProps["_setNavigationArrayObject"] =
    useCallback(
      (index, updatedContent) => {
        const mutableArray = getNavigationArray().slice();
        const currentObj = mutableArray[index];
        mutableArray[index] = {
          ...currentObj,
          ...updatedContent,
        };
        setNavigationArray(mutableArray);
      },
      [getNavigationArray],
    );

  const _setParentEl: NavigationContextInternalProps["_setParentEl"] =
    useCallback(
      (parentEl, isListOpen) => {
        const parentIndex = _getNavigationIndex(parentEl);
        if (parentIndex === -1) {
          navigationArray.push({
            storedParentEl: parentEl,
            isSubListOpen: isListOpen,
            storedList: [],
          });
        }
      },
      [_getNavigationIndex, navigationArray],
    );

  const setIsListOpen: NavigationContextReturnValueProps["setIsListOpen"] =
    useCallback(
      (isListOpen, parentEl) => {
        const parentIndex: number = _getNavigationIndex(parentEl);
        const currentObj = getNavigationArray()[parentIndex];
        /* istanbul ignore else */
        if (parentIndex >= 0 && currentObj.isSubListOpen !== isListOpen) {
          _setNavigationArrayObject(parentIndex, {
            isSubListOpen: isListOpen,
          });
        }
      },

      [_getNavigationIndex, getNavigationArray, _setNavigationArrayObject],
    );

  const setListItems: NavigationContextReturnValueProps["setListItems"] =
    useCallback(
      (navigationList, parentEl) => {
        const parentIndex = _getNavigationIndex(parentEl);

        const currentObj = getNavigationArray()[parentIndex];

        if (
          !currentObj.storedList ||
          !arraysEqual(currentObj.storedList, navigationList)
        ) {
          _setNavigationArrayObject(parentIndex, {
            storedList: navigationList,
          });
        }
      },
      [_getNavigationIndex, getNavigationArray, _setNavigationArrayObject],
    );

  const registerButtonAsParent: NavigationContextReturnValueProps["registerButtonAsParent"] =
    (isListOpen, parentEl) => {
      _setParentEl(parentEl, isListOpen);
    };

  const registerItemInNavigationArray: NavigationContextReturnValueProps["registerItemInNavigationArray"] =
    (navigationList, parentEl) => {
      setListItems(navigationList, parentEl);
    };

  return (
    <NavigationContext.Provider
      value={{
        getNavigationArray,
        registerButtonAsParent,
        registerItemInNavigationArray,
        setIsListOpen,
        setListItems,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

NavigationProvider.context = NavigationContext;
