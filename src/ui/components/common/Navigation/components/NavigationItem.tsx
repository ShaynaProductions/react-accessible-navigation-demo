"use client";

import { useEffect, useRef, type JSX, type KeyboardEvent } from "react";
import {
  FocusableElementType,
  Link,
  ListItem,
  type LinkProps,
  type ListItemProps,
} from "@/ui/components";
import { usePathname } from "@/ui/hooks";
import { Keys, returnTrueElementOrUndefined } from "@/ui/utllities";
import { useNavigationList } from "@/ui/components/common/Navigation/hooks";
import { handleCommonKeyDown } from "@/ui/components/common/Navigation/utilities";
import { NavigationItemProps } from "./NavigationTypes";

export default function NavigationItem({
  cx,
  href,
  id,
  label,
  ...rest
}: NavigationItemProps): JSX.Element {
  const {
    registerItemInCurrentList,
    setFirstFocus,
    setLastFocus,
    setNextFocus,
    setPreviousFocus,
  } = useNavigationList();
  const currentPath = usePathname();
  const pageURL = href.substring(0, 2) === "/#" ? currentPath + href : href;

  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    registerItemInCurrentList(linkRef.current as FocusableElementType);
  }, [linkRef, registerItemInCurrentList]);

  const handleKeyDown = (e: KeyboardEvent) => {
    const linkEl = linkRef.current as FocusableElementType;

    switch (e.key) {
      case Keys.HOME:
      case Keys.END:
      case Keys.LEFT:
      case Keys.RIGHT:
        e.preventDefault();
        e.stopPropagation();
        break;
    }
    // common between link and button
    handleCommonKeyDown(
      e,
      linkEl,
      setFirstFocus,
      setLastFocus,
      setNextFocus,
      setPreviousFocus,
    );
  };

  const listItemProps: Omit<ListItemProps, "children"> = {
    cx: cx,
    id: id,
  };
  const linkProps: Omit<
    LinkProps,
    "children" | "onMouseEnter" | "onMouseLeave"
  > = {
    "aria-current": returnTrueElementOrUndefined(currentPath === href, "page"),
    "aria-label": `${label} (navigation)`,
    href: pageURL,
    onKeyDown: handleKeyDown,
    ref: linkRef,
    ...rest,
  };

  return (
    <ListItem key={id} {...listItemProps}>
      <Link {...linkProps}>{label}</Link>
    </ListItem>
  );
}
