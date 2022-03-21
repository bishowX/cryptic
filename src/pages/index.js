import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Router } from "next/router";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { user, loading, error, logout } = useAuth();

  return (
    <>
      <h1>User: {JSON.stringify(user)}</h1>
      <h1>loading: {loading ? "true" : "False"}</h1>
      <h1>Error: {error}</h1>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <Link href="/login">
          <a>Login</a>
        </Link>
      )}
    </>
  );
}
