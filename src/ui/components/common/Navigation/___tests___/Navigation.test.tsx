import * as fs from "node:fs";
import { act, axe, render, userEvent } from "@/test";
import { Navigation, NavigationProps } from "@/ui/components";
import { transformNavigation } from "@/ui/components/common/Navigation/utilities";

const TEST_ID = "Navigation";

jest.mock("next/navigation", () => ({
  usePathname: () => "/#about-the-site",
}));

const renderNavigation = (
  filename: string,
  optProps: Partial<NavigationProps>,
) => {
  const jsonObj = fs.readFileSync(`public/__static__/${filename}.json`, "utf8");

  const navObject = JSON.parse(jsonObj);
  const navigation = transformNavigation(navObject, TEST_ID);

  return render(
    <Navigation id="nav-id" testId={TEST_ID} label="test" {...optProps}>
      {navigation}
    </Navigation>,
  );
};

describe("<Navigation />", () => {
  it("should render singleList and verify auto-wcag compliancy", async () => {
    /* conforms to Structure/Transformation AC 5 */
    const { container } = await act(() => renderNavigation("single-list", {}));
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });

  it("should render multiple lists with Buttons and verify auto-wcag compliancy", async () => {
    /* conforms to Structure/Transformation AC 5/6 (list items) */
    const { container } = await act(() =>
      renderNavigation("multiple-lists-buttons", {}),
    );
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });

  it("should render multiple lists with Link ends and verify auto-wcag compliancy", async () => {
    /* conforms to Structure/Transformation AC 5 */
    const { container } = await act(() =>
      renderNavigation("multiple-lists-link-ends", {}),
    );
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });

  it("should be contained in a navigation landmark region", () => {
    /* conforms to Structure/Transformation AC 1 / 2 /6 */
    const { getByRole, getByTestId } = renderNavigation(
      "multiple-lists-buttons",
      {},
    );
    const nav = getByRole("navigation", { name: "test" });
    const communityList = getByTestId(`${TEST_ID}-community-menu-list`);
    const blogLink = getByRole("link", { name: "Musings" });
    expect(nav).toBeInTheDocument();
    expect(communityList).toBeInTheDocument();
    expect(communityList).toHaveRole("list");
    expect(blogLink).toBeInTheDocument();
    expect(communityList).toContainElement(blogLink);
    expect(nav).toContainElement(communityList);
  });

  it("should be displayed as horizontal", () => {
    /* conforms to Structure/Transformation AC 3/4 */
    const { queryAllByRole } = renderNavigation("multiple-lists-buttons", {});
    const navLists = queryAllByRole("list");
    expect(navLists[0]).toHaveAttribute("data-orientation", "horizontal");
    expect(navLists[0]).not.toHaveClass("srOnly");
  });

  it("should associate a button with a sublist and indicate if the sublist is open or closed", () => {
    /* conforms to Structure/Transformatoin AC 7 (association) */
    const { getByRole, getByTestId } = renderNavigation(
      "multiple-lists-buttons",
      {},
    );
    const communityButton = getByRole("button", {
      name: "Community (navigation)",
    });
    const communityList = getByTestId(`${TEST_ID}-community-menu-list`);
    const blogLink = getByRole("link", { name: "Musings" });
    expect(communityButton).toHaveAttribute("aria-controls", "community-menu");
    expect(communityList).toHaveAttribute("id", "community-menu");
    expect(communityList).toContainElement(blogLink);
    expect(communityList).toHaveClass("srOnly");
    expect(blogLink).toBeInTheDocument();
  });

  it("should handle an OnClick event", async () => {
    /* conforms to Structure/Transformation AC 7 (open/close indications in DOM) / 10 / 12  */
    const { getByTestId, getByRole } = renderNavigation(
      "multiple-lists-link-ends",
      {},
    );
    const aboutButton = getByRole("button", { name: "About (navigation)" });
    const aboutList = getByTestId(`${TEST_ID}-about-menu-list`);

    expect(aboutButton).toBeInTheDocument();
    expect(aboutList).toBeInTheDocument();
    expect(aboutButton).not.toHaveAttribute("aria-expanded", "true");
    expect(aboutList).toHaveClass("srOnly");
    await userEvent.click(aboutButton);
    expect(aboutButton).toHaveAttribute("aria-expanded", "true");
    expect(aboutList).not.toHaveClass("srOnly");
  });

  it("should display the expanded state visually", () => {
    const { getByRole } = renderNavigation("multiple-lists-buttons", {});
    const communityButton = getByRole("button", {
      name: "Community (navigation)",
    });
    expect(communityButton.innerHTML).toContain("svg-icon");
  });

  it("should return an aria-current when the href matches the current url", () => {
    /* conforms to Structure/Transfirnation AC 9*/
    const { getByRole } = renderNavigation("multiple-lists-link-ends", {});
    const currentLink = getByRole("link", { name: "About the Site" });
    expect(currentLink).toBeInTheDocument();
    expect(currentLink).toHaveAttribute("aria-current", "page");
  });
});
