import React, { act } from "react";
import fs from "fs";
import { axe, render } from "@/test";
import {
  MultipleListButtonsPage,
  StyledVerticalNavigationPage,
} from "@/folio/Examples";

const jsonObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-buttons.json",
  "utf8",
);
const data = {
  navigationArray: JSON.parse(jsonObj),
};

const renderPage = () => {
  return render(<StyledVerticalNavigationPage data={data} />);
};

describe("StyledVerticalNavigationPage", () => {
  it("renders and passes automatic wcag", async () => {
    const { container } = renderPage();
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });
});
