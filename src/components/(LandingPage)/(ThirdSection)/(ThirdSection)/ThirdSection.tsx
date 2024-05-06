import React from "react";
import DropDownDepositInstructions from "../(components)/(DropDownDepositInstructions)/DropDownDepositInstructions";
import DropDownWithdrawalInstructions from "../(components)/(DropDownWithdrawalInstructions)/DropDownWithdrawalInstructions";
import "./thirdSection.css";
import createTranslation from "next-translate/createTranslation";

const ThirdSection = () => {
  const { t, lang } = createTranslation("home");
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
