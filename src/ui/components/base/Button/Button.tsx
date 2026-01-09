"use client";
import { JSX } from "react";
import { Button as RACButton } from "react-aria-components";

import { returnTrueElementOrUndefined } from "@/ui/utllities";
import { ButtonProps } from "./ButtonTypes";

export default function Button({
  children,
  cx,
  isDisabled,
  onPress,
  testId,
  ...rest
}: ButtonProps): JSX.Element {
  const buttonProps = {
    ...rest,
    "aria-disabled": returnTrueElementOrUndefined(!!isDisabled),
    className: cx,
    "data-testid": testId,
    onPress: isDisabled ? undefined : onPress,
  };

  return <RACButton {...buttonProps}>{children}</RACButton>;
}
