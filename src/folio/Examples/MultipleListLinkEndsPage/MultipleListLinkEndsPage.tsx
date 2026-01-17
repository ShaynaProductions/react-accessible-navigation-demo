"use client";
import { Box, Heading, Navigation, Text } from "@/ui/components";
import { transformNavigation } from "@/ui/components/common/Navigation";

export function MultipleListLinkEndsPage({ data }) {
  const navigation = transformNavigation(data.navigationArray);

  return (
    <>
      <Heading headingLevel={2}>
        Multiple Lists with Top Row Links and Buttons
      </Heading>
      <Text>
        An example showcasing multiple lists with the top row displaying links
        and buttons.
      </Text>
      <Text>
        <strong>Note:</strong>Keyboard functionality in the single keyboard
        handling release implements the following keys: arrow-left, arrow-right,
        home and end. Use the TAB key to move between lists. Use of the TAB key
        on a button with an unexpanded list, will result in the focus
        disappearing.
      </Text>
      <Box cx="example complex">
        <Navigation
          id="multiple-link-ends-demo"
          label="Multiple Lists with Top Row Links and Buttons"
        >
          {navigation}
        </Navigation>
      </Box>
    </>
  );
}
