"use client";
import { Box, Heading, Navigation, Text } from "@/ui/components";
import { transformNavigation } from "@/ui/components/common/Navigation/utilities";

export function MultipleListButtonsPage({ data }) {
  const navigation = transformNavigation(data.navigationArray);

  return (
    <>
      <Heading headingLevel={2}>Multiple List with Top Row Buttons</Heading>
      <Text>
        An example showcasing multiple lists with the entire top row consisting
        of buttons
      </Text>
      <Text>
        <strong>Note:</strong>Keyboard functionality in the multi component
        keyboard handling release implements the following keys: arrow-up and
        arrow-down, along with the previously implemented, left, right, home and
        end keys. Use the arrow-down and arrow-up keys to move between lists.
        Use of the TAB key on a button with an unexpanded list, will continue to
        result in the focus disappearing.
      </Text>
      <Box cx="example complex">
        <Navigation
          id="multiple-buttons-demo"
          label="Multiple Lists with Top Buttons Demo"
        >
          {navigation}
        </Navigation>
      </Box>
    </>
  );
}
