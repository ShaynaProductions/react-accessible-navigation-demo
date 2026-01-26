"use client";

import {
  useEffect,
  useRef,
  type JSX,
  type KeyboardEvent,
  useState,
} from "react";
import {
  Link,
  ListItem,
  type FocusableElementType,
  type LinkProps,
  type ListItemProps,
} from "@/ui/components";
import { usePathname } from "@/ui/hooks";
import { Keys, returnTrueElementOrUndefined } from "@/ui/utilities";
import { useNavigation, useNavigationList } from "../hooks";
import { handleCommonKeyDown } from "../utilities";
import type { NavigationItemProps } from "./NavigationTypes";

export default function NavigationItem({
  cx,
  href,
  id,
  label,
  ...rest
}: NavigationItemProps): JSX.Element {
  const {
    currentListItems,
    parentEl,
    registerItemInCurrentList,
    setFirstFocus,
    setLastFocus,
    setNextFocus,
    setPreviousFocus,
    shiftFocus,
  } = useNavigationList();

  const { getNextByLink, getPreviousByLink, registerItemInNavigationArray } =
    useNavigation();

  const currentPath = usePathname();
  const pageURL = href.substring(0, 2) === "/#" ? currentPath + href : href;
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [linkEl, setLinkEl] = useState<FocusableElementType | null>(null);

  useEffect(() => {
    const currentLinkEl = linkRef.current as FocusableElementType;
    registerItemInCurrentList(currentLinkEl);
    setLinkEl(currentLinkEl as FocusableElementType);
  }, [currentListItems, linkRef, registerItemInCurrentList, setLinkEl]);

  useEffect(() => {
    registerItemInNavigationArray(currentListItems, parentEl);
  }, [currentListItems, parentEl, registerItemInNavigationArray]);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case Keys.HOME:
      case Keys.END:
      case Keys.LEFT:
      case Keys.RIGHT:
      case Keys.DOWN:
      case Keys.UP:
        e.preventDefault();
        e.stopPropagation();
        break;
    }
    // common between link and button
    handleCommonKeyDown(
      e,
      linkEl as FocusableElementType,
      setFirstFocus,
      setLastFocus,
      setNextFocus,
      setPreviousFocus,
    );

    let focusableEl: FocusableElementType | undefined;
    switch (e.key) {
      case Keys.UP:
        focusableEl = getPreviousByLink(linkEl as FocusableElementType);
        break;
      case Keys.DOWN:
        focusableEl = getNextByLink(linkEl as FocusableElementType);
        break;
    }

    if (focusableEl) {
      shiftFocus(focusableEl);
    }
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
