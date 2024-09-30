"use client";
import React from "react";
import DropDownDepositInstructions from "../(components)/(DropDownDepositInstructions)/DropDownDepositInstructions";
import DropDownWithdrawalInstructions from "../(components)/(DropDownWithdrawalInstructions)/DropDownWithdrawalInstructions";
import "./thirdSection.css";
import langDataEn from "@/messages/en/home.json";
import langDataFr from "@/messages/fr/home.json";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
const ThirdSection = ({updatedTheme, updatedLang}: any) => {


 
   const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };

  const t = getLangData();
  return (
    <div className="body">
      <h2 style={{color: updatedTheme === "dark"?  "white" : "black"}}>{t.how_it_works}</h2>
      <div className="body_100">
        <DropDownDepositInstructions updatedTheme={updatedTheme} updatedLang={updatedLang} />
        <DropDownWithdrawalInstructions updatedTheme={updatedTheme} updatedLang={updatedLang}/>
      </div>
    </div>
  );
};

export default ThirdSection;
