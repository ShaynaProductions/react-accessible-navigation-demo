import { render, userEvent } from "@/test";
import fs from "fs";
import { Box, Navigation, transformNavigation } from "@/ui/components";
import {
  getMultipleLinkTestElements,
  getMultipleButtonsTestElements,
} from "../utilities/renderedTestItems";

const multipleButtonsJSONObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-buttons.json",
  "utf8",
);

const multipleLinksJSONObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-link-ends.json",
  "utf8",
);

const multipleButtons = JSON.parse(multipleButtonsJSONObj);
const multipleLinkEnds = JSON.parse(multipleLinksJSONObj);

const TEST_ID = "navigation";
const buttonChildren = transformNavigation(multipleButtons, TEST_ID);
const linkChildren = transformNavigation(multipleLinkEnds, TEST_ID);

const renderNavigation = ({ label, children, ...rest }) => {
  return render(
    <Box cx="simple">
      <Navigation
        id="test-menu"
        label={label}
        orientation="horizontal"
        testId={TEST_ID}
        {...rest}
      >
        {children}
      </Navigation>
    </Box>,
  );
};

describe("Navigation Keyboard Handling Down Arrow", () => {
  const reqProps = {
    id: "main-menu",
    label: "Buttons SubNav List",
  };

  const buttonProps = {
    ...reqProps,
    children: buttonChildren,
  };

  const linkProps = {
    ...reqProps,
    children: linkChildren,
  };

  it("should move down through the top row of buttons when lists are closed", async () => {
    /* conforms to Up/Down Keyboard AC 1 */
    const { getByTestId, getByRole } = renderNavigation(buttonProps);

    const {
      communityButton,
      communityList,
      storiesButton,
      referenceButton,
      aboutButton,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(aboutButton).toHaveFocus();
  });

  it("should move to the first child when a list is open", async () => {
    /* conforms to Up/Down Keyboard AC  2 / 3 */
    const { getByTestId, getByRole } = renderNavigation(buttonProps);

    const { communityButton, communityList, blogLink, forumLink } =
      getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(communityList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(blogLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(forumLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(communityButton).toHaveFocus();
  });

  it("should move to siblings when sublists are closed", async () => {
    /* conforms to Up/Down Keyboard AC 5 */
    const { getByTestId, getByRole } = renderNavigation(buttonProps);

    const {
      communityButton,
      storiesButton,
      storiesList,
      searchButton,
      searchList,
      allStoriesLink,
      allCommentaryLink,
      findNextStoryButton,
      findNextStoryList,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    expect(storiesList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(searchButton).toHaveFocus();
    expect(searchList).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(allStoriesLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(allCommentaryLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(findNextStoryButton).toHaveFocus();
    expect(findNextStoryList).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
  });

  it("should move through sublists and siblings when sublists are open", async () => {
    /* conforms to Up/Down Keyboard AC 3 / 5/ 6 / 7 */
    const { getByTestId, getByRole } = renderNavigation(buttonProps);

    const {
      communityButton,
      storiesButton,
      storiesList,
      searchButton,
      searchList,
      basicSearchLink,
      advancedSearchLink,
      allStoriesLink,
      allCommentaryLink,
      findNextStoryButton,
      findNextStoryList,
      byStorytellerLink,
      byEraLink,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    expect(storiesList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(searchButton).toHaveFocus();
    expect(searchList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(searchList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(basicSearchLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(advancedSearchLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(allStoriesLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(allCommentaryLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(findNextStoryButton).toHaveFocus();
    expect(findNextStoryList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(findNextStoryList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(byStorytellerLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(byEraLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
  });

  it("should move through the top row of buttons and links when lists are closed", async () => {
    const { getByTestId, getByRole } = renderNavigation(linkProps);
    const { homeLink, contactLink } = getMultipleLinkTestElements(getByRole);
    const {
      communityButton,
      communityList,
      storiesButton,
      referenceButton,
      aboutButton,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(communityButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(contactLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(contactLink).toHaveFocus();
  });

  it("should move to siblings when sublists are closed", async () => {
    const { getByTestId, getByRole } = renderNavigation(buttonProps);

    const {
      communityButton,
      storiesButton,
      storiesList,
      searchButton,
      searchList,
      allStoriesLink,
      allCommentaryLink,
      findNextStoryButton,
      findNextStoryList,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    expect(storiesList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(searchButton).toHaveFocus();
    expect(searchList).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(allStoriesLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(allCommentaryLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(findNextStoryButton).toHaveFocus();
    expect(findNextStoryList).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
  });
});

describe("Navigation Up Arrow", () => {
  const reqProps = {
    id: "main-menu",
    label: "Buttons SubNav List",
  };

  const buttonProps = {
    ...reqProps,
    children: buttonChildren,
  };

  const linkProps = {
    ...reqProps,
    children: linkChildren,
  };
  it("should move up through sublists and focus on Parent when in a sublist", async () => {
    /* conforms to Up/Down Keyboard AC 8  */
    const { getByTestId, getByRole } = renderNavigation(buttonProps);

    const { communityButton, communityList, blogLink, forumLink } =
      getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(communityList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(blogLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(forumLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(blogLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(communityButton).toHaveFocus();
  });
  it("should move up through siblings and sublists when they are open", async () => {
    /* conforms to Up/Down Keyboard AC  10 */
    const { getByTestId, getByRole } = renderNavigation(buttonProps);

    const {
      communityButton,
      storiesButton,
      storiesList,
      searchButton,
      searchList,
      basicSearchLink,
      advancedSearchLink,
      allStoriesLink,
      allCommentaryLink,
      findNextStoryButton,
      findNextStoryList,
      byStorytellerLink,
      byEraLink,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    expect(storiesList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(searchButton).toHaveFocus();
    expect(searchList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(searchList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(basicSearchLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(findNextStoryButton).toHaveFocus();
    expect(findNextStoryList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(findNextStoryList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(byStorytellerLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(byEraLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(byStorytellerLink).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(findNextStoryButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(allCommentaryLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(allStoriesLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(advancedSearchLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(basicSearchLink).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(searchButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(storiesButton).toHaveFocus();
  });

  it("should move back through the top row of buttons and links when lists are closed", async () => {
    /* conforms to Up/Down Keyboard AC 9 */
    const { getByTestId, getByRole } = renderNavigation(linkProps);
    const { homeLink, contactLink } = getMultipleLinkTestElements(getByRole);
    const {
      communityButton,
      communityList,
      storiesButton,
      referenceButton,
      aboutButton,
    } = getMultipleButtonsTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(communityButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(contactLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(contactLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(referenceButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(homeLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(homeLink).toHaveFocus();
  });
});
