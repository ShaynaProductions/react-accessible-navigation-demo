import fs from "fs";
import { Metadata } from "next";
import { MultipleListLinkEndsPage } from "@/folio/Examples";
import "./page.css";

const jsonObj = fs.readFileSync(
  "public/__static__/multiple-lists-link-ends.json",
  "utf8",
);
const nav = JSON.parse(jsonObj);

export const metadata: Metadata = {
  title: "Multiple Lists with Link Ends Example",
};

export default async function MultipleListLinkEndsExample() {
  if (nav) {
    return <MultipleListLinkEndsPage navigation={nav} />;
  }
}
