"use client";
import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import Image from "next/image";
import "./DropDownWithdrawalInstructions.css";
import image from "../../../../../../public/dropDownWithdrawalInstructionsImage.webp";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import langDataEn from "@/messages/en/home.json";
import langDataFr from "@/messages/fr/home.json";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const DropDownWithdrawalInstructions = ({updatedTheme, updatedLang}: any) => {
  const [height, setHeight] = useState(0);
 

  function adjustHeight() {
    setHeight((prev): any => {
      if (prev === 0) {
        return 600;
      } else {
        return 0;
      }
    });
  }

 
   const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };

  const t = getLangData();

  return (
    <div className="body_201">
      <div className="body_innerbody_201" onClick={adjustHeight} style={{background: updatedTheme === "dark" ? "rgba(120, 120, 120, 0.3)":  "rgba(120, 120, 120, 0.3)"}}>
        <div className="body_innerbody_202" >
          <div
            aria-expanded={height !== 0}
            aria-controls="example-panel"
            className="body_innerbody_204"
           style={{background: updatedTheme === "dark" ? "rgba(120, 120, 120, 1)":  "rgba(120, 120, 120, 1)", color: updatedTheme === "dark" ? "white":  "black"}}
          >
            <p>{t.withdrawal}</p>{" "}
            {height === 0 ? (
              <MdOutlineKeyboardArrowDown fontSize="32px" />
            ) : (
              <MdOutlineKeyboardArrowUp fontSize="32px" />
            )}
          </div>
        </div>
        <div className="body_innerbody_203" style={{border: updatedTheme === "dark" ? " 14px solid rgba(120, 120, 120, 1)":  "14px solid rgba(120, 120, 120, 1)"}} >
          <Image
            src={image}
            fill
            loading="eager"
            style={{
              objectFit: "cover",
            }}
            alt="Picture of the background"
            placeholder="blur"
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
        <div className="body_innerbody_205">
          <div className="body_innerbody_2017" onClick={adjustHeight} style={{background: updatedTheme === "dark" ? "rgba(120, 120, 120, 1)":  "rgba(120, 120, 120, 1)", color: updatedTheme === "dark" ? "white":  "black"}} >
            <p>{t.withdrawal}</p>{" "}
            {height === 0 ? (
              <MdOutlineKeyboardArrowDown
                data-aos="flip-down"
                data-aos-duration="2000"
                fontSize="32px"
              />
            ) : (
              <MdOutlineKeyboardArrowUp fontSize="32px" />
            )}
          </div>
          <div className="body_innerbody_206" >
            <div className="body_innerbody_207" >
              <div className="body_innerbody_209" style={{background: updatedTheme === "dark" ? "rgba(120, 120, 120, 1)":  "rgba(120, 120, 120, 1)"}}></div>

              <div className="body_innerbody_2010" >
                <div className="body_innerbody_2011" style={{background: updatedTheme === "dark" ? "rgba(120, 120, 120, 1)":  "rgba(120, 120, 120, 1)", color: "white"}}>Step 1</div>
              </div>
            </div>
            <div className="body_innerbody_208">
             
                 <div className="body_innerbody_2012"  style={{
                  fontWeight: "bold",
                  paddingLeft: "80px",
                  fontSize: "16px",
                }}>{t.click_withdraw}</div>
            </div>
          </div>
          <div className="body_innerbody_206">
            <div className="body_innerbody_207">
              <div className="body_innerbody_209" style={{background: updatedTheme === "dark" ? "rgba(120, 120, 120, 1)":  "rgba(120, 120, 120, 1)"}}></div>

              <div className="body_innerbody_2010">
                <div className="body_innerbody_2011" style={{background: updatedTheme === "dark" ? "rgba(120, 120, 120, 1)":  "rgba(120, 120, 120, 1)", color: "white"}}>Step 2</div>
              </div>
            </div>
            <div className="body_innerbody_208">
              <div className="body_innerbody_2012"  style={{
                  fontWeight: "bold",
                  paddingLeft: "80px",
                  fontSize: "16px",
                }}>{t.change_ID}</div>
            </div>
          </div>
          <div className="body_innerbody_206">
            <div className="body_innerbody_207">
              <div className="body_innerbody_209" style={{background: updatedTheme === "dark" ? "rgba(120, 120, 120, 1)":  "rgba(120, 120, 120, 1)"}}></div>

              <div className="body_innerbody_2010">
                <div className="body_innerbody_2011" style={{background: updatedTheme === "dark" ? "rgba(120, 120, 120, 1)":  "rgba(120, 120, 120, 1)", color: "white"}}>Step 3</div>
              </div>
            </div>
            <div className="body_innerbody_208">
              <div className="body_innerbody_2012"   style={{
                  fontWeight: "bold",
                  paddingLeft: "80px",
                  fontSize: "16px",
                }}>{t.enter_code}</div>
            </div>
          </div>
          <div className="body_innerbody_206">
            <div className="body_innerbody_207">
              <div className="body_innerbody_209" style={{background: updatedTheme === "dark" ? "rgba(120, 120, 120, 1)":  "rgba(120, 120, 120, 1)"}}></div>

              <div className="body_innerbody_2010">
                <div className="body_innerbody_2011" style={{background: updatedTheme === "dark" ? "rgba(120, 120, 120, 1)":  "rgba(120, 120, 120, 1)", color: "white"}}>Step 4</div>
              </div>
            </div>
            <div className="body_innerbody_208">
              <div className="body_innerbody_2012" style={{
                  fontWeight: "bold",
                  paddingLeft: "80px",
                  fontSize: "16px",
                }}>
                {t.enter_amount_withdrawal}
              </div>
            </div>
          </div>

          <div className="body_innerbody_206">
            <div className="body_innerbody_2015">
              <div className="body_innerbody_2014" style={{background: updatedTheme === "dark" ? "rgba(120, 120, 120, 1)":  "rgba(120, 120, 120, 1)"}}></div>

              <div className="body_innerbody_2010">
                <div className="body_innerbody_2011 body_innerbody_2020" style={{background: updatedTheme === "dark" ? "rgba(120, 120, 120, 1)":  "rgba(120, 120, 120, 1)", color: "white"}}>
                  Step 5
                </div>
              </div>
              <div className="body_innerbody_2016"></div>
            </div>
            <div className="body_innerbody_208">
              <div className="body_innerbody_2012" style={{
                  fontWeight: "bold",
                  paddingLeft: "80px",
                  fontSize: "16px",
                }}>{t.change_or_leave}</div>
            </div>
          </div>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default DropDownWithdrawalInstructions;
