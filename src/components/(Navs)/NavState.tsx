"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import UserNav from "./UserNav";

const NavState = () => {
  const [LoggenIn, setLoggedIn] = useState(true);
  return LoggenIn? <Nav />: <UserNav />
};

export default NavState;
