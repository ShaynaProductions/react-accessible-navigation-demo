export const getSingleListTestElements = (getByRole) => {
  return {
    homeLink: getByRole("link", { name: "Home (navigation)" }),
    baseComponentsLink: getByRole("link", {
      name: "Accessible Base Components (navigation)",
    }),
    singleListLink: getByRole("link", {
      name: "Single List Links (navigation)",
    }),
    horizontalButtonsLink: getByRole("link", {
      name: "Horizontal All Buttons (navigation)",
    }),
    horizontalLinkEndsLink: getByRole("link", {
      name: "Horizontal Link Ends (navigation)",
    }),
    horizontalStyledLink: getByRole("link", {
      name: "Horizontal Styled (navigation)",
    }),
    verticalStyledLink: getByRole("link", {
      name: "Vertical Styled (navigation)",
    }),
  };
};

export const getMultipleButtonsTestElements = (getByRole) => {
  return {
    communityButton: getByRole("button", { name: "Community (subnavigation)" }),
    storiesButton: getByRole("button", {
      name: "Stories and Commentary (subnavigation)",
    }),
    referenceButton: getByRole("button", { name: "Reference (subnavigation)" }),
    aboutButton: getByRole("button", { name: "About (subnavigation)" }),
  };
};
