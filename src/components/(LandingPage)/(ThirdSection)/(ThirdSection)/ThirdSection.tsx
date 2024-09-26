"use client";
import React from "react";
import DropDownDepositInstructions from "../(components)/(DropDownDepositInstructions)/DropDownDepositInstructions";
import DropDownWithdrawalInstructions from "../(components)/(DropDownWithdrawalInstructions)/DropDownWithdrawalInstructions";
import "./thirdSection.css";
import { useTranslations } from "next-intl";

const ThirdSection = ({updatedTheme}: any) => {
  const t = useTranslations("home");
  return (
    <div className="body">
      <h2 style={{color: updatedTheme === "dark"?  "white" : "black"}}>{t("how it works")}</h2>
      <div className="body_100">
        <DropDownDepositInstructions updatedTheme={updatedTheme} />
        <DropDownWithdrawalInstructions updatedTheme={updatedTheme} />
      </div>
    </div>
  );
};

export default ThirdSection;
