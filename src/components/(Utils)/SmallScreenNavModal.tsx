"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { SmallScreenNavModalProps } from "@/types";
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
}: SmallScreenNavModalProps) => {
  const pathname = usePathname();
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

  return (
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

      <div className={` ${containerStylesInner}`} style={{ zIndex: 60 }}>
        {navLinks?.map((link, index) => {
          return (
            <a
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
                  background:
                    pathname.startsWith(link.pathname) ? "rgba(189, 255, 0, 0.8)" : "",
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
                  fontWeight:
                    pathname.startsWith(link.pathname)? "800" : "-moz-initial",
                  color:
                    state?.title === link.title
                      ? "#97CF13"
                      :  pathname.startsWith(link.pathname)
                      ? "black"
                      : "-moz-initial",
                }}
              >
                {link.title}
              </span>
            </a>
          );
        })}
        <div style={{ padding: "10px" }} onClick={logout}>
          <Link href='/'>Se déconnecter</Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
