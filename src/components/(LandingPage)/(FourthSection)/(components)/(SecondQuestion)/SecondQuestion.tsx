"use client";
import "./secondQuestion.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import AnimateHeight from "react-animate-height";
import langDataEn from "@/messages/en/home.json";
import langDataFr from "@/messages/fr/home.json";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
const SecondQuestion = ({ height, adjustHeight, updatedTheme, updatedLang }: any) => {
   const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };
  const t = getLangData();
  return (
    <div
      className="body_innerbody_601"
      aria-expanded={height !== 0}
      aria-controls="example-panel"
      onClick={adjustHeight}
      style={{background: updatedTheme === "dark"? "rgba(120, 120, 120, 0.1)" : "rgba(120, 120, 120,0.1)" }}
    >
      <div className="body_innerbody_604">
        <p style={{color: updatedTheme === "dark" ? "white": "black"}}>{t.designate_specific_account_question}</p>
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
          <p style={{color: updatedTheme === "dark" ? "white": "black"}}>{t.designate_specific_account_answer}</p>
       
        </div>
      </AnimateHeight>
    </div>
  );
};

export default SecondQuestion;
