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
          This code base is provided as a progressive example of an accessible
          React navigation component. It is accompanied by a{" "}
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
              href="https://dev.to/shaynaproductions/base-components-are-key-to-accessibility-2bd8"
              openInNewTab={true}
            >
              Base Components are key to accessibility
            </Link>
            <br />
          </DefinitionDetail>
          <DefinitionTerm>Page</DefinitionTerm>
          <DefinitionDetail>
            <Link href="/base-components">
              Examples of Accessible Base Components
            </Link>
          </DefinitionDetail>
          <DefinitionTerm>Release</DefinitionTerm>
          <DefinitionDetail>
            <Link
              href="https://github.com/ShaynaProductions/react-accessible-navigation-demo/releases/tag/v0.1.0"
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
