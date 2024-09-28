"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { SmallScreenNavModalProps } from "@/types";
import { useTranslations } from "next-intl";
interface State {
  title: string;
}

const Modal = ({
  active,
  navLinks,
  containerStyles,
  containerStylesInner,
  containerStylesInnerLink,
  handleClick,
  logout,
  updatedTheme
}: any) => {
  const pathname = usePathname();
  const t = useTranslations("dashboard");
  const [state, setState] = useState<State | undefined>(undefined);
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: any
  ) => {
    setState(link);
    event.preventDefault();

    const navigationStart = performance.now();
    window.location.href = link.pathname;

    const navigationCompleteListener = () => {
      const navigationEnd = performance.now();
      const navigationTime = navigationEnd - navigationStart;

      // Remove the event listener
      document.removeEventListener(
        "DOMContentLoaded",
        navigationCompleteListener
      );

      // Trigger handleClick 1/5 of the way into the load process
      const delay = navigationTime / 5;
      setTimeout(() => {
        handleClick && handleClick();
      }, delay);
    };

    // Add an event listener to measure when the DOMContentLoaded event occurs
    document.addEventListener("DOMContentLoaded", navigationCompleteListener);
  };

  function logout1() {
    console.log("hdfgjdndgnd")
  }

  return (updatedTheme === "dark" || updatedTheme === "light" ?
    <div className={`${containerStyles}`}>
      <div
        onClick={handleClick}
        style={{
          width: "100%",
          height: "100%",
          flex: "1",
          display: "flex",
          zIndex: 2,
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
        }}
      ></div>

      <div className={` ${containerStylesInner}`} style={{ zIndex: 4000,background: updatedTheme === "dark" ? "" : "white",
boxShadow: updatedTheme === "dark" ? "" : "0px 4px 10px rgba(0, 0, 0, 1)",
                       }} >
        {navLinks?.map((link: any, index: any) => {
          return (
            <a
              style={{
                display:
                  link.pathname.includes("dashboard") ||
                  link.pathname.includes("deposit") ||
                  link.pathname.includes("withdraw") ||
                  link.pathname.includes("transactions")
                    ? "flex"
                    : "flex",
              }}
              key={index}
              className={` ${containerStylesInnerLink} `}
              href={link.pathname}
              onClick={(e) => handleLinkClick(e, link)}
            >
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  bottom: "0",
                  width: "85%",
                  borderRadius: "0px 20px 20px 0px",
                  zIndex: 2,
                  background: pathname.startsWith(link.pathname)
                    ? "rgba(73, 166, 106, 1)"
                    : "",
                }}
              ></div>
              <span
                style={{
                  position: "absolute",
                  zIndex: 4,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: pathname.startsWith(link.pathname)
                    ? "800"
                    : "-moz-initial",
                  color:
                    state?.title === link.title
                      ? "black"
                      : pathname.startsWith(link.pathname)
                      ? "black"
                      : updatedTheme === "dark" ? "white" : "black",
                }}
              >
                {link.title}
              </span>
            </a>
          );
        })}
        <div style={{ padding: "10px", color: updatedTheme === "dark" ? "white" : "black", }} onClick={logout}>
          <Link href="">{t("logout")}</Link>
        </div>
      </div>
    </div>: null
  );
};

export default Modal;
