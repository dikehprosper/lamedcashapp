"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, {useState} from "react"
import {MdMenuOpen} from "react-icons/md"

const Nav = () => {
  const pathname = usePathname();
const [state, setState] = useState(true);

  return (
    <>
      <div className="big_device nav">
        <div className="nav-img">
          <div className="nav-logo"></div>
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
            className={` ${pathname === "/login" ? "active" : ""}`}
            href="/login"
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
      </div>

  <div className="small_device nav">
        <div className="nav-img">
          <div className="nav-logo"></div>
        </div>
      {state? <div><MdMenuOpen className="MdMenuOpen" /></div>: <div className="nav-link">
          <Link className={` ${pathname === "/" ? "active" : ""}`} href="/">
            Accueil
          </Link>
          <Link
            className={` ${pathname === "/about" ? "active" : ""}`}
            href="/about"
          >

          </Link>
          <Link
            className={` ${pathname === "/login" ? "active" : ""}`}
            href="/login"
          >
            Se connecter
          </Link>
          <Link
            className={` ${pathname === "/signup" ? "active" : ""}`}
            href="/signup"
          >
            S&apos;inscrire
          </Link>
        </div>}
        <div className="nav-language"></div>
      </div>
    </>
  );
};

export default Nav;
