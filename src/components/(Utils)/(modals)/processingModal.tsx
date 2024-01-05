/* eslint-disable */
// @ts-nocheck
"use client";
import React from "react";
import CompanyLogo from "../../../../public/Logo.webp";
import Image from "next/image";
import { TbPigMoney } from "react-icons/tb";
import formatDate from "../formatDate";
import { IoMdDownload } from "react-icons/io";
import html2canvas from "html2canvas";
import formatNumberWithCommasAndDecimal from "../formatNumber";
import { FaLongArrowAltLeft } from "react-icons/fa";
const Modal = ({
  active,
  receipt,
  containerStyles,
  containerStylesInner,
  containerStylesInnerLink,
  handleClick,
}: any) => {

  console.log(receipt?.type)
  return (
    <div className={` ${containerStyles}`} onClick={handleClick}>
      <div className={` ${containerStylesInner}`} id='receiptModal'>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <h4>Traitement</h4>
          <div id='container-deposit-processing'>
            <div id='html-spinner'></div>
          </div>

        
        </div>

        {/* <div className='receiptModalImage'>
            <Image
              src={CompanyLogo}
              loading='eager'
              fill
              style={{
                objectFit: "cover",
              }}
              alt='Picture of the author'
            />
          </div> */}
      </div>
    </div>
  );
};

export default Modal;
