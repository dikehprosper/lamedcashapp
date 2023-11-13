"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import Modal from "../(Utils)/Modal";
import CompanyLogo from "../../../public/Logo.png";
import FacebookLogo from "../../../public/Facebook.svg";
import WhatsappLogo from "../../../public/Whatsapp.svg";
import TiktokLogo from "../../../public/TikTok.svg";
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdPeople } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { BiLogOutCircle, BiLogInCircle } from "react-icons/bi";
import { LuHistory } from "react-icons/lu";
import { BsFillPersonFill } from "react-icons/bs";



const navLinks = [
  {
    title: "Tableau de bord",
    pathname: "/dashboard",
    icon: <BiSolidDashboard />,
  },
  {
    title: "Dépôt",
    pathname: "/deposit",
    icon: <BiLogOutCircle />,
  },
  {
    title: "Retirer",
    pathname: "/withdraw",
    icon: <BiLogInCircle />
  },
  {
    title: `Transactions`,
    pathname: "/transactions",
    icon: <LuHistory />,
  },
  {
    title: `Profil`,
    pathname: "/profile",
    icon: <BsFillPersonFill />,
  },
  {
    title: `Références`,
    pathname: "/referrals",
    icon: <IoMdPeople />,
  },
  {
    title: `Se déconnecter`,
    pathname: "/",
    icon: <MdLogout />,
  },
];

const UserNav = () => {
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
      <div className="user-nav for-larger-devices">
        <div style={{ width: "100%" }}>
          <div className="user-nav-img-container">
            <div className="user-nav-img">
              <Image
                src={CompanyLogo}
                loading="lazy"
                fill
                style={{ objectFit: "cover" }}
                alt="Picture of the author"
              />
            </div>
          </div>

          <div className="user-nav-link">
            <Link
              className={` ${
                pathname === "/dashboard" ? "active-user-nav" : ""
              }`}
              href="/dashboard"
            >
              <BiSolidDashboard /> &nbsp; &nbsp;Tableau de bord
            </Link>
            <Link
              className={` ${pathname === "/deposit" ? "active-user-nav" : ""}`}
              href="/deposit"
            >
              <BiLogInCircle className="rotate-icon" />
              &nbsp; &nbsp; Dépôt
            </Link>
            <Link
              className={` ${
                pathname === "/withdraw" ? "active-user-nav" : ""
              }`}
              href="/withdraw"
            >
             <BiLogOutCircle className="rotate-icon" />
              &nbsp; &nbsp; Retirer
            </Link>
            <Link
              className={` ${
                pathname === "/transactions" ? "active-user-nav" : ""
              }`}
              href="/transactions"
            >
              <LuHistory />
              &nbsp; &nbsp; Transactions
            </Link>
            <Link
              className={` ${pathname === "/profile" ? "active-user-nav" : ""}`}
              href="/profile"
            >
              <BsFillPersonFill />
              &nbsp; &nbsp; Profil
            </Link>
            <Link
              className={` ${
                pathname === "/referrals" ? "active-user-nav" : ""
              }`}
              href="/referrals"
            >
              <IoMdPeople />
              &nbsp; &nbsp; Références
            </Link>
          </div>
        </div>
        <div className="user-nav-link-bottom">
          <Link
            // className={` ${pathname === "/logout" ? "active" : ""}`}
            href="/"
          >
            <MdLogout />
            &nbsp; &nbsp; Se déconnecter
          </Link>
          <div className="user-nav-social-media">
            <h4>Follow</h4>
            <div className="user-nav-social-media-icons">
              <div className="user-nav-logo facebook">
                <Image
                  src={FacebookLogo}
                  loading="lazy"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Picture of the author"
                />
              </div>
              <div className="user-nav-logo whatsapp">
                <Image
                  src={WhatsappLogo}
                  loading="lazy"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Picture of the author"
                />
              </div>
              <div className="user-nav-logo tiktok">
                <Image
                  src={TiktokLogo}
                  loading="lazy"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Picture of the author"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        <div className="nav for-smaller-devices">
          <div className="nav-img">
            <Image
              src={CompanyLogo}
              loading="lazy"
              fill
              style={{ objectFit: "cover" }}
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
          />
        )}
      </>
    </>
  );
};

export default UserNav;
