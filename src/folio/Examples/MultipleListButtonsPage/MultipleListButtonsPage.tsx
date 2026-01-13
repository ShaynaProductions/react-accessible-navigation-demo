"use client";
import { Box, Heading, Navigation, Text } from "@/ui/components";
import { transformNavigation } from "@/ui/components/common/Navigation/utilities";

export function MultipleListButtonsPage(navObject) {
  const navigation = transformNavigation(navObject.navigation);

  return (
    <>
      <Heading headingLevel={2}>Multiple List with Top Row Buttons</Heading>
      <Text>
        An example showcasing multiple lists with the entire top row consisting
        of buttons
      </Text>
      <Text>
        <strong>Note:</strong> Keyboard functionality in the
        Structure/Transformation release is limited to TAB and navigating with
        the TAB will currently cause the focus to disappear into any hidden
        list.
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
