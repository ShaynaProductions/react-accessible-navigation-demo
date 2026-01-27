"use client";
import { Box, Heading, Navigation, Text } from "@/ui/components";
import { transformNavigation } from "@/ui/components/common/Navigation/utilities";

export function StyledHorizontalNavigationPage({ data }) {
  const navigation = transformNavigation(data.navigationArray);

  return (
    <>
      <Heading headingLevel={2}>Design Ready Horizontal Navigation</Heading>
      <Text>
        Once structure and transformation are completed, a design ready
        environment is made available for design. Styling has been added to
        standardize widths, and bring visual indicators of focus, hover and
        focus-visible (including visual indicators of open lists and
        subnavigation relationships.
      </Text>
      <Text>
        <strong>Note:</strong>Keyboard functionality in the multi component
        keyboard handling release implements the following keys: arrow-up and
        arrow-down, along with the previously implemented, left, right, home and
        end keys. Use the arrow-down and arrow-up keys to move between lists.
        Use of the TAB key on a button with an unexpanded list, will continue to
        result in the focus disappearing.
      </Text>
      <Box>
        <Navigation
          cx="horizontal-layout"
          id="horizontal-design"
          label="Multiple Lists with Top Buttons"
        >
          {navigation}
        </Navigation>
      </Box>
    </>
  );
}
