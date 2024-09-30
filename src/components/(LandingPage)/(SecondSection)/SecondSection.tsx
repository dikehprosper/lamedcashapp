"use client";
import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import { MdOutlineSupportAgent } from "react-icons/md";
import "./secondSection.css";
import Link from "next/link";
import langDataEn from "@/messages/en/home.json";
import langDataFr from "@/messages/fr/home.json";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const SecondSection = ({updatedTheme, updatedLang}: any) => {
 

   const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };

  const t = getLangData();

  return (
    <div className="secondSection-container" style={{color:updatedTheme === "dark"?  "white" : "black"}}>
      <h2>{t.we_offer}</h2>
      <div className="secondSection-box">
        <div className="secondSection-box-inner animate-pop-in " style={{background:updatedTheme === "dark"? "" : "rgba(120, 120, 120, 0.3)"}}>
          <div>
            {" "}
            <AiFillThunderbolt className="secondSection-icons" style={{color:updatedTheme === "dark"? "rgba(73, 166, 106, 1)" : "rgba(73, 166, 106, 1)"}} />
          </div>
          <h5 style={{color:updatedTheme === "dark"? "rgba(73, 166, 106, 1)" : "rgba(73, 166, 106, 1)"}}>{t.quick}</h5>
          <p>{t.quick_description}</p>
        </div>
        <div className="secondSection-box-inner animate-pop-in " style={{background:updatedTheme === "dark"? "" : "rgba(120, 120, 120, 0.3)"}}>
          <div>
            <BsShieldLock className="secondSection-icons" style={{color:updatedTheme === "dark"? "rgba(73, 166, 106, 1)" : "rgba(73, 166, 106, 1)"}} />
          </div>
          <h5 style={{color:updatedTheme === "dark"? "rgba(73, 166, 106, 1)" : "rgba(73, 166, 106, 1)"}}>{t.secure}</h5>
          <p>{t.secure_description}</p>
        </div>
        <div className="secondSection-box-inner animate-pop-in " style={{background:updatedTheme === "dark"? "" : "rgba(120, 120, 120, 0.3)"}}>
          <div>
            {" "}
            <MdOutlineSupportAgent className="secondSection-icons" style={{color:updatedTheme === "dark"? "rgba(73, 166, 106, 1)" : "rgba(73, 166, 106, 1)"}} />
          </div>
          <h5 style={{color:updatedTheme === "dark"? "rgba(73, 166, 106, 1)" : "rgba(73, 166, 106, 1)"}}>Support 24/7</h5>
          <p>{t.support_description}</p>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
