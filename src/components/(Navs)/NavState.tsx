"use client";
import React from "react";
import Nav from "./Nav";
import UserNav from "./UserNav";
import { useParams, usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

const NavState = () => {
  const pathname = usePathname();
  const params = useParams<{ locale: string }>();

  const showNav = [
    `/${params.locale}`,
    `/${params.locale}/about`,
    `/${params.locale}/signin`,
    `/${params.locale}/signup`,
    `/${params.locale}/resetpassword`,
    `/${params.locale}/forgotpassword`,
    `/${params.locale}/account-deletion`,
     `/${params.locale}/privacy-policy`,
  ];

  const shouldShowNav = showNav.includes(pathname) || pathname.startsWith(`/${params.locale}/signup`);

  if (shouldShowNav) {
    return <Nav />;
  }

  if (pathname === `/${params.locale}/kkkk` || pathname === `/${params.locale}/backend`) {
    return null;
  }

  return (
    <>
      <UserNav />
      {/* <BottomNav /> */}
    </>
  );
};

export default NavState;
