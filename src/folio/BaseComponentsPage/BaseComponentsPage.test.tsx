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

  it("increases the counter when button is pressed", async () => {
    const { container, getByRole } = renderBaseComponentsView({});
    const button = getByRole("button", {
      name: "I am a button with a press event",
    });
    expect(container).not.toHaveTextContent("Button has been pressed");
    await userEvent.click(button);
    expect(container).toHaveTextContent("Button has been pressed 1 times");
    await userEvent.keyboard("{Enter}");
    expect(container).toHaveTextContent("Button has been pressed 2 times");
  });
});
