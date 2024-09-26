"use client";
import React, { useState } from "react";
import "./fourthSection.css";
import FirstQuestion from "../(components)/(FirstQuestion)/FirstQuestion";
import SecondQuestion from "../(components)/(SecondQuestion)/SecondQuestion";
import { useTranslations } from "next-intl";

const FourthSection = ({updatedTheme}: any) => {
  const [height, setHeight] = useState(0);
  const [height2, setHeight2] = useState(0);
  const t = useTranslations("home");

  function adjustHeight() {
    setHeight2(0);
    setHeight((prev): any => {
      if (prev === 0) {
        return "auto";
      } else {
        return 0;
      }
    });
  }
  function adjustHeight2() {
    setHeight(0);
    setHeight2((prev): any => {
      if (prev === 0) {
        return "auto";
      } else {
        return 0;
      }
    });
  }
  return (
    <div className="component_400">
      <h2 style={{color: updatedTheme === "dark" ? "white": "black"}}>{t("faq")}</h2>
      <div className="body_400" >
        <FirstQuestion height={height} adjustHeight={adjustHeight} updatedTheme={updatedTheme} />
        <SecondQuestion height={height2} adjustHeight={adjustHeight2} updatedTheme={updatedTheme} />
      </div>
    </div>
  );
};
export default FourthSection;
