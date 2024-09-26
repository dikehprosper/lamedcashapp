"use client";
import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import { MdOutlineSupportAgent } from "react-icons/md";
import "./secondSection.css";
import Link from "next/link";
import { useTranslations } from "next-intl";

const SecondSection = ({updatedTheme}: any) => {
  const t = useTranslations("home");
  return (
    <div className="secondSection-container" style={{color:updatedTheme === "dark"?  "white" : "black"}}>
      <h2>{t("we offer")}</h2>
      <div className="secondSection-box">
        <div className="secondSection-box-inner animate-pop-in " style={{background:updatedTheme === "dark"? null : "rgba(120, 120, 120, 0.3)"}}>
          <div>
            {" "}
            <AiFillThunderbolt className="secondSection-icons" style={{color:updatedTheme === "dark"? null : "rgba(73, 166, 106, 1)"}} />
          </div>
          <h5 style={{color:updatedTheme === "dark"? null : "rgba(73, 166, 106, 1)"}}>{t("quick")}</h5>
          <p>{t("quick description")}</p>
        </div>
        <div className="secondSection-box-inner animate-pop-in " style={{background:updatedTheme === "dark"? null : "rgba(120, 120, 120, 0.3)"}}>
          <div>
            <BsShieldLock className="secondSection-icons" style={{color:updatedTheme === "dark"? null : "rgba(73, 166, 106, 1)"}} />
          </div>
          <h5 style={{color:updatedTheme === "dark"? null : "rgba(73, 166, 106, 1)"}}>{t("secure")}</h5>
          <p>{t("secure description")}</p>
        </div>
        <div className="secondSection-box-inner animate-pop-in " style={{background:updatedTheme === "dark"? null : "rgba(120, 120, 120, 0.3)"}}>
          <div>
            {" "}
            <MdOutlineSupportAgent className="secondSection-icons" style={{color:updatedTheme === "dark"? null : "rgba(73, 166, 106, 1)"}} />
          </div>
          <h5 style={{color:updatedTheme === "dark"? null : "rgba(73, 166, 106, 1)"}}>Support 24/7</h5>
          <p>{t("support description")}</p>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
