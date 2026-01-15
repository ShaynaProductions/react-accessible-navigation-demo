import React from "react";
import { LinkProps } from "next/link";
import { ListProps } from "@/ui/components";
import { BaseProps, Orientation } from "@/ui/types";

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
}

export interface SubNavigationProps extends Omit<NavigationItemProps, "href"> {
  children: React.ReactNode;
}
