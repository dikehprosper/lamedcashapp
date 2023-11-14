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
        console.log(pathname === link.pathname);
        return (
          <Link
            key={index}
            className={` ${
              pathname === link.pathname ? "active-user-nav" : ""
            }`}
            href={link.pathname}
            // onClick={handleClick}
          >
            {link.icon} &nbsp; &nbsp; {link.title}
          </Link>
        );
      })}
    </div>
  );
};

export default BigScreenNavModal;
