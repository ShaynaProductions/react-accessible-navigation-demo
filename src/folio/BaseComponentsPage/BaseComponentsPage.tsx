"use client";

import { Box, Heading } from "@/ui/components";

import { Components, Introduction } from "./sections";

export function BaseComponentsPage() {
  return (
    <Box id="base-components">
      <Heading headingLevel={2}>
        Making sure Base Components are Accessible
      </Heading>

      <Introduction />

      <Heading headingLevel={2}>
        Base Components Required for Navigation Component:
      </Heading>
      <Components headingLevel={3} />
    </Box>
  );
}
