"use client";
import { JSX } from "react";
import classNames from "classnames";

import { List, ListProps } from "@/ui/components";
import { NavigationListProps } from "./NavigationTypes";

export default function NavigationList({
  children,
  cx,
  id,
  isOpen,
  ...rest
}: NavigationListProps): JSX.Element {
  const listProps: ListProps = {
    ...rest,
    id,
    cx: classNames({ srOnly: !isOpen }, cx),
  };

  return (
    <List key={`list-$id`} {...listProps}>
      {children}
    </List>
  );
}
