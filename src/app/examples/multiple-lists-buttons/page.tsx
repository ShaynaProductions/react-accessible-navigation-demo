import fs from "fs";
import { Metadata } from "next";
import { MultipleListButtonsPage } from "@/folio/Examples";
import "./page.css";

const jsonObj = fs.readFileSync(
  "public/__static__/multiple-lists-buttons.json",
  "utf8",
);
const nav = JSON.parse(jsonObj);

export const metadata: Metadata = {
  title: "Multiple Lists with Button Ends Example",
};

export default async function MultipleListButtonsExample() {
  if (nav) {
    return <MultipleListButtonsPage navigation={nav} />;
  }
}
