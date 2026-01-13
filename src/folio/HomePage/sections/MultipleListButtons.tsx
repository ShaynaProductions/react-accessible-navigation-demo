"use client";

import { Heading, Link, Text } from "@/ui/components";

export function MultipleListButtons() {
  return (
    <>
      <Heading headingLevel={3}>
        <Link href="/examples/multiple-lists-buttons">
          Multiple Lists Top Row Buttons
        </Link>
      </Heading>
      <Text>
        An example of a multiple list navigation component where the entire top
        row is composed of buttons.
      </Text>
    </>
  );
}
