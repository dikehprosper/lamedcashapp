"use client";
import "./firstQuestion.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import AnimateHeight from "react-animate-height";
import useTranslation from "next-translate/useTranslation";

const FirstQuestion = ({ height, adjustHeight }: any) => {
  const { t, lang } = useTranslation("home");
  return (
    <div
      className="body_innerbody_501"
      aria-expanded={height !== 0}
      aria-controls="example-panel"
      onClick={adjustHeight}
    >
      <div className="body_innerbody_504">
        <p>{t("how does withdrawal work")}</p>
        {height === 0 ? (
          <MdOutlineKeyboardArrowUp fontSize="32px" color="#bdff00" />
        ) : (
          <MdOutlineKeyboardArrowDown fontSize="32px" color="#bdff00" />
        )}
      </div>
      <AnimateHeight
        id="example-panel"
        duration={400}
        height={height}
        className="animate-height"
      >
        <div className="requirements-container">
          <p>{t("cash withdrawal conditions")} :</p>
          <ul>
            <li>1. {t("your 1xbet ID")}</li>
            <li>2. {t("1xbet withdrawal code")}</li>
            <li>3. {t("amount")}</li>
            <li>4. {t("your momo number")}</li>
          </ul>
          <p>{t("first question description")}</p>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default FirstQuestion;
