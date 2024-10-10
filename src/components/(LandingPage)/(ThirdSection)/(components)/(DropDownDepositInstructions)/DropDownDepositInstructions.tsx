"use client";
import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import Image from "next/image";
import "./dropDownDepositInstructions.css";
import image from "../../../../../../public/dropDownDepositInstructionsImage.webp";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import langDataEn from "@/messages/en/home.json";
import langDataFr from "@/messages/fr/home.json";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const DropDownDepositInstructions = ({updatedTheme, updatedLang}: any) => {
  const [height, setHeight] = useState(0);
 
   const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };

  const t = getLangData();

  function adjustHeight() {
    setHeight((prev): any => {
      if (prev === 0) {
        return 600;
      } else {
        return 0;
      }
    });
  }

  return (
    <div className="body_001">
      <div className="body_innerbody_001" onClick={adjustHeight} style={{background: updatedTheme === "dark" ? "rgba(120, 120, 120, 0.3)":  "rgba(120, 120, 120, 0.3)"}} >
        <div className="body_innerbody_002">
          <div
            aria-expanded={height !== 0}
            aria-controls="example-panel"
            className="body_innerbody_004"
             style={{background: updatedTheme === "dark" ? "rgba(73, 166, 106, 1)":  "rgba(73, 166, 106, 1)", color: updatedTheme === "dark" ? "white":  "black" }}
             
          >
            <p>{t.recharge}</p>{" "}
            {height === 0 ? (
              <MdOutlineKeyboardArrowDown fontSize="32px" />
            ) : (
              <MdOutlineKeyboardArrowUp fontSize="32px" />
            )}
          </div>
        </div>
        <div className="body_innerbody_003" style={{border: updatedTheme === "dark" ? "14px solid rgba(73, 166, 106, 1)":  "14px solid rgba(73, 166, 106, 1)"}}>
          <Image
            src={image}
            fill
            loading="eager"
            style={{
              objectFit: "cover",
            }}
            placeholder="blur"
            alt="Picture of the background"
          />
        </div>
      </div>

      <AnimateHeight
        id="example-panel"
        duration={500}
        height={height}
        style={{
          background: "rgba(254, 254, 254, 0.08)",
          borderRadius: "10px",
        }}
      >
        <div className="body_innerbody_005" >
          <div className="body_innerbody_0017" onClick={adjustHeight} style={{background: updatedTheme === "dark" ? "rgba(73, 166, 106, 1)":  "rgba(73, 166, 106, 1)", color: updatedTheme === "dark" ? "white":  "black"}}>
            <p>{t.recharge}</p>{" "}
            {height === 0 ? (
              <MdOutlineKeyboardArrowDown fontSize="32px" />
            ) : (
              <MdOutlineKeyboardArrowUp fontSize="32px" />
            )}
          </div>
          <div className="body_innerbody_006">
            <div className="body_innerbody_007">
              <div className="body_innerbody_009" style={{background: updatedTheme === "dark" ? "rgba(73, 166, 106, 1)":  "rgba(73, 166, 106, 1)"}}></div>

              <div className="body_innerbody_0010">
                <div className="body_innerbody_0011" style={{background: updatedTheme === "dark" ? "rgba(73, 166, 106, 1)":  "rgba(73, 166, 106, 1)", color: "white"}}>Step 1</div>
              </div>
            </div>
            <div className="body_innerbody_008">
              <div
                className="body_innerbody_0012"
                style={{
                  fontWeight: "bold",
                  paddingLeft: "80px",
                  fontSize: "16px",
                }}
              >
                {t.click_on_deposit}
              </div>
            </div>
          </div>
          <div className="body_innerbody_006">
            <div className="body_innerbody_007">
              <div className="body_innerbody_009" style={{background: updatedTheme === "dark" ? "rgba(73, 166, 106, 1)":  "rgba(73, 166, 106, 1)"}}></div>

              <div className="body_innerbody_0010">
                <div className="body_innerbody_0011" style={{background: updatedTheme === "dark" ? "rgba(73, 166, 106, 1)":  "rgba(73, 166, 106, 1)", color: "white"}}>Step 2</div>
              </div>
            </div>
            <div className="body_innerbody_008">
              <div
                className="body_innerbody_0012"
                style={{
                  fontWeight: "bold",
                  paddingLeft: "80px",
                  fontSize: "16px",
                }}
              >
                {t.change_ID}
              </div>
            </div>
          </div>
          <div className="body_innerbody_006">
            <div className="body_innerbody_007">
              <div className="body_innerbody_009" style={{background: updatedTheme === "dark" ? "rgba(73, 166, 106, 1)":  "rgba(73, 166, 106, 1)"}}></div>

              <div className="body_innerbody_0010">
                <div className="body_innerbody_0011" style={{background: updatedTheme === "dark" ? "rgba(73, 166, 106, 1)":  "rgba(73, 166, 106, 1)", color: "white"}}>Step 3</div>
              </div>
            </div>
            <div className="body_innerbody_008">
              <div
                className="body_innerbody_0012"
                style={{
                  fontWeight: "bold",
                  paddingLeft: "80px",
                  fontSize: "16px",
                }}
              >
                {t.enter_amount}
              </div>
            </div>
          </div>
          <div className="body_innerbody_006">
            <div className="body_innerbody_007">
              <div className="body_innerbody_009" style={{background: updatedTheme === "dark" ? "rgba(73, 166, 106, 1)":  "rgba(73, 166, 106, 1)"}}></div>

              <div className="body_innerbody_0010">
                <div className="body_innerbody_0011" style={{background: updatedTheme === "dark" ? "rgba(73, 166, 106, 1)":  "rgba(73, 166, 106, 1)", color: "white"}}>Step 4</div>
              </div>
            </div>
            <div className="body_innerbody_008">
              <div
                className="body_innerbody_0012"
                style={{
                  fontWeight: "bold",
                  paddingLeft: "80px",
                  fontSize: "16px",
                }}
              >
                {t.choose_network}
              </div>
            </div>
          </div>

          <div className="body_innerbody_006">
            <div className="body_innerbody_0015">
              <div className="body_innerbody_0014"  style={{background: updatedTheme === "dark" ? "rgba(73, 166, 106, 1)":  "rgba(73, 166, 106, 1)"}}></div>

              <div className="body_innerbody_0010">
                <div className="body_innerbody_0011 body_innerbody_0020" style={{background: updatedTheme === "dark" ? "rgba(73, 166, 106, 1)":  "rgba(73, 166, 106, 1)", color: "white"}}>
                  Step 5
                </div>
              </div>
              <div className="body_innerbody_0016"></div>
            </div>
            <div className="body_innerbody_008">
              <div
                className="body_innerbody_0012"
                style={{
                  fontWeight: "bold",
                  paddingLeft: "80px",
                  fontSize: "16px",
                }}
              >
                {t.change_or_leave}
              </div>
            </div>
          </div>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default DropDownDepositInstructions;
