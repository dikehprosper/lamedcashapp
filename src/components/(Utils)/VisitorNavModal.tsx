"use client";
import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { SmallScreenNavModalProps } from "@/types";

const Modal = ({
  active,
  navLinks,
  containerStyles,
  containerStylesInner,
  containerStylesInnerLink,
  handleClick,
  updatedTheme
}: any) => {
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className={` ${containerStyles}`} onClick={handleClick} >
      <div className={` ${containerStylesInner}`} style={{
  background: updatedTheme === "dark" ? "black" : updatedTheme === "light" ? "white" : "transparent",
  boxShadow: updatedTheme === "dark" 
    ? "0 4px 10px rgba(0, 0, 0, 0.5)" 
    : updatedTheme === "light" 
    ? "0 4px 10px rgba(0, 0, 0, 0.2)" 
    : "none"
}}
>
        {navLinks?.map((link: any, index: any) => {
          // Check if the current link is active
          const isActive = pathname === link.pathname 

          return (
            <Link
              key={index}
              className={` ${containerStylesInnerLink} ${
                isActive ? active : ""
              } `}
              href={link.pathname}
              style={{
                color:
                  updatedTheme === "dark"
                    ? "white"
                    : updatedTheme === "light"
                    ? "black"
                    : "transparent",
                fontWeight: "600",
                width: "80%",
                textAlign: "center",
              }}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Modal;
