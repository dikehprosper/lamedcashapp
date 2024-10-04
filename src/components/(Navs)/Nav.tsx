"use client";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdMenuOpen } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import Modal from "../(Utils)/VisitorNavModal";
import image from "../../../public/Logo.webp";
import image1 from "../../../public/Logo1.webp";
import { useTranslations } from "next-intl";
import LanguageToggle from "../(LanguageToggle)/languageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { setTheme } from "@/lib/features/themeSlice";

import Cookies from "js-cookie";
import {setLang} from "@/lib/features/langSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import langDataEn from "@/messages/en.json";
import langDataFr from "@/messages/fr.json";
const Nav = () => {
  const pathname = usePathname();
  const params = useParams();
  const [state, setState] = useState(true);

  function changeState() {
    setState((prev) => !prev);
  }

  function handleClick() {
    setState(true);
  }

  //  useEffect(() => {
  //    let value;
  //    // Get the value from local storage if it exists
  //    value = localStorage.getItem("theme")
  //    setUpdatedTheme(value);
  //     dispatch(setTheme(value));
  //   //  localStorage.setItem("theme", "light");
  //  }, []);

  //   // When user submits the form, save the favorite number to the local storage
  //   const toggleTheme = () => {
  //     if(updatedTheme === "light") {
  //      localStorage.setItem("theme", "dark");
  //      setUpdatedTheme("dark")
  //     } else if (updatedTheme === "dark") {
  //        localStorage.setItem("theme", "light");
  //           setUpdatedTheme("light")
  //     }
  //   };

  //   useEffect(() => {
  //  console.log(updatedTheme, "updatedTheme")
  //  });

  const dispatch = useAppDispatch();
  const updatedTheme = useAppSelector(
    (state: any) => (state.theme as any)?.theme
  );

  useEffect(() => {
    if (updatedTheme === null || updatedTheme === undefined) {
      dispatch(setTheme("light")); // Set a default theme if none exists
    }
  }, [updatedTheme, dispatch]);

  useEffect(() => {
    // Retrieve from localStorage and set the theme in Redux
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      dispatch(setTheme(storedTheme));
    } else {
      localStorage.setItem("theme", "light"); // Default to light
      dispatch(setTheme("light")); // Set light theme in Redux
    }
  }, [dispatch]);

  const toggleTheme = () => {
    const newTheme = updatedTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    dispatch(setTheme(newTheme)); // Update theme in Redux
  };

  //Language settings
  const getCurrentLangFromPath = (): string => {
    // Check if window is defined (to handle server-side rendering)
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname; // Use window.location.pathname instead of router.asPath
      const currentLang = currentPath.split("/")[1]; // Extract the first part of the path
      // Return the current language or default to 'fr' if not 'en' or 'fr'
      return currentLang === "fr" || currentLang === "en" ? currentLang : "fr";
    }
    // Default return value for server-side rendering
    return "fr"; // or any default language you want to use
  };

  useEffect(() => {
    const currentLang = getCurrentLangFromPath();

    // Check if the cookie is already set to the current language in the path
    const cookieLang = Cookies.get("locale");

    if (cookieLang !== currentLang) {
      // If the cookie is not set to the current language, update the cookie
      Cookies.set("locale", currentLang, {expires: 365}); // Set cookie to last 1 year
    }
  }, [window.location.pathname]); // Listen for changes to pathname

  // Get the updated language based on the current path
  const updatedLang = getCurrentLangFromPath();

  const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };

  // Access `t` outside of the function
  const t = getLangData();

  const navLinks = [
    {
      title: t.header.Home,
      pathname: `/${updatedLang}`,
    },
    {
      title: t.header.About,
      pathname: `/${updatedLang}/about`,
    },
    {
      title: t.header.Signin,
      pathname: `/${updatedLang}/signin`,
    },
    {
      title: t.header.Signup,
      pathname: `/${updatedLang}/signup`,
    },
    {
      title: "",
      pathname: `/${updatedLang}/privacy-policy`,
    },
    {
      title: "",
      pathname: `/${updatedLang}/account-deletion`,
    },
  ];

  return updatedLang === "fr" ||
    (updatedLang === "en" && updatedTheme === "dark") ||
    updatedTheme === "light" ? (
    <>
      <div
        className='nav'
        style={{
          background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white",
        }}
      >
        <div className='nav-img'>
          {updatedTheme === "light" ? (
            <Image
              src={image1}
              loading='eager'
              fill
              style={{objectFit: "contain"}}
              alt='Picture of the author'
            />
          ) : updatedTheme === "dark" ? (
            <Image
              src={image}
              loading='eager'
              fill
              style={{objectFit: "contain"}}
              alt='Picture of the author'
            />
          ) : null}
        </div>
        <div
          className='nav-link'
          style={{
            background: updatedTheme === "dark" ? "" : "white",
            color:
              updatedTheme === "dark"
                ? "white"
                : updatedTheme === "light"
                ? "black"
                : "transparent",
          }}
        >
          <Link
            className={` ${pathname === `/${updatedLang}` ? "active" : ""}`}
            href={`/${updatedLang}`}
          >
            {t.header.Home}
          </Link>
          <Link
            className={` ${
              pathname.includes(`/${updatedLang}/about`) ? "active" : ""
            }`}
            href={`/${updatedLang}/about`}
          >
            {t.header.About}
          </Link>
          <Link
            className={` ${
              pathname.includes(`/${updatedLang}/signin`) ? "active" : ""
            }`}
            href={`/${updatedLang}/signin`}
          >
            {t.header.Signin}
          </Link>
          <Link
            className={` ${
              pathname.includes(`/${updatedLang}/signup`) ? "active" : ""
            }`}
            href={`/${updatedLang}/signup`}
          >
            {t.header.Signup}
          </Link>
          {/* <LanguageSwitcher /> */}
        </div>
        <div
          className='nav-language'
          style={{flexDirection: "row", alignItems: "center", gap: "9px"}}
        >
          <LanguageToggle updatedTheme={updatedTheme} />
          <ThemeToggle updatedTheme={updatedTheme} toggleTheme={toggleTheme} />
        </div>
        {/* <Link
            style={{paddingLeft : 30, paddingRight: 30, paddingBottom: 10, paddingTop: 10, borderRadius: 30, border: "1px solid rgba(120, 120, 120, 1)"}}
            href=""
          >
            {t("Télécharger")}
          </Link> */}
        <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
          <div
            className='for-smaller-devices'
            style={{flexDirection: "row", alignItems: "center", gap: "9px"}}
          >
            <LanguageToggle updatedTheme={updatedTheme} />
            <ThemeToggle
              updatedTheme={updatedTheme}
              toggleTheme={toggleTheme}
            />
          </div>
          <div onClick={changeState}>
            {state ? (
              <MdMenuOpen
                className='MdMenuOpen'
                style={{
                  color:
                    updatedTheme === "dark"
                      ? "white"
                      : updatedTheme === "light"
                      ? "black"
                      : "transparent",
                }}
              />
            ) : (
              <AiOutlineClose
                className='MdMenuOpen'
                style={{
                  color:
                    updatedTheme === "dark"
                      ? "white"
                      : updatedTheme === "light"
                      ? "black"
                      : "transparent",
                }}
              />
            )}
          </div>
        </div>
      </div>
      {!state && (
        <Modal
          navLinks={navLinks}
          containerStyles='nav-link2'
          handleClick={handleClick}
          containerStylesInner='nav-link2_inner'
          containerStylesInnerLink='nav-link2_inner_link'
          active='active'
          updatedTheme={updatedTheme}
        />
      )}
    </>
  ) : null;
};

export default Nav;
