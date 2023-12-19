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
  return (
    <div className={` ${containerStyles}`} onClick={handleClick}>
      <div className={` ${containerStylesInner}`} id='receiptModal'>
        <span
          onClick={handleClick}
          style={{ position: "absolute", right: "22px", top: "15px" }}
        >
          {" "}
          <FaLongArrowAltLeft className='FaLongArrowAltLeft' />
        </span>
        <div className='receiptModal_inner1'>
          <div className='receiptModalImage'>
            <Image
              src={CompanyLogo}
              loading='eager'
              fill
              style={{
                objectFit: "cover",
              }}
              alt='Picture of the author'
            />
          </div>
          <h3
            style={{
              background:
                receipt.status === "Successful"
                  ? "rgba(0, 128, 0, 0.6)"
                  : receipt.status === "Pending"
                  ? "rgba(128, 128, 128, 0.6)"
                  : "rgba(256, 0, 0, 0.6)",
              color: "rgba(256, 256, 256, 0.8)",
              borderRadius: "3px",
            }}
          >
            {" "}
            {receipt.status}
          </h3>
        </div>
        <div className='receiptModal_inner2'>
          <div>
            {" "}
            <TbPigMoney />
          </div>
          <div>
            <div
              style={{
                color:
                  receipt?.type === "withdrawals"
                    ? "rgba(0, 118, 184, 0.7)"
                    : "rgba(0, 184, 118, 0.7)",
                fontWeight: "bold",
              }}
            >
              Montant du{" "}
              {receipt?.type === "withdrawals" ? "retraits" : "dépôt"}
            </div>
            <div style={{ fontWeight: "900", color: "white" }}>
              {" "}
              XOF{" "}
              {typeof receipt?.amount === "number"
                ? formatNumberWithCommasAndDecimal(receipt?.amount)
                : receipt?.amount}
            </div>
          </div>
        </div>
        <div className='receiptModal_inner3'>
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "flex-end",
              fontWeight: "bold",
            }}
          >
            1xBET ID:
          </div>

          <div> {receipt?.betId} </div>
        </div>
        <div className='receiptModal_inner4'>
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "flex-end",
              fontWeight: "bold",
            }}
          >
            identifiant de transaction:
          </div>
          <div> {receipt?.identifierId} </div>
        </div>
        <div className='receiptModal_inner5'>
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "flex-end",
              fontWeight: "bold",
            }}
          >
            date et l&apos;heure:{" "}
          </div>
          <div> {formatDate(receipt?.time)}</div>
        </div>

        {receipt.withdrawalCode && (
          <div className='receiptModal_inner6'>
            <div
              style={{
                color: "rgba(128, 128, 128, 0.9)",
                display: "flex",
                justifyContent: "flex-end",
                fontWeight: "bold",
              }}
            >
              code de retrait 1xbet:{" "}
            </div>
            <div> {receipt?.withdrawalCode}</div>
          </div>
        )}

        <div className='receiptModal_inner6'>
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "flex-end",
              fontWeight: "bold",
            }}
          >
            nom:{" "}
          </div>
          <div>
            {" "}
            {receipt?.username ? receipt?.username : receipt?.momoName}
          </div>
        </div>
        <div className='receiptModal_inner7'>
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "flex-end",
              fontWeight: "bold",
            }}
          >
            numéro de maman:{" "}
          </div>
          <div>
            {" "}
            {receipt?.userNumber ? receipt?.userNumber : receipt?.momoNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
