import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Router from "next/router";

const Signup = () => {
  const { user, error, signUp } = useAuth();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async (event) => {
    event.preventDefault();
    signUp(formValues.email, formValues.password);
  };

  const handleFormValueChange = (event) => {
    const newFormValues = { ...formValues };
    newFormValues[event.target.name] = event.target.value;
    setFormValues(newFormValues);
  };

  if (user) {
    Router.push("/");
  }

  return (
    <div>
      <h1>Signup</h1>
      {error && <h2>Error: {error}</h2>}
      <form onSubmit={handleSignup}>
        <label htmlFor="email">Email</label>
        <input required value={formValues.email} onChange={handleFormValueChange} type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input required minLength={6} value={formValues.password} onChange={handleFormValueChange} type="password" name="password" id="password" />
        <button type="submit">Signup</button>
      </form>
      <Link href={"/login"}>
        <a>Login here</a>
      </Link>
    </div>
  );
};

export default Signup;
