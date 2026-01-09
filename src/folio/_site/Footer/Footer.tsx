"use client";
import { JSX } from "react";
import { Link, Text } from "@/ui/components";

export const Footer = (): JSX.Element => {
  const today = new Date();

  return (
    <footer>
      <Text>
        <abbr title="copyright">&#169;</abbr> {today.getFullYear()}{" "}
        <Link
          href="https://www.shaynaproductions.com/"
          openInNewTab={true}
          suppressNewIcon={true}
        >
          Shayna Productions
        </Link>
      </Text>
    </footer>
  );
};
