"use client";
import React, { useState } from "react";
import "./firstQuestion.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import AnimateHeight from "react-animate-height";

const FirstQuestion = () => {
  const [height, setHeight] = useState(0);

  function adjustHeight() {
    setHeight((prev): any => {
      if (prev === 0) {
        return 245;
      } else {
        return 0;
      }
    });
  }
  return (
    <div
      className="body_innerbody_501"
      aria-expanded={height !== 0}
      aria-controls="example-panel"
      onClick={adjustHeight}
    >
      <div className="body_innerbody_504">
        <p>Comment se déroule le processus de retrait avec Espece ?</p>
        {height === 0 ? (
          <MdOutlineKeyboardArrowUp fontSize="32px" />
        ) : (
          <MdOutlineKeyboardArrowDown fontSize="32px" />
        )}
      </div>
      <AnimateHeight
        id="example-panel"
        duration={1000}
        height={height}
        style={{
          width: "100%",
          padding: "0px 120px",
          borderRadius: "0px 0px 37px 37px",
        }}
      >
        <div className="requirements-container">
          <h6>Conditions De Retrait Des Espèces :</h6>
          <ul>
            <li>1. Votre identifiant 1xbet</li>
            <li>2. Code de retrait 1Xbet obtenu depuis la plateforme 1xbet</li>
            <li>3. Montante</li>
            <li>4. Votre nom et numéro MOMO</li>
          </ul>
          <p>
            Après avoir fourni ces informations, votre demande de retrait sera
            traité.
          </p>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default FirstQuestion;
