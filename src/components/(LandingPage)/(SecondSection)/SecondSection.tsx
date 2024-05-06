import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import { MdOutlineSupportAgent } from "react-icons/md";
import "./secondSection.css";
import Link from "next/link";
import createTranslation from "next-translate/createTranslation";

const SecondSection = () => {
  const { t, lang } = createTranslation("home");
  return (
    <div className="secondSection-container">
      <h2>{t("we offer")}</h2>
      <div className="secondSection-box">
        <div className="secondSection-box-inner animate-pop-in ">
          <div>
            {" "}
            <AiFillThunderbolt className="secondSection-icons" />
          </div>
          <h5>{t("quick")}</h5>
          <p>{t("quick description")}</p>
        </div>
        <div className="secondSection-box-inner animate-pop-in ">
          <div>
            <BsShieldLock className="secondSection-icons" />
          </div>
          <h5>{t("secure")}</h5>
          <p>{t("secure description")}</p>
        </div>
        <div className="secondSection-box-inner animate-pop-in ">
          <div>
            {" "}
            <MdOutlineSupportAgent className="secondSection-icons" />
          </div>
          <h5>Support 24/7</h5>
          <p>{t("support description")}</p>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
