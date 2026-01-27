"use client";
import { Box, Heading, Navigation, Text } from "@/ui/components";
import { transformNavigation } from "@/ui/components/common/Navigation/utilities";

export function SingleListPage({ data }) {
  const navigation = transformNavigation(data.navigationArray);

  return (
    <>
      <Heading headingLevel={2}>Single Link List Structure</Heading>
      <Text>
        An example showcasing one level of links horizontally aligned. Keyboard
        functionality in the single keyboard handling release implements the
        following keys: arrow-left, arrow-right, arrow-down, arrow-up, home and
        end. This example is fully functional.
      </Text>
      <Box cx="example simple">
        <Navigation id="single-links-demo" label="Single Links Demo">
          {navigation}
        </Navigation>
      </Box>
    </>
  );
}
