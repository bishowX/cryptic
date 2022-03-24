import React from "react";
import Link from "next/link";

import { useAuth } from "context/AuthContext";

const Navbar = () => {
  const {
    logout,
    state: { user },
  } = useAuth();

  return (
    <div style={{ paddingBottom: "2rem", width: "80%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
      {user && <button onClick={logout}>Logout</button>}
    </div>
  );
};

export default Navbar;
