"use client";
import { JSX } from "react";
import { Heading, Link, List, ListItem } from "@/ui/components";

export const Header = (): JSX.Element => {
  return (
    <header>
      <Heading headingLevel={1} variant="h2">
        React Navigation, an Accessible Demonstration
      </Heading>

      <List>
        <ListItem>
          <Link href="/">Home</Link>
        </ListItem>
      </List>
    </header>
  );
};
