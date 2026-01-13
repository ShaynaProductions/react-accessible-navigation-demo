import React, { act } from "react";
import fs from "fs";
import { axe, render } from "@/test";
import { SingleListPage } from "@/folio/Examples";

const jsonObj = fs.readFileSync("public/__static__/single-list.json", "utf8");
const nav = JSON.parse(jsonObj);

const renderPage = () => {
  return render(<SingleListPage navigation={nav} />);
};

describe("SingleListPage", () => {
  it("renders and passes automatic wcag", async () => {
    const { container } = renderPage();
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });
});
