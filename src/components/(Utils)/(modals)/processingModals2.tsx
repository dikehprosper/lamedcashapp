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
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Modal = ({
  active,
  receipt,
  containerStyles,
  containerStylesInner,
  containerStylesInnerLink,
  handleClick,
}: any) => {
  console.log(receipt?.type);
  return (
    <div className={` ${containerStyles}`} onClick={handleClick} style={{flexDirection: "column", display: "flex"}}>
      <div className={` ${containerStylesInner}`} id='receiptModal' >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "10px"
          }}
        >
          <h4>Traité</h4>
          <div style={{ height: "30px", color: "rgba(0, 180, 0, 1)" }}>
            {/* <IoIosCheckmarkCircle fontSize="50px" /> */}
            <IoCheckmarkDoneSharp  fontSize="50px" />
          </div>

        </div>
       
      </div>
       <div style={{alignSelf: "center", fontSize: "10px", marginTop: "10px"}}>Transaction initiée et envoyée. En attente de votre approbation</div>
    </div>
  );
};

export default Modal;
