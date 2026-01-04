"use client";
import { JSX } from "react";
import Link from "next/link";

export const Header = (): JSX.Element => {
  return (
    <header>
      <h1>React Navigation, an Accessible Demonstration</h1>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
    </header>
  );
};
