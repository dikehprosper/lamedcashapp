"use client";
import "./footer.css";
import Link from "next/link";
import Image from "next/image";
import image from "../../../../public/TikTok.svg";
import {useTranslations} from "next-intl";

const PrivacyFooter = ({updatedTheme}: any) => {
  const t = useTranslations("home");
  return (
    <div className='footer2'>
      <p className='footer2-text' style={{color: updatedTheme === "dark"? "white": "black" }}>
        © 2024 Betfundr. All rights reserved.
        {/* {t("contact us description")} */}
      </p>
    
        <Link
          className='footer2-text'
          // className={` ${pathname === "/logout" ? "active" : ""}`}
          href='/about'
          style={{color: updatedTheme === "dark"? "white": "black" }}
        >
          {t("contact us description")}
        </Link>
   
    </div>
  );
};

export default PrivacyFooter;
