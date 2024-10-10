"use client";
import "./footer.css";
import Link from "next/link";
import Image from "next/image";
import image from "../../../../public/TikTok.svg";
import langDataEn from "@/messages/en/home.json";
import langDataFr from "@/messages/fr/home.json";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";


const PrivacyFooter = ({updatedTheme, updatedLang}: any) => {

   const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };

  const t = getLangData();
  return (
    <div className='footer2'>
      <p className='footer2-text' style={{color: updatedTheme === "dark"? "white": "black" }}>
        © 2024 LamedCash. All rights reserved.
        {/* {t("contact us description")} */}
      </p>
    
        <Link
          className='footer2-text'
          // className={` ${pathname === "/logout" ? "active" : ""}`}
          href='/about'
          style={{color: updatedTheme === "dark"? "white": "black" }}
        >
          {t.contact_us_description}
        </Link>
   
    </div>
  );
};

export default PrivacyFooter;
