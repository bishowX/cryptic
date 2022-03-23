import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/market">
        <a>Market</a>
      </Link>
      <Link href="/portfolio">
        <a>Portfolio</a>
      </Link>
    </div>
  );
};

export default Navbar;
