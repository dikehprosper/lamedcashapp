"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { SmallScreenNavModalProps } from "@/types";

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

  return (
    <div className={` ${containerStyles}`} onClick={handleClick}>
      <div className={` ${containerStylesInner}`}>
        {navLinks?.map((link, index) => {
          console.log(pathname === link.pathname);
          return (
            <a
              key={index}
              className={` ${containerStylesInnerLink} `}
              href={link.pathname}
              // onClick={handleClick}
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
                    pathname === link.pathname ? "rgba(189, 255, 0, 0.8)" : "",
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
                    pathname === link.pathname
                      ? "800"
                      : "-moz-initial",
                  color:
                    pathname === link.pathname
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
