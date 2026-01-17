import {
  Box,
  DefinitionDetail,
  DefinitionList,
  DefinitionTerm,
  Heading,
  Link,
  List,
  ListItem,
  Text,
} from "@/ui/components";
import {
  MultipleListButtons,
  MultipleListLinkEnds,
  SingleList,
  StyledHorizontal,
  StyledVertical,
} from "./sections/";

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
        <Heading headingLevel={3}>Keyboard Handling for a Single List</Heading>
        <DefinitionList>
          <DefinitionTerm>Article</DefinitionTerm>
          <DefinitionDetail>
            <Link
              href="(https://dev.to/shaynaproductions/single-list-keyboard-handling-254g"
              openInNewTab={true}
            >
              Single List Keyboard Handling
            </Link>
            <br />
          </DefinitionDetail>
          <DefinitionTerm>Release</DefinitionTerm>
          <DefinitionDetail>
            <Link
              href="https://github.com/ShaynaProductions/react-accessible-navigation-demo/releases/tag/v0.4.0"
              openInNewTab={true}
            >
              Implementing the Basic Navigation Structure
            </Link>
          </DefinitionDetail>
        </DefinitionList>
      </Box>
      <Box cx="examples">
        <Heading headingLevel={2}>Examples</Heading>
        <Text>
          The examples in this codebase represent the progression of the code as
          completed in the latest release and article. Each release layers upon
          the previous code to progressively enhance a main navigation
          component. The source code for this release is fully typed and tested.
        </Text>
        <Text>
          Current Examples provide differing desktop navigation scenarios which
          currently implement a base navigation structure accessible by screen,
          screen reader, mouse and the TAB key.
        </Text>
        <List>
          <ListItem>
            <SingleList />
          </ListItem>
          <ListItem>
            <MultipleListButtons />
          </ListItem>
          <ListItem>
            <MultipleListLinkEnds />
          </ListItem>
          <ListItem>
            <StyledHorizontal />
          </ListItem>
          <ListItem>
            <StyledVertical />
          </ListItem>
        </List>
      </Box>
      <Box cx="prev-releases">
        <Heading headingLevel={2}>Previous Releases</Heading>
        <Text>
          Explore the previous releases in this series. Each release is
          associated with an article along with the tagged github repository.
        </Text>
        <List isOrdered={true}>
          <ListItem>
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
          </ListItem>
          <ListItem>
            <Heading headingLevel={3}>Basic Structure Implementation</Heading>
            <DefinitionList>
              <DefinitionTerm>Article</DefinitionTerm>
              <DefinitionDetail>
                <Link
                  href="(https://dev.to/shaynaproductions/structure-and-transformation-first-steps-in-navigation-implementation-248"
                  openInNewTab={true}
                >
                  Structure and Transformation: First Steps in Navigation
                  Implementation
                </Link>
                <br />
              </DefinitionDetail>
              <DefinitionTerm>Release</DefinitionTerm>
              <DefinitionDetail>
                <Link
                  href="https://github.com/ShaynaProductions/react-accessible-navigation-demo/releases/tag/v0.3.0"
                  openInNewTab={true}
                >
                  Implementing the Basic Navigation Structure
                </Link>
              </DefinitionDetail>
            </DefinitionList>{" "}
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
