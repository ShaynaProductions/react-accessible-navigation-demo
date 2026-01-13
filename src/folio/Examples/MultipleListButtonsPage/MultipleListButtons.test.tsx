import React, { act } from "react";
import fs from "fs";
import { axe, render } from "@/test";
import { MultipleListButtonsPage } from "@/folio/Examples";

const jsonObj = fs.readFileSync(
  "public/__static__/multiple-lists-buttons.json",
  "utf8",
);
const nav = JSON.parse(jsonObj);

const renderPage = () => {
  return render(<MultipleListButtonsPage navigation={nav} />);
};

describe("MultipleListButtonsPage", () => {
  it("renders and passes automatic wcag", async () => {
    const { container } = renderPage();
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });
});
