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
const DropDownDepositInstructions = () => {
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

  return (
    <div className="body_001">
      <div className="body_innerbody_001" onClick={adjustHeight}>
        <div className="body_innerbody_002">
          <div
            aria-expanded={height !== 0}
            aria-controls="example-panel"
            className="body_innerbody_004"
          >
            <p>Recharger</p>{" "}
            {height === 0 ? (
              <MdOutlineKeyboardArrowDown fontSize="32px" />
            ) : (
              <MdOutlineKeyboardArrowUp fontSize="32px" />
            )}
          </div>
        </div>
        <div className="body_innerbody_003">
          <Image
            src={image}
            fill
            loading='eager'
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
        <div className="body_innerbody_005">
          <div className="body_innerbody_0017" onClick={adjustHeight}>
            <p>Recharger</p>{" "}
            {height === 0 ? (
              <MdOutlineKeyboardArrowDown fontSize="32px" />
            ) : (
              <MdOutlineKeyboardArrowUp fontSize="32px" />
            )}
          </div>
          <div className="body_innerbody_006">
            <div className="body_innerbody_007">
              <div className="body_innerbody_009"></div>

              <div className="body_innerbody_0010">
                <div className="body_innerbody_0011">Step 1</div>
              </div>
            </div>
            <div className="body_innerbody_008">
              <div className="body_innerbody_0012">jhvjhvhvivjvuchjvhjuhvj</div>
            </div>
          </div>
          <div className="body_innerbody_006">
            <div className="body_innerbody_007">
              <div className="body_innerbody_009"></div>

              <div className="body_innerbody_0010">
                <div className="body_innerbody_0011">Step 2</div>
              </div>
            </div>
            <div className="body_innerbody_008">
              <div className="body_innerbody_0012">jhvjhvhvivjvuchjvhjuhvj</div>
            </div>
          </div>
          <div className="body_innerbody_006">
            <div className="body_innerbody_007">
              <div className="body_innerbody_009"></div>

              <div className="body_innerbody_0010">
                <div className="body_innerbody_0011">Step 3</div>
              </div>
            </div>
            <div className="body_innerbody_008">
              <div className="body_innerbody_0012">jhvjhvhvivjvuchjvhjuhvj</div>
            </div>
          </div>
          <div className="body_innerbody_006">
            <div className="body_innerbody_007">
              <div className="body_innerbody_009"></div>

              <div className="body_innerbody_0010">
                <div className="body_innerbody_0011">Step 4</div>
              </div>
            </div>
            <div className="body_innerbody_008">
              <div className="body_innerbody_0012">jhvjhvhvivjvuchjvhjuhvj</div>
            </div>
          </div>

          <div className="body_innerbody_006">
            <div className="body_innerbody_0015">
              <div className="body_innerbody_0014"></div>

              <div className="body_innerbody_0010">
                <div className="body_innerbody_0011 body_innerbody_0020">
                  Step 5
                </div>
              </div>
              <div className="body_innerbody_0016"></div>
            </div>
            <div className="body_innerbody_008">
              <div className="body_innerbody_0012">jhvjhvhvivjvuchjvhjuhvj</div>
            </div>
          </div>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default DropDownDepositInstructions;
