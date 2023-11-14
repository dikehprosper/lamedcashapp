"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import UserNav from "./UserNav";
import { usePathname } from "next/navigation";

const NavState = () => {
  const pathname = usePathname();

  return pathname === "/" || pathname === "/about" || pathname === "/signin" || pathname === "/signup" ? <Nav /> : <UserNav />;
};

export default NavState;
