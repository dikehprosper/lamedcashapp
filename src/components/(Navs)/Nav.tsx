"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import Modal from "../(Utils)/VisitorNavModal";
import image from "../../../public/Logo.webp";

const navLinks = [
  {
    title: "Accueil",
    pathname: "/",
  },
  {
    title: " À propos de nous",
    pathname: "/about",
  },
  {
    title: "Se connecter",
    pathname: "/signin",
  },
  {
    title: `S'inscrire`,
    pathname: "/signup",
  },
];

const Nav = () => {
  const pathname = usePathname();
  const [state, setState] = useState(true);

  function changeState() {
    setState((prev) => {
      return !prev;
    });
  }

  function handleClick() {
    setState(true);
  }

  return (
    <>
      <div className="nav">
        <div className="nav-img">
          <Image
            src={image}
            loading='eager'
             fill
            style={{
              objectFit: "cover"
            }}
            alt="Picture of the author"
          />
        </div>
        <div className="nav-link">
          <Link className={` ${pathname === "/" ? "active" : ""}`} href="/">
            Accueil
          </Link>
          <Link
            className={` ${pathname === "/about" ? "active" : ""}`}
            href="/about"
          >
            À propos de nous
          </Link>
          <Link
            className={` ${pathname === "/signin" ? "active" : ""}`}
            href="/signin"
          >
            Se connecter
          </Link>
          <Link
            className={` ${pathname === "/signup" ? "active" : ""}`}
            href="/signup"
          >
            S&apos;inscrire
          </Link>
        </div>
        <div className="nav-language"></div>
        <div onClick={changeState}>
          {state ? (
            <MdMenuOpen className="MdMenuOpen" />
          ) : (
            <AiOutlineClose className="MdMenuOpen" />
          )}
        </div>
      </div>
      {!state && (
        <Modal
          navLinks={navLinks}
          containerStyles="nav-link2"
          handleClick={handleClick}
          containerStylesInner="nav-link2_inner"
          containerStylesInnerLink="nav-link2_inner_link"
          active="active"
        />
      )}
    </>
  );
};

export default Nav;
