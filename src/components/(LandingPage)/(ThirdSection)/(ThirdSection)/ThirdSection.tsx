import React from "react";
import DropDownDepositInstructions from "../(components)/(DropDownDepositInstructions)/DropDownDepositInstructions";
import DropDownWithdrawalInstructions from "../(components)/(DropDownWithdrawalInstructions)/DropDownWithdrawalInstructions";
import "./thirdSection.css";

const ThirdSection = () => {
  return (
    <div className="body">
      <h2>Comment ça marche</h2>
      <div className="body_100">
        <DropDownDepositInstructions />
        <DropDownWithdrawalInstructions />
      </div>
    </div>
  );
};

export default ThirdSection;
