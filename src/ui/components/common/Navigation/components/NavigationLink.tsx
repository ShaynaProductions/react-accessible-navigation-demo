"use client";

import { JSX } from "react";
import { Link, LinkProps, ListItem, ListItemProps } from "@/ui/components";
import { usePathname } from "@/ui/hooks";
import { returnTrueElementOrUndefined } from "@/ui/utllities";
import { NavigationLinkProps } from "./NavigationTypes";

export default function NavigationLink({
  cx,
  href,
  id,
  label,
  ...rest
}: NavigationLinkProps): JSX.Element {
  const currentPath = usePathname();

  const pageURL = href.substring(0, 2) === "/#" ? currentPath + href : href;

  const listItemProps: Omit<ListItemProps, "children"> = {
    cx: cx,
    id: id,
  };
  const linkProps: Omit<
    LinkProps,
    "children" | "onMouseEnter" | "onMouseLeave"
  > = {
    "aria-current": returnTrueElementOrUndefined(currentPath === href, "page"),
    href: pageURL,
    ...rest,
  };

  return (
    <ListItem key={id} {...listItemProps}>
      <Link {...linkProps}>{label}</Link>
    </ListItem>
  );
}
