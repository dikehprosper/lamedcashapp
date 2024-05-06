"use client";
import "./secondQuestion.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import AnimateHeight from "react-animate-height";
import useTranslation from "next-translate/useTranslation";

const SecondQuestion = ({ height, adjustHeight }: any) => {
  const { t, lang } = useTranslation("home");
  return (
    <div
      className="body_innerbody_601"
      aria-expanded={height !== 0}
      aria-controls="example-panel"
      onClick={adjustHeight}
    >
      <div className="body_innerbody_604">
        <p>{t("designate specific account question")}</p>
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
          <p>{t("designate specific account answer")}</p>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default SecondQuestion;
