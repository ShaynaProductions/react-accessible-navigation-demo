"use client";
import { JSX } from "react";
import classNames from "classnames";

import { List, ListProps } from "@/ui/components";
import {
  type NavigationListContextStoredValueProps,
  NavigationListProvider,
} from "../providers";
import { NavigationListProps } from "./NavigationTypes";

export default function NavigationList({
  children,
  cx,
  id,
  isOpen,
  parentEl,
  ...rest
}: NavigationListProps): JSX.Element {
  const listContext: NavigationListContextStoredValueProps = {
    parentEl: parentEl,
  };

  const listProps: ListProps = {
    ...rest,
    id,
    cx: classNames({ srOnly: !isOpen }, cx),
  };

  return (
    <NavigationListProvider value={listContext}>
      <List key={`list-$id`} {...listProps}>
        {children}
      </List>
    </NavigationListProvider>
  );
}
