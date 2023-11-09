"use client";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
import React from "react";
import DropDownDepositInstructions from "../(components)/(DropDownDepositInstructions)/DropDownDepositInstructions";
import DropDownWithdrawalInstructions from "../(components)/(DropDownWithdrawalInstructions)/DropDownWithdrawalInstructions";
import "./thirdSection.css";

const ThirdSection = () => {
  return (
    <div className="body">
      <h2 data-aos="fade-in" data-aos-duration="1000">
        Comment ça marche
      </h2>
      <div className="body_100">
        <DropDownDepositInstructions />
        <DropDownWithdrawalInstructions />
      </div>
    </div>
  );
};

export default ThirdSection;
