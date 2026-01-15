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
        <strong>Note:</strong> Keyboard functionality in the
        Structure/Transformation release is limited to TAB and navigating with
        the TAB will currently cause the focus to disappear into any hidden
        list.
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
