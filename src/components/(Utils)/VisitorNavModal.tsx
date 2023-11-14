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
}: SmallScreenNavModalProps) => {
  const pathname = usePathname();

  return (
    <div className={` ${containerStyles}`} onClick={handleClick}>
      <div className={` ${containerStylesInner}`}>
        {navLinks?.map((link, index) => {
          console.log(pathname === link.pathname);
          return (
            <Link
              key={index}
              className={` ${containerStylesInnerLink} ${
                pathname === link.pathname ? active : ""
              } `}
              href={link.pathname}
              // onClick={handleClick}
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
