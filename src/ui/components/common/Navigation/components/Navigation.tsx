"use client";

import { JSX } from "react";
import { NavigationListProps, NavigationProps } from "./NavigationTypes";
import { NavigationList } from "./";

export default function Navigation({
  children,
  isOpen = true,
  label,
  orientation = "horizontal",
  ...rest
}: NavigationProps): JSX.Element {
  const navigationListProps: NavigationListProps = {
    ...rest,
    isOpen: isOpen,
    orientation: orientation,
  };

  return (
    <>
      <nav aria-label={label}>
        <NavigationList {...navigationListProps}>{children}</NavigationList>
      </nav>
    </>
  );
}
