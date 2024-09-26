"use client";
import "./firstQuestion.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import AnimateHeight from "react-animate-height";
import { useTranslations } from "next-intl";

const FirstQuestion = ({ height, adjustHeight, updatedTheme }: any) => {
  const t = useTranslations("home");
  return (
    <div
      className="body_innerbody_501"
      aria-expanded={height !== 0}
      aria-controls="example-panel"
      onClick={adjustHeight}
      style={{background: updatedTheme === "dark"? "rgba(120, 120, 120, 0.1)" : "rgba(120, 120, 120,0.1)" }}
    >
      <div className="body_innerbody_504">
        <p style={{color: updatedTheme === "dark" ? "white": "black"}}>{t("how does withdrawal work")}</p>
        {height === 0 ? (
          <MdOutlineKeyboardArrowUp fontSize="32px" style={{color: updatedTheme === "dark" ? "white": "black"}} />
        ) : (
          <MdOutlineKeyboardArrowDown fontSize="32px" style={{color: updatedTheme === "dark" ? "white": "black"}} />
        )}
      </div>
      <AnimateHeight
        id="example-panel"
        duration={400}
        height={height}
        className="animate-height"
      >
        <div className="requirements-container">
          <p style={{color: updatedTheme === "dark" ? "white": "black"}}>{t("cash withdrawal conditions")} :</p>
          <ul>
            <li style={{color: updatedTheme === "dark" ? "white": "black"}}>1. {t("your 1xbet ID")}</li>
            <li style={{color: updatedTheme === "dark" ? "white": "black"}}>2. {t("1xbet withdrawal code")}</li>
            <li style={{color: updatedTheme === "dark" ? "white": "black"}}>3. {t("amount")}</li>
            <li style={{color: updatedTheme === "dark" ? "white": "black"}}>4. {t("your momo number")}</li>
          </ul>
          <p style={{color: updatedTheme === "dark" ? "white": "black"}}>{t("first question description")}</p>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default FirstQuestion;
