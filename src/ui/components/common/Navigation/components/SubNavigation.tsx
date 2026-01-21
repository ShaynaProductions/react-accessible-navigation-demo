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
import { ChevronRightIcon } from "@/ui/svg";
import { Keys } from "@/ui/utilities";

import { useNavigation, useNavigationList } from "../hooks";
import {
  type ControllingElementType,
  type FocusableElementType,
  handleCommonKeyDown,
} from "../utilities";
import NavigationList from "./NavigationList";
import type {
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
    currentListItems,
    parentEl,
    registerItemInCurrentList,
    setFirstFocus,
    setLastFocus,
    setNextFocus,
    setPreviousFocus,
  } = useNavigationList();
  const {
    registerButtonAsParent,
    registerItemInNavigationArray,
    setIsListOpen,
  } = useNavigation();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [buttonEl, setButtonEl] = useState<
    FocusableElementType | ControllingElementType
  >(null);
  const [isSubListOpen, setIsSubListOpen] = useState<boolean>(false);

  useEffect(() => {
    const currentButtonEl = buttonRef.current as FocusableElementType;
    registerItemInCurrentList(currentButtonEl);
    registerButtonAsParent(isSubListOpen, currentButtonEl);
    setButtonEl(currentButtonEl);
  }, [
    buttonRef,
    isSubListOpen,
    registerButtonAsParent,
    registerItemInCurrentList,
  ]);

  useEffect(() => {
    registerItemInNavigationArray(currentListItems, parentEl);
  }, [currentListItems, parentEl, registerItemInNavigationArray]);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case Keys.HOME:
      case Keys.END:
      case Keys.LEFT:
      case Keys.RIGHT:
        e.preventDefault();
        break;
    }
    // common between focusable elements
    handleCommonKeyDown(
      e,
      buttonEl as FocusableElementType,
      setFirstFocus,
      setLastFocus,
      setNextFocus,
      setPreviousFocus,
    );
  };

  const handlePress = () => {
    setIsSubListOpen(!isSubListOpen);
    setIsListOpen(!isSubListOpen, buttonEl);
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
    parentEl: buttonEl as ControllingElementType,
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
