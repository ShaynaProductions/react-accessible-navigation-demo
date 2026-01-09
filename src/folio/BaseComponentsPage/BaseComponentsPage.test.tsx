import React, { act } from "react";
import { axe, render, userEvent } from "@/test";
import { BaseComponentsPage } from "./BaseComponentsPage";

const renderBaseComponentsView = (optProps) => {
  return render(<BaseComponentsPage {...optProps} />);
};

describe("<BaseComponentsPage />", () => {
  it("passes auto-wcag", async () => {
    const { container } = renderBaseComponentsView({});
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });
  it("opens the Button section when the button is clicked", async () => {
    const { getByRole, queryAllByRole } = renderBaseComponentsView({});
    const button = getByRole("button", { name: "Display Button Component" });
    const headings = queryAllByRole("heading", { name: "Button Component" });
    expect(button).toBeInTheDocument();
    expect(headings).toHaveLength[0];
    await userEvent.click(button);
    expect(headings).toHaveLength[1];
  });

  it("opens the text section when the button is clicked", async () => {
    const { getByRole, queryAllByRole } = renderBaseComponentsView({});
    const button = getByRole("button", { name: "Display Text Component" });
    const headings = queryAllByRole("heading", { name: "Text Component" });
    expect(button).toBeInTheDocument();
    expect(headings).toHaveLength[0];
    await userEvent.click(button);
    expect(headings).toHaveLength[1];
  });

  it("opens the headings section when the button is clicked", async () => {
    const { getByRole, queryAllByRole } = renderBaseComponentsView({});
    const button = getByRole("button", { name: "Display Heading Component" });
    const headings = queryAllByRole("heading", { name: "Heading Component" });
    expect(button).toBeInTheDocument();
    expect(headings).toHaveLength[0];
    await userEvent.click(button);
    expect(headings).toHaveLength[1];
  });

  it("opens the link section when the button is clicked", async () => {
    const { getByRole, queryAllByRole } = renderBaseComponentsView({});
    const button = getByRole("button", { name: "Display Link Component" });
    const headings = queryAllByRole("heading", { name: "Link Component" });
    expect(button).toBeInTheDocument();
    expect(headings).toHaveLength[0];
    await userEvent.click(button);
    expect(headings).toHaveLength[1];
  });

  it("opens the list section when the button is clicked", async () => {
    const { getByRole, queryAllByRole } = renderBaseComponentsView({});
    const button = getByRole("button", { name: "Display List Component" });
    const headings = queryAllByRole("heading", { name: "List Component" });
    expect(button).toBeInTheDocument();
    expect(headings).toHaveLength[0];
    await userEvent.click(button);
    expect(headings).toHaveLength[1];
  });
});
