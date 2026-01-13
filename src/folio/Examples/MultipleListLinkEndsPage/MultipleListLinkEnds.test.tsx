import React, { act } from "react";
import fs from "fs";
import { axe, render } from "@/test";
import { MultipleListLinkEndsPage } from "@/folio/Examples";

const jsonObj = fs.readFileSync(
  "public/__static__/multiple-lists-link-ends.json",
  "utf8",
);
const nav = JSON.parse(jsonObj);

const renderPage = () => {
  return render(<MultipleListLinkEndsPage navigation={nav} />);
};

describe("MultipleListLinkEndsPage", () => {
  it("renders and passes automatic wcag", async () => {
    const { container } = renderPage();
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });
});
