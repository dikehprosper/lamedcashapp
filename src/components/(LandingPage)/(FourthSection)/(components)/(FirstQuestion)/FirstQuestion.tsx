"use client";
import "./firstQuestion.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import AnimateHeight from "react-animate-height";
import langDataEn from "@/messages/en/home.json";
import langDataFr from "@/messages/fr/home.json";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const FirstQuestion = ({ height, adjustHeight, updatedTheme, updatedLang }: any) => {

   const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };

  const t = getLangData();

  return (
    <div
      className="body_innerbody_501"
      aria-expanded={height !== 0}
      aria-controls="example-panel"
      onClick={adjustHeight}
      style={{background: updatedTheme === "dark"? "rgba(120, 120, 120, 0.1)" : "rgba(120, 120, 120,0.1)" }}
    >
      <div className="body_innerbody_504">
        <p style={{color: updatedTheme === "dark" ? "white": "black"}}>{t.how_does_withdrawal_work}</p>
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
          <p style={{color: updatedTheme === "dark" ? "white": "black"}}>{t.cash_withdrawal_conditions} :</p>
          <ul>
            <li style={{color: updatedTheme === "dark" ? "white": "black"}}>1. {t.your_1xbet_ID}</li>
            <li style={{color: updatedTheme === "dark" ? "white": "black"}}>2. {t.bet_withdrawal_code}</li>
            <li style={{color: updatedTheme === "dark" ? "white": "black"}}>3. {t.amount}</li>
            <li style={{color: updatedTheme === "dark" ? "white": "black"}}>4. {t.your_momo_number}</li>
          </ul>
          <p style={{color: updatedTheme === "dark" ? "white": "black"}}>{t.first_question_description}</p>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default FirstQuestion;
