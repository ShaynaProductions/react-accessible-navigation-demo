"use client";
import { Box, Heading, Navigation, Text } from "@/ui/components";
import { transformNavigation } from "@/ui/components/common/Navigation";

export function MultipleListLinkEndsPage(navObject) {
  const navigation = transformNavigation(navObject.navigation);

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
        <strong>Note:</strong> Keyboard functionality in the
        Structure/Transformation release is limited to TAB and navigating with
        the TAB will currently cause the focus to disappear into any hidden
        list.
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
