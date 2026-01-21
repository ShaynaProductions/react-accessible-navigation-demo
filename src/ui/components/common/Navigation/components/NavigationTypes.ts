import React from "react";
import type { LinkProps } from "next/link";
import type { ListProps } from "@/ui/components";
import type { BaseProps, Orientation } from "@/ui/types";
import type { ControllingElementType } from "../utilities/types";

export interface NavigationProps extends BaseProps {
  /**
   * The children of the component.
   */
  children: React.ReactNode;

  /**
   * Label of the entire navigation landmark
   */
  label: string;

  /**
   * Does the top list default to open?
   * true (default) | false
   */
  isOpen?: boolean;

  /**
   *  Top List orientation "horizontal" (default) | "vertical"
   */
  orientation?: Orientation;
}

export interface NavigationItemProps
  extends BaseProps, Omit<LinkProps, "children"> {
  /**
   *   url or anchor
   */
  href: string;

  /**
   *   clickable label (children) of link
   */
  label: string;

  /**
   *   Subnavigation list under item.
   */
  menu?: NavigationItemProps[];
}

export interface NavigationListProps extends ListProps {
  /**
   * is List visible and operable
   */
  isOpen: boolean;
  /**
   * parentEl: Button Element or null
   */
  parentEl: ControllingElementType;
}

export interface SubNavigationProps extends Omit<NavigationItemProps, "href"> {
  children: React.ReactNode;
}

export interface NavigationWrapperProps extends Omit<BaseProps, "testid"> {
  children: React.ReactNode;
  label: string;
  parentRef?: React.RefObject<ControllingElementType>;
}
