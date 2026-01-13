import fs from "fs";
import { Metadata } from "next";
import { SingleListPage } from "@/folio/Examples";
import "./page.css";

const jsonObj = fs.readFileSync("public/__static__/single-list.json", "utf8");
const nav = JSON.parse(jsonObj);

export const metadata: Metadata = {
  title: "Simple Links Example",
};

export default async function SingleListExample() {
  if (nav) {
    return <SingleListPage navigation={nav} />;
  }
}
