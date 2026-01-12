import {
  Box,
  DefinitionDetail,
  DefinitionList,
  DefinitionTerm,
  Heading,
  Link,
  Text,
} from "@/ui/components";

export function HomePage() {
  return (
    <Box id="home-view">
      <Box cx="intro">
        <Text>
          This code base is provided as a progressive example of developing an
          accessible React navigation component. It is accompanied by a{" "}
          <Link href="https://dev.to/shaynaproductions/" openInNewTab={true}>
            set of articles hosted on Dev.to
          </Link>
        </Text>
      </Box>
      <Box cx="latest-release">
        <Heading headingLevel={2}>Latest Release</Heading>
        <Heading headingLevel={3}>Accessible Base Components</Heading>
        <DefinitionList>
          <DefinitionTerm>Article</DefinitionTerm>
          <DefinitionDetail>
            <Link
              href="https://dev.to/shaynaproductions/foundational-accessibility-begins-with-the-base-components-4f5p"
              openInNewTab={true}
            >
              Foundational Accessibility Begins with the Base Components
            </Link>
            <br />
          </DefinitionDetail>
          <DefinitionTerm>Example Page</DefinitionTerm>
          <DefinitionDetail>
            <Link href="/base-components">
              Examples of Accessible Base Components
            </Link>
          </DefinitionDetail>
          <DefinitionTerm>Release</DefinitionTerm>
          <DefinitionDetail>
            <Link
              href="https://github.com/ShaynaProductions/react-accessible-navigation-demo/releases/tag/v0.2.0"
              openInNewTab={true}
            >
              Accessible Base Components
            </Link>
          </DefinitionDetail>
        </DefinitionList>
      </Box>
    </Box>
  );
}
