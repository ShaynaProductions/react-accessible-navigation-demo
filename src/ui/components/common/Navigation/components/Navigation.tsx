"use client";

import { JSX } from "react";
import {
  type NavigationContextStoredValueProps,
  NavigationProvider,
} from "../providers";
import type { NavigationListProps, NavigationProps } from "./NavigationTypes";

import { NavigationList } from "./";

export default function Navigation({
  children,
  cx,
  isOpen = true,
  label,
  orientation = "horizontal",
  ...rest
}: NavigationProps): JSX.Element {
  const navigationListProps: NavigationListProps = {
    ...rest,
    isOpen: isOpen,
    orientation: orientation,
    parentEl: null,
  };

  const navigationContextProps: NavigationContextStoredValueProps = {
    data: {
      storedParentEl: null,
      isSubListOpen: true,
    },
  };

  const navigationProps = {
    "aria-label": label,
    className: cx,
  };

  return (
    <NavigationProvider value={navigationContextProps}>
      <nav {...navigationProps}>
        <NavigationList {...navigationListProps}>{children}</NavigationList>
      </nav>
    </NavigationProvider>
  );
}
