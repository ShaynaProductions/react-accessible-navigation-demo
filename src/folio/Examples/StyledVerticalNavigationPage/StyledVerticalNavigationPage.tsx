"use client";
import { Box, Heading, Navigation, Text } from "@/ui/components";
import { transformNavigation } from "@/ui/components/common/Navigation/utilities";

export function StyledVerticalNavigationPage({ data }) {
  const navigation = transformNavigation(data.navigationArray);

  return (
    <>
      <Heading headingLevel={2}>Design Ready Vertical Navigation</Heading>
      <Text>
        Once structure and transformation are completed, a design ready
        environment is made available for design.
      </Text>
      <Text>
        <strong>Note:</strong> Keyboard functionality in the single keyboard
        handling release implements the following keys: arrow-left, arrow-right,
        home and end. Use the TAB key to move between lists. Use of the TAB key
        on a button with an unexpanded list, will result in the focus
        disappearing.
      </Text>
      <Box>
        <Navigation
          cx="vertical-layout"
          id="horizontal-design"
          orientation="vertical"
          label="Multiple Lists with Top Buttons"
        >
          {navigation}
        </Navigation>
      </Box>
    </>
  );
}
