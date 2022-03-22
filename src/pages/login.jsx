import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Router from "next/router";
import { Redirect } from "next";
import withoutAuth from "@/components/withoutAuth";

const Login = () => {
  const { error, login, user } = useAuth();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    login(formValues.email, formValues.password);
  };

  const handleFormValueChange = (event) => {
    const newFormValues = { ...formValues };
    newFormValues[event.target.name] = event.target.value;
    setFormValues(newFormValues);
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <h2>Error: {error}</h2>}
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input required value={formValues.email} onChange={handleFormValueChange} type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input required minLength={6} value={formValues.password} onChange={handleFormValueChange} type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
      <Link href="/signup">
        <a>Sign up here</a>
      </Link>
    </div>
  );
};

export default withoutAuth(Login);
