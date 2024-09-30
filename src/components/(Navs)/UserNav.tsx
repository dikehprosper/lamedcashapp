"use client";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdMenuOpen } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import Modal from "../(Utils)/SmallScreenNavModal";
import CompanyLogo from "../../../public/Logo.webp";
import CompanyLogo1 from "../../../public/Logo1.webp";
import FacebookLogo from "../../../public/Facebook.svg";
import WhatsappLogo from "../../../public/Whatsapp.svg";
import TwitterLogo from "../../../public/twitter-logo.avif";
import TiktokLogo from "../../../public/TikTok.svg";
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdPeople } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import {
  BiLogOutCircle,
  BiLogInCircle,
  BiSolidMessageSquareDetail,
} from "react-icons/bi";
import { LuHistory } from "react-icons/lu";
import { BsFillPersonFill } from "react-icons/bs";
import { SiSimpleanalytics } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { GrUserWorker, GrUserManager } from "react-icons/gr";
import { FaUsers, FaNetworkWired } from "react-icons/fa";
import BigScreenNavModal from "../(Utils)/BigScreenNavModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useTranslations } from "next-intl";
import LanguageToggle from "../(LanguageToggle)/languageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { setTheme } from "@/lib/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import langDataEn from "@/messages/en.json";
import langDataFr from "@/messages/fr.json";

const UserNav = () => {
 
  const pathname = usePathname();
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const [state, setState] = useState(true);



         //Language settings
const getCurrentLangFromPath = (): string => {
  // Check if window is defined (to handle server-side rendering)
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname; // Use window.location.pathname instead of router.asPath
    const currentLang = currentPath.split("/")[1]; // Extract the first part of the path
    // Return the current language or default to 'fr' if not 'en' or 'fr'
    return (currentLang === "fr" || currentLang === "en") ? currentLang : "fr"; 
  }
  // Default return value for server-side rendering
  return "fr"; // or any default language you want to use
};
 const updatedLang = getCurrentLangFromPath();
  const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };
  

  // Access `t` outside of the function
  const t = getLangData();




  const UsersNavLinks = [
    {
      title: t.navLinks.dashboard,
      pathname: `/${updatedLang}/dashboard`,
      icon: <BiSolidDashboard />,
    },
    {
      title: t.navLinks.deposit,
      pathname: `/${updatedLang}/deposit`,
      icon: <BiLogInCircle />,
    },
    {
      title: t.navLinks.withdraw,
      pathname: `/${updatedLang}/withdraw`,
      icon: <BiLogOutCircle />,
    },
    {
      title: `Transactions`,
      pathname: `/${updatedLang}/transactions`,
      icon: <LuHistory />,
    },
      {
      title: `Références`,
      pathname: `/${updatedLang}/referrals`,
      icon: <IoMdPeople />,
    },
    {
      title: t.navLinks.profile,
      pathname: `/${updatedLang}/profile`,
      icon: <BsFillPersonFill />,
    },
  ];

  const SubAdminsNavLinksDeposits = [
    {
      title: t.navLinks.dashboard,
      pathname: `/${updatedLang}/subadmin/deposit/dashboard`,
      icon: <BiSolidDashboard />,
    },
    {
      title: `Transactions`,
      pathname: `/${updatedLang}/subadmin/deposit/transactions`,
      icon: <LuHistory />,
    },
  ];

  const SubAdminsNavLinksWithdrawal = [
    {
      title: t.navLinks.dashboard,
      pathname: `/${updatedLang}/subadmin/withdrawal/dashboard`,
      icon: <BiSolidDashboard />,
    },
    {
      title: `Transactions`,
      pathname: `/${updatedLang}/subadmin/withdrawal/transactions`,
      icon: <LuHistory />,
    },
  ];

  const AdminNavLinks = [
    {
      title: t.adminNavLinks.dashboard,
      pathname: `/${updatedLang}/admin/dashboard`,
      icon: <BiSolidDashboard />,
    },
    {
      title: t.adminNavLinks.allHistory,
      pathname: `/${updatedLang}/admin/allhistory`,
      icon: <SiSimpleanalytics />,
    },
    {
      title: t.adminNavLinks.withdrawals,
      pathname: `/${updatedLang}/admin/withdrawals`,
      icon: <TbDeviceDesktopAnalytics />,
    },
    {
      title: t.adminNavLinks.users,
      pathname: `/${updatedLang}/admin/users`,
      icon: <FaUsers />,
    },
    // {
    //   title: `Messages`,
    //   pathname: "/admin/messages",
    //   icon: <BiSolidMessageSquareDetail />,
    // },
    // {
    //   title: `Système`,
    //   pathname: "/admin/system",
    //   icon: <FaNetworkWired />,
    // },
    // {
    //   title: `Références`,
    //   pathname: "/admin/referrals",
    //   icon: <IoMdPeople />,
    // },
  ];

  const logout = async () => {
 
    try {
      await axios.get("/api/users/logout");
      localStorage.removeItem("activeTab");
      toast.success("Logout successful");
      // Only redirect if the axios request is successful
      localStorage.removeItem("activeTab");
      router.push(`/${updatedLang}/signin`);
    } catch (error: any) {
      // console.log(error.message);
      // toast.error(error.message);
      toast.error("failed");
    }
  };
  function changeState() {
    setState((prev) => {
      return !prev;
    });
  }

  function handleClick() {
    setState(true);
  }

  function findPath() {
    if (pathname.startsWith("/en/admin") || pathname.startsWith("/fr/admin")) {
      return AdminNavLinks;
    } else if (pathname.startsWith("/en/subadmin/deposit") || pathname.startsWith("/fr/subadmin/deposit")) {
      return SubAdminsNavLinksDeposits;
    } else if (pathname.startsWith("/en/subadmin/withdrawal") || pathname.startsWith("/fr/subadmin/withdrawal")) {
      return SubAdminsNavLinksWithdrawal;
    } else {
      return UsersNavLinks;
    }
 
  }
   console.log(UsersNavLinks, "UsersNavLinks")




 const dispatch = useAppDispatch();
    const updatedTheme = useAppSelector((state) => state.theme.theme);

   useEffect(() => {
    if (updatedTheme === null) {
        dispatch(setTheme("light")); // Set the theme in Redux
    }
    }, [updatedTheme]);
  
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



  return (updatedTheme === "dark" || updatedTheme === "light" ?
    <>
      <div className="user-nav for-larger-devices"  style={{
          background: updatedTheme === "dark" ? "" : "white",
           boxShadow: updatedTheme === "dark" ? "" : "0px 4px 10px rgba(0, 0, 0, 1)",
        }}>
        <div style={{ width: "100%" }}>
          <div className="user-nav-img-container">
            <div className="user-nav-img">
               { updatedTheme === "light" ? (
            <Image
              src={CompanyLogo1}
              loading='eager'
              fill
              style={{objectFit: "contain"}}
              alt='Picture of the author'
            />
          ) :  updatedTheme === "dark" ?
           ( <Image
            src={CompanyLogo}
              loading='eager'
              fill
              style={{objectFit: "contain"}}
              alt='Picture of the author'
            />
          ): null}
            </div>
          </div>
          <BigScreenNavModal
            containerStyles="user-nav-link"
            navLinks={findPath()}
            updatedTheme={updatedTheme}
 
          />

        
        </div>

        <div className="user-nav-link-bottom" style={{color:   updatedTheme === "dark"
                    ? "white"
                    : updatedTheme === "light"? "black" : "transparent", 
                }}>
          <Link
            // className={` ${pathname === "/logout" ? "active" : ""}`}
            href=""
            onClick={logout}
          >
            <MdLogout />
            
            &nbsp; &nbsp; {t.dashboard.logout}
          </Link>
          <div className="user-nav-social-media">
            <h4 ><div style={{display: 'flex', justifyContent: "space-evenly", gap: "17px", alignItems: 'center',flexDirection: "row", color:   updatedTheme === "dark"
                    ? "white"
                    : updatedTheme === "light"? "black" : "transparent", 
                }}>Follow      <ThemeToggle updatedTheme={updatedTheme} toggleTheme={toggleTheme} />         <LanguageToggle updatedTheme={updatedTheme} /></div></h4>
     
            <div className="user-nav-social-media-icons">
              <div className="user-nav-logo facebook">
                <Image
                  src={FacebookLogo}
                  loading="eager"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  alt="Picture of the author"
                />
              </div>
              <div className="user-nav-logo whatsapp">
                           <a
                           style={{flex: 1, display: 'flex'}}
        href="https://wa.me/22957577103" 
        target="_blank" 
        rel="noopener noreferrer" 
      >
         
                <Image
                  src={WhatsappLogo}
                  loading="eager"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  alt="Picture of the author"
                />
                  </a>
              </div>
              <div className="user-nav-logo tiktok">
                <Image
                  src={TiktokLogo}
                  loading="eager"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  alt="Picture of the author"
                />
              </div>



                      <div className="user-nav-logo facebook">
      <a
        href="" 
        target="_blank" 
        rel="noopener noreferrer" 
      >
        <Image
          src={FacebookLogo}
          loading="eager"
          fill
          style={{
            objectFit: "contain",
          }}
          alt="Facebook logo"
        />
      </a>
    </div>

              <div className="user-nav-logo whatsapp">
                  <a
        href="https://wa.me/22957577103" 
        target="_blank" 
        rel="noopener noreferrer" 
      >
                <Image
                  src={WhatsappLogo}
                  loading="eager"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  alt="Picture of the author"
                /></a>
              </div>
            <div className="user-nav-logo twitter">
      <a
        href="" 
        target="_blank" 
        rel="noopener noreferrer" 
      >
        <Image
          src={TwitterLogo}
          loading="eager"
          fill
          style={{
            objectFit: "contain",
          }}
          alt="Twitter logo"
        />
      </a>
    </div>



            </div>
          </div>
        </div>
      </div>

      <>
        <div className="nav for-smaller-devices" style={{
          background: updatedTheme === "dark" ? "rgba(10, 20, 38,1)" : "white",
           boxShadow: updatedTheme === "dark" ? "" : "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}>
          <div className="nav-img">
          
               { updatedTheme === "light" ? (
            <Image
              src={CompanyLogo1}
              loading='eager'
              fill
              style={{objectFit: "contain"}}
              alt='Picture of the author'
            />
          ) :  updatedTheme === "dark" ?
           ( <Image
            src={CompanyLogo}
              loading='eager'
              fill
              style={{objectFit: "contain"}}
              alt='Picture of the author'
            />
          ): null}
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
          <div className="user-profile-icon-container">
            <LanguageToggle updatedTheme={updatedTheme} />


        <ThemeToggle updatedTheme={updatedTheme} toggleTheme={toggleTheme} />

        

            {/* <Link href="/profile">
              <div
                className={`user-profile-icon ${
                  pathname === "/profile" ? "disappear" : ""
                }`}
              >
                D<span className="user-profile-online-icon-mobile"> </span>
              </div>
            </Link> */}
            <div onClick={changeState}>
              {state ? (
                <MdMenuOpen className="MdMenuOpen"    style={{
               color: updatedTheme === "dark"
                    ? "white"
                    : updatedTheme === "light"? "black" : "transparent", 
                }}/>
              ) : (
                <AiOutlineClose className="MdMenuOpen"    style={{
               color: updatedTheme === "dark"
                    ? "white"
                    : updatedTheme === "light"? "black" : "transparent", 
                }}/>
              )}
            </div>
          </div>
        </div>
        {!state && (
          <Modal
            navLinks={findPath()}
            containerStyles="nav-link2"
            handleClick={handleClick}
            containerStylesInner="users-nav-link2_inner"
            containerStylesInnerLink="nav-link2_inner_link-mobile"
            active="active-user-nav"
              logout={logout}
              updatedTheme={updatedTheme}
              t={t}
          />
        )}
      </>
    </>: null
  );
};

export default UserNav;
