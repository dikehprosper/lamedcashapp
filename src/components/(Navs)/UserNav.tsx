"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import Modal from "../(Utils)/SmallScreenNavModal";
import CompanyLogo from "../../../public/Logo.webp";
import FacebookLogo from "../../../public/Facebook.svg";
import WhatsappLogo from "../../../public/Whatsapp.svg";
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
const UsersNavLinks = [
  {
    title: "Tableau de bord",
    pathname: "/dashboard",
    icon: <BiSolidDashboard />,
  },
  {
    title: "Dépôt",
    pathname: "/deposit",
    icon: <BiLogInCircle />,
  },
  {
    title: "Retirer",
    pathname: "/withdraw",
    icon: <BiLogOutCircle />,
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
];

const SubAdminsNavLinksDeposits = [
  {
    title: "Tableau de bord",
    pathname: "/subadmin/deposit/dashboard",
    icon: <BiSolidDashboard />,
  },
  {
    title: "Transactions",
    pathname: "/subadmin/deposit/transactions",
    icon: <LuHistory />,
  }
];

const SubAdminsNavLinksWithdrawal = [
  {
    title: "Tableau de bord",
    pathname: "/subadmin/withdrawal/dashboard",
    icon: <BiSolidDashboard />,
  },
  {
    title: "Transactions",
    pathname: "/subadmin/withdrawal/transactions",
    icon: <LuHistory />,
  }
];

const AdminNavLinks = [
  {
    title: "Tableau de bord",
    pathname: "/admin/dashboard",
    icon: <BiSolidDashboard />,
  },
  {
    title: "Analytique",
    pathname: "/admin/analytics",
    icon: <SiSimpleanalytics />,
  },
  {
    title: "Caisses",
    pathname: "/admin/cashdesks",
    icon: <TbDeviceDesktopAnalytics />,
  },
  {
    title: `Utilisatrices`,
    pathname: "/admin/users",
    icon: <FaUsers />,
  },
  {
    title: `Messages`,
    pathname: "/admin/messages",
    icon: <BiSolidMessageSquareDetail />,
  },
  {
    title: `Système`,
    pathname: "/admin/system",
    icon: <FaNetworkWired />,
  },
  {
    title: `Références`,
    pathname: "/admin/referrals",
    icon: <IoMdPeople />,
  },
];
const UserNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [state, setState] = useState(true);

  const logout = async () => {
  try {
  await axios.get("/api/users/logout");
  // localStorage.removeItem("activeTab");
  toast.success("Logout successful");
  // Only redirect if the axios request is successful
  // localStorage.removeItem("activeTab");
  // router.push("/signin");
} catch (error: any) {
  // console.log(error.message);
  // toast.error(error.message);
    toast.error("failed");
}
  }
  function changeState() {
    setState((prev) => {
      return !prev;
    });
  }

  function handleClick() {
    setState(true);
  }

  function findPath() {
    if (pathname.startsWith("/admin")) {
      return AdminNavLinks;
    } else if (pathname.startsWith("/subadmin/deposit")) {
      return SubAdminsNavLinksDeposits;
    } else if (pathname.startsWith("/subadmin/withdrawal")) {
      return SubAdminsNavLinksWithdrawal;
    } else {
      return UsersNavLinks;
    }
  }

  return (
    <>
      <div className='user-nav for-larger-devices'>
        <div style={{ width: "100%" }}>
          <div className='user-nav-img-container'>
            <div className='user-nav-img'>
              <Image
                src={CompanyLogo}
                loading='eager'
                fill
                style={{
                  objectFit: "cover",
                }}
                alt='Picture of the author'
              />
            </div>
          </div>
          <BigScreenNavModal
            containerStyles='user-nav-link'
            navLinks={findPath()}
          />
        </div>

        <div className='user-nav-link-bottom'>
          <Link
            // className={` ${pathname === "/logout" ? "active" : ""}`}
            href='/'
            onClick={logout}
          >
            <MdLogout />
            &nbsp; &nbsp; Se déconnecter
          </Link>
          <div className='user-nav-social-media'>
            <h4>Follow</h4>
            <div className='user-nav-social-media-icons'>
              <div className='user-nav-logo facebook'>
                <Image
                  src={FacebookLogo}
                  loading='eager'
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  alt='Picture of the author'
                />
              </div>
              <div className='user-nav-logo whatsapp'>
                <Image
                  src={WhatsappLogo}
                  loading='eager'
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  alt='Picture of the author'
                />
              </div>
              <div className='user-nav-logo tiktok'>
                <Image
                  src={TiktokLogo}
                  loading='eager'
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  alt='Picture of the author'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        <div className='nav for-smaller-devices'>
          <div className='nav-img'>
            <Image
              src={CompanyLogo}
              loading='lazy'
              fill
              style={{
                objectFit: "cover",
              }}
              alt='Picture of the author'
            />
          </div>
          <div className='nav-link'>
            <Link className={` ${pathname === "/" ? "active" : ""}`} href='/'>
              Accueil
            </Link>
            <Link
              className={` ${pathname === "/about" ? "active" : ""}`}
              href='/about'
            >
              À propos de nous
            </Link>
            <Link
              className={` ${pathname === "/signin" ? "active" : ""}`}
              href='/signin'
            >
              Se connecter
            </Link>
            <Link
              className={` ${pathname === "/signup" ? "active" : ""}`}
              href='/signup'
            >
              S&apos;inscrire
            </Link>
          </div>
          <div className='nav-language'></div>
          <div className='user-profile-icon-container'>
            <Link href='/profile'>
              <div
                className={`user-profile-icon ${
                  pathname === "/profile" ? "disappear" : ""
                }`}
              >
                D<span className='user-profile-online-icon-mobile'> </span>
              </div>
            </Link>
            <div onClick={changeState}>
              {state ? (
                <MdMenuOpen className='MdMenuOpen' />
              ) : (
                <AiOutlineClose className='MdMenuOpen' />
              )}
            </div>
          </div>
        </div>
        {!state && (
          <Modal
            navLinks={findPath()}
            containerStyles='nav-link2'
            handleClick={handleClick}
            logout={logout}
            containerStylesInner='users-nav-link2_inner'
            containerStylesInnerLink='nav-link2_inner_link-mobile'
            active='active-user-nav'
          />
        )}
      </>
    </>
  );
};

export default UserNav;
