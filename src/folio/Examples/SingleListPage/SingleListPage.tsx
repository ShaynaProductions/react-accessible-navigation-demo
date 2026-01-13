"use client";
import { Box, Heading, Navigation, Text } from "@/ui/components";
import { transformNavigation } from "@/ui/components/common/Navigation/utilities";

export function SingleListPage(navObject) {
  const navigation = transformNavigation(navObject.navigation);

  return (
    <>
      <Heading headingLevel={2}>Single Link List Structure</Heading>
      <Text>An example showcasing one level of links horizontally aligned</Text>
      <Box cx="example simple">
        <Navigation id="single-links-demo" label="Single Links Demo">
          {navigation}
        </Navigation>
      </Box>
    </>
  );
}
