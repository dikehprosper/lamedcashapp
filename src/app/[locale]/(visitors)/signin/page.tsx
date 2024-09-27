"use client";
import SignIn from "@/components/(SigninSection)/Signin";
import React from "react";
import Nav from "../../../../components/(Navs)/Nav";
import {  useAppSelector } from "@/lib/hooks";
const Signin = () => {
    const updatedTheme = useAppSelector((state) => state.theme.theme);
  return ( 
    <div style={{background: updatedTheme === "dark" ? "rgb(10, 20, 38)": "white"}}>
      <SignIn updatedTheme={updatedTheme} />
    </div>
  );
};

export default Signin;
