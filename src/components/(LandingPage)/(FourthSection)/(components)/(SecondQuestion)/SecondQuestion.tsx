"use client";
import "./secondQuestion.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import AnimateHeight from "react-animate-height";
import { useTranslations } from "next-intl";

const SecondQuestion = ({ height, adjustHeight, updatedTheme }: any) => {
  const t = useTranslations("home");
  return (
    <div
      className="body_innerbody_601"
      aria-expanded={height !== 0}
      aria-controls="example-panel"
      onClick={adjustHeight}
      style={{background: updatedTheme === "dark"? "rgba(120, 120, 120, 0.1)" : "rgba(120, 120, 120,0.1)" }}
    >
      <div className="body_innerbody_604">
        <p style={{color: updatedTheme === "dark" ? "white": "black"}}>{t("designate specific account question")}</p>
        {height === 0 ? (
          <MdOutlineKeyboardArrowUp fontSize="32px" style={{color: updatedTheme === "dark" ? "white": "black"}}  />
        ) : (
          <MdOutlineKeyboardArrowDown fontSize="32px" style={{color: updatedTheme === "dark" ? "white": "black"}}  />
        )}
      </div>
      <AnimateHeight
        id="example-panel"
        duration={400}
        height={height}
        className="animate-height"
      >
        <div className="requirements-container">
          <p style={{color: updatedTheme === "dark" ? "white": "black"}}>{t("designate specific account answer")}</p>
       
        </div>
      </AnimateHeight>
    </div>
  );
};

export default SecondQuestion;
