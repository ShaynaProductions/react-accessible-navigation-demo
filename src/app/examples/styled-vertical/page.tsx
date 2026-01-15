import fs from "fs";
import { Metadata } from "next";
import { StyledVerticalNavigationPage } from "@/folio/Examples";
import "./page.css";

const jsonObj = fs.readFileSync(
  "src/ui/__static__/multiple-lists-buttons.json",
  "utf8",
);
const data = {
  navigationArray: JSON.parse(jsonObj),
};

export const metadata: Metadata = {
  title: "Design Ready Vertical Navigation Example",
};

export default async function StyledHorizontalNavigationExample() {
  if (data.navigationArray) {
    return <StyledVerticalNavigationPage data={data} />;
  }
}
