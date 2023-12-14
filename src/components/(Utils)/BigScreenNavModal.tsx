"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BigScreenNavModalProps } from "@/types";
const BigScreenNavModal = ({
  navLinks,
  containerStyles,
  handleClick,
}: BigScreenNavModalProps) => {
  const pathname = usePathname();
  return (
    <div className={containerStyles}>
      {navLinks?.map((link, index) => {
        return (
          <a
            key={index}
            className={` ${
              pathname === link.pathname ? "active-user-nav" : ""
            }`}
            href={link.pathname}
            // onClick={handleClick}
          >
            <div
              className={` ${
                link.title === "Dépôt" || link.title === "Retirer"
                  ? "rotate-icon"
                  : ""
              }`}
            >
              {link.icon}{" "}
            </div>
            &nbsp; &nbsp; {link.title}
          </a>
        );
      })}
    </div>
  );
};

export default BigScreenNavModal;
