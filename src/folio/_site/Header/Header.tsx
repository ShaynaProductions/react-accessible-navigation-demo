"use client";
import { JSX } from "react";
import { Heading, Link } from "@/ui/components";

export const Header = (): JSX.Element => {
  return (
    <header>
      <Heading headingLevel={1} variant="h2">
        React Navigation, an Accessible Demonstration
      </Heading>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
    </header>
  );
};
