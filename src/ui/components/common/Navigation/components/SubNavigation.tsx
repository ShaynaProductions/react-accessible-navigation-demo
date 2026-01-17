"use client";

import { JSX, useEffect, useRef, useState, type KeyboardEvent } from "react";

import {
  Button,
  Icon,
  ListItem,
  type ButtonProps,
  type IconProps,
  type ListItemProps,
} from "@/ui/components";
import { usePrevious } from "@/ui/hooks";
import { ChevronRightIcon } from "@/ui/svg";
import { Keys } from "@/ui/utllities";

import { useNavigationList } from "@/ui/components/common/Navigation/hooks";
import { handleCommonKeyDown } from "@/ui/components/common/Navigation/utilities";
import NavigationList from "./NavigationList";

import type {
  FocusableElementType,
  NavigationListProps,
  SubNavigationProps,
} from "./NavigationTypes";

export default function SubNavigation({
  children,
  cx,
  id,
  label,
  testId,
}: SubNavigationProps): JSX.Element {
  const {
    registerItemInCurrentList,
    setFirstFocus,
    setLastFocus,
    setNextFocus,
    setPreviousFocus,
  } = useNavigationList();

  const [isSubListOpen, setIsSubListOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = usePrevious(buttonRef);

  /* Register element into list provider  */
  useEffect(() => {
    const buttonEl = buttonRef.current as FocusableElementType;
    registerItemInCurrentList(buttonEl);
  }, [isSubListOpen, registerItemInCurrentList, prevButtonRef]);

  const handleKeyDown = (e: KeyboardEvent) => {
    const buttonEl = buttonRef.current as FocusableElementType;
    switch (e.key) {
      case Keys.HOME:
      case Keys.END:
      case Keys.LEFT:
      case Keys.RIGHT:
        e.preventDefault();
        break;
    }
    // common between link and button
    handleCommonKeyDown(
      e,
      buttonEl,
      setFirstFocus,
      setLastFocus,
      setNextFocus,
      setPreviousFocus,
    );
  };

  const handlePress = () => {
    setIsSubListOpen(!isSubListOpen);
  };

  const buttonProps: ButtonProps = {
    "aria-controls": id,
    "aria-expanded": isSubListOpen,
    "aria-label": `${label} (subnavigation)`,
    onKeyDown: handleKeyDown,
    onPress: handlePress,
    ref: buttonRef,
  };

  const iconProps: IconProps = {
    IconComponent: ChevronRightIcon,
    isSilent: true,
  };

  const listItemProps: Omit<ListItemProps, "children"> = {
    cx: cx,
  };

  const navigationListProps: NavigationListProps = {
    id: id,
    isOpen: isSubListOpen,
    testId: testId && `${testId}-list`,
  };
  return (
    <ListItem key={id} {...listItemProps}>
      <Button {...buttonProps}>
        {label}
        <Icon {...iconProps} />
      </Button>
      <NavigationList key={`list-${id}`} {...navigationListProps}>
        {children}
      </NavigationList>
    </ListItem>
  );
}
