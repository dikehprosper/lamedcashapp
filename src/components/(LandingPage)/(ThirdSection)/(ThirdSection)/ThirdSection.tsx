"use client";
import React from "react";
import DropDownDepositInstructions from "../(components)/(DropDownDepositInstructions)/DropDownDepositInstructions";
import DropDownWithdrawalInstructions from "../(components)/(DropDownWithdrawalInstructions)/DropDownWithdrawalInstructions";
import "./thirdSection.css";
import { useTranslations } from "next-intl";

const ThirdSection = () => {
  const t = useTranslations("home");
  return (
    <div className="body">
      <h2>{t("how it works")}</h2>
      <div className="body_100">
        <DropDownDepositInstructions />
        <DropDownWithdrawalInstructions />
      </div>
    </div>
  );
};

export default ThirdSection;
