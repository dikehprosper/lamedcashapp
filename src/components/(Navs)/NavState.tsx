"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import UserNav from "./UserNav";
import { useParams, usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

const NavState = () => {
  const pathname = usePathname();
  const params = useParams<{ locale: string }>();

  return pathname === `/${params.locale}` ||
    pathname === `/${params.locale}/about` ||
    pathname === `/${params.locale}/signin` ||
    pathname === `/${params.locale}/signup` ||
    pathname === `/${params.locale}/resetpassword` ||
    pathname === `/${params.locale}/forgotpassword` ||
    pathname.startsWith(`/${params.locale}/signup`) ? (
    <Nav />
  ) : (
    <>
      <UserNav />
      {/* <BottomNav /> */}
    </>
  );
};

export default NavState;
