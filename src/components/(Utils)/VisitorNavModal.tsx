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
}: SmallScreenNavModalProps) => {
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className={` ${containerStyles}`} onClick={handleClick}>
      <div className={` ${containerStylesInner}`}>
        {navLinks?.map((link, index) => {
          // Check if the current link is active
          const isActive = pathname === link.pathname 

          return (
            <Link
              key={index}
              className={` ${containerStylesInnerLink} ${isActive ? active : ""} `}
              href={link.pathname}
              style={{
                color:  "white", 
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
