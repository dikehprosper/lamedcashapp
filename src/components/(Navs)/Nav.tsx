"use client";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdMenuOpen } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import Modal from "../(Utils)/VisitorNavModal";
import image from "../../../public/Logo.webp";
import { useTranslations } from "next-intl";
import LanguageToggle from "../(LanguageToggle)/languageToggle";

const Nav = () => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const params = useParams();
  const [state, setState] = useState(true);

  const navLinks = [
    {
      title: t("Accueil"),
      pathname: "/",
    },
    {
      title: t("À propos de nous"),
      pathname: "/about",
    },
    {
      title: t("Se connecter"),
      pathname: "/signin",
    },
    {
      title: t("S'inscrire"),
      pathname: "/signup",
    },
  ];
  function changeState() {
    setState((prev) => !prev);
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
            loading="eager"
            fill
            style={{ objectFit: "cover" }}
            alt="Picture of the author"
          />
        </div>
        <div className="nav-link">
          <Link
            className={` ${pathname === `/${params.locale}` ? "active" : ""}`}
            href="/"
          >
            {t("Accueil")}
          </Link>
          <Link
            className={` ${pathname.includes("/about") ? "active" : ""}`}
            href="/about"
          >
            {t("À propos de nous")}
          </Link>
          <Link
            className={` ${pathname.includes("/signin") ? "active" : ""}`}
            href="/signin"
          >
            {t("Se connecter")}
          </Link>
          <Link
            className={` ${pathname.includes("/signup") ? "active" : ""}`}
            href="/signup"
          >
            {t("S'inscrire")}
          </Link>
          {/* <LanguageSwitcher /> */}
        </div>
        <div className="nav-language">
          <LanguageToggle />
        </div>
         {/* <Link
            style={{paddingLeft : 30, paddingRight: 30, paddingBottom: 10, paddingTop: 10, borderRadius: 30, border: "1px solid rgba(120, 120, 120, 1)"}}
            href=""
          >
            {t("Télécharger")}
          </Link> */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div className="for-smaller-devices">
            <LanguageToggle />
          </div>
          <div onClick={changeState}>
            {state ? (
              <MdMenuOpen className="MdMenuOpen" />
            ) : (
              <AiOutlineClose className="MdMenuOpen" />
            )}
          </div>
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
