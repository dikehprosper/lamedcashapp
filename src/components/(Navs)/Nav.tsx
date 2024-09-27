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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const Nav = () => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const params = useParams();

  const [state, setState] = useState(true);

  const navLinks = [
    {
      title: t("Accueil"),
      pathname: `/${params.locale}`,
    },
    {
      title: t("À propos de nous"),
      pathname: `/${params.locale}/about`
    },
    {
      title: t("Se connecter"),
      pathname: `/${params.locale}/signin`
    },
    {
      title: t("S'inscrire"),
      pathname: `/${params.locale}/signup`
    },
  ];
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
    const storedTheme = useAppSelector((state) => state.theme.theme) ;
  const [updatedTheme, setUpdatedTheme] = useState(storedTheme);
  if (storedTheme === null) {
    localStorage.setItem('theme', "light");
      setUpdatedTheme("light");
  }
    

    useEffect(() => {
        // Get the value from local storage if it exists
        const value: any = localStorage.getItem("theme") // Default to light
        dispatch(setTheme(value)); // Set the theme in Redux
    }, [dispatch]);

    const toggleTheme = () => {
        const newTheme = updatedTheme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        dispatch(setTheme(newTheme)); // Update the Redux state
    };

   



  return ( updatedTheme === "dark" || updatedTheme === "light" ?
    <>
      <div
        className='nav'
        style={{
          background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white",
        }}
      >
        <div className='nav-img'>
          { updatedTheme === "light" ? (
            <Image
              src={image1}
              loading='eager'
              fill
              style={{objectFit: "contain"}}
              alt='Picture of the author'
            />
          ) :  updatedTheme === "dark" ?
           ( <Image
              src={image}
              loading='eager'
              fill
              style={{objectFit: "contain"}}
              alt='Picture of the author'
            />
          ): null}
        </div>
        <div
          className='nav-link'
          style={{
            background: updatedTheme === "dark" ? "" : "white",
            color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent",
          }}
        >
          <Link
            className={` ${pathname === `/${params.locale}` ? "active" : ""}`}
            href='/'
          >
            {t("Accueil")}
          </Link>
          <Link
            className={` ${
              pathname.includes(`/${params.locale}/about`) ? "active" : ""
            }`}
            href='/about'
          >
            {t("À propos de nous")}
          </Link>
          <Link
            className={` ${
              pathname.includes(`/${params.locale}/signin`) ? "active" : ""
            }`}
            href='/signin'
          >
            {t("Se connecter")}
          </Link>
          <Link
            className={` ${
              pathname.includes(`/${params.locale}/signup`) ? "active" : ""
            }`}
            href='/signup'
          >
            {t("S'inscrire")}
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
               color:   updatedTheme === "dark"
                    ? "white"
                    : updatedTheme === "light"? "black" : "transparent", 
                }}
              />
            ) : (
              <AiOutlineClose
                className='MdMenuOpen'
                style={{
                  color:   updatedTheme === "dark"
                    ? "white"
                    : updatedTheme === "light"? "black" : "transparent", 
                    
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
        />
      )}
    </>: null
  );
};

export default Nav;
