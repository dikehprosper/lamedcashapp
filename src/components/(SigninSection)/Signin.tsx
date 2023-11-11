"use client";
import React, { useState, useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import "./signin.css";

import Signin from "../../app/signin/page";
const MyForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // To store and retrieve login details
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    // Set the email and password in your login form fields
    if (rememberedEmail && rememberedPassword) {
      setUser({
        ...user,
        email: rememberedEmail,
        password: rememberedPassword,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //collect value from login input
  const handleUserEmail = (event: any) => {
    setUser({
      ...user,
      email: event.target.value,
    });
  };
  const handleUserPassword = (event: any) => {
    setUser({
      ...user,
      password: event.target.value,
    });
  };

  //Submit login details
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("rememberedEmailForEspece", user.email);
    localStorage.setItem("rememberedPasswordForEspece", user.password);
    console.log(user);
  };

  return (
    <form onSubmit={handleSubmit} className="signin-form-container">
      <input
        type="text"
        className="signin-form"
        value={user.email}
        onChange={handleUserEmail}
        placeholder="Enter Email"
      />
      <input
        type="text"
        className="signin-form"
        value={user.password}
        onChange={handleUserPassword}
        placeholder="Enter Password"
      />
      <button type="submit" className="signin-form-submit">
        Sign in
      </button>
    </form>
  );
};

export default MyForm;
