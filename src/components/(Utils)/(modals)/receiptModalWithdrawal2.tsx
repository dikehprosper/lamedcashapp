/* eslint-disable */
// @ts-nocheck
"use client";
import React, {useRef, useState} from "react";
import CompanyLogo from "../../../../public/Logo.webp";
import Image from "next/image";
import {TbPigMoney} from "react-icons/tb";
import formatDate from "../formatDate";
import {IoMdDownload} from "react-icons/io";
import html2canvas from "html2canvas";
import formatNumberWithCommasAndDecimal from "../formatNumber";
import {FaLongArrowAltLeft} from "react-icons/fa";
import {FaRegCopy} from "react-icons/fa";
import {toast} from "react-toastify";
import {usePathname, useRouter} from "next/navigation";
import axios from "axios";
const Modal = ({
  containerStyles,
  containerStylesInner,
  handleClick,
  receipt,
  title,
}: any) => {
 
  const pathname = usePathname();
  const router = useRouter();
  const handleChildClick = (event: React.MouseEvent) => {
    // Stop the event propagation to the parent (receiptModal)
    event.stopPropagation();
  };
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleCopyClick = () => {
    if (spanRef.current) {
      const range = document.createRange();
      range.selectNode(spanRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);

      try {
        document.execCommand("copy");
        toast.success("Text successfully copied!");
      } catch (err) {
        toast.error("Oops! Unable to copy text.");
      }

      window.getSelection()?.removeAllRanges();
    }
  };

  const [loading, setLoading] = useState(null);

  const handleSubmit = async (value) => {
    try {
      setLoading(value);
      const transactionId = receipt.identifierId;
      const sentData = {
        value: value,
        transactionId: transactionId,
      };
      const res = await axios.post(
        "/api/updatedTransactionHistoryForAdmin",
        sentData
      );

      if (res.finalResult === "Successful") {
     handleClick(value, transactionId);
      } else {
          toast.error(
            "Désolé, vous ne pouvez pas effectuer cette opération"
          );
      }
       
      setLoading(null);
    } catch (error: any) {
      if (error.response) {
        // Handle token expiration
        if (error.response.status === 401) {
          toast.error(
            "Vous vous êtes connecté ailleurs. Vous devez vous reconnecter ici."
          );
          setLoading(null);
          router.replace("/signin");
        } else if (error.response.status === 402) {
          toast.error(
            "Votre session a expiré. Redirection vers la connexion..."
          );
          router.replace("/signin");
          setLoading(null);
        } else {
          // Handle other errors
          setLoading(false);
          toast.error(
            "Une erreur s'est produite. Veuillez réessayer plus tard."
          );
        }
      } else if (error.request) {
        setLoading(null);
        // Handle network errors (no connection)
        setIsOnline(null);
      }
    }
  };


   console.log(receipt, "receiptreceipt");


  return (
    <div className={` ${containerStyles}`} onClick={handleClick}>
      <div
        className={` ${containerStylesInner}`}
        id='receiptModal'
        onClick={handleChildClick}
        style={{gap: 10}}
      >
        {receipt?.betId && (
          <div className='receiptModal_inner3' style={{height: "50px"}}>
            <div
              style={{
                color: "rgba(128, 128, 128, 0.9)",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              ID:
            </div>

            <div
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {receipt?.betId}
            </div>
          </div>
        )}
        {receipt.bonusBalance ? (
          <div className='receiptModal_inner3' style={{height: "50px"}}>
            <div
              style={{
                color: "rgba(128, 128, 128, 0.9)",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              SOURCE:
            </div>

            <div
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              BONUS
            </div>
          </div>
        ) : (
          <div className='receiptModal_inner3' style={{height: "50px"}}>
            <div
              style={{
                color: "rgba(128, 128, 128, 0.9)",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              SOURCE:
            </div>

            <div
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              FROM BET ACCOUNT
            </div>
          </div>
        )}

        {receipt?.withdrawalCode && (
          <div className='receiptModal_inner3' style={{height: "50px"}}>
            <div
              style={{
                color: "rgba(128, 128, 128, 0.9)",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              WITHDRAWAL CODE:
            </div>

            <div
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {receipt?.withdrawalCode}
            </div>
          </div>
        )}
        {receipt?.service && (
          <div className='receiptModal_inner3' style={{height: "50px"}}>
            <div
              style={{
                color: "rgba(128, 128, 128, 0.9)",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              SERVICE:
            </div>

            <div
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {receipt?.service}
            </div>
          </div>
        )}

        {receipt?.totalAmount && (
          <div className='receiptModal_inner3' style={{height: "50px"}}>
            <div
              style={{
                color: "rgba(128, 128, 128, 0.9)",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              AMOUNT:
            </div>

            <div
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {receipt?.totalAmount}
            </div>
          </div>
        )}

        {receipt?.fundingType && (
          <div className='receiptModal_inner3' style={{height: "50px"}}>
            <div
              style={{
                color: "rgba(128, 128, 128, 0.9)",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              TYPE:
            </div>

            <div
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {receipt?.fundingType}
            </div>
          </div>
        )}

        <div className='receiptModal_inner4' style={{height: "50px"}}>
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            iDENTIFIANT DE TRANSACTION:
          </div>
          <div
            ref={spanRef}
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {" "}
            {receipt?.identifierId}{" "}
          </div>
        </div>
        <div
          className='receiptModal_inner5'
          style={{justifyContent: "flex-start", width: "100%", height: "50px"}}
        >
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            DATE ET l&apos;HEURE:
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {" "}
            {formatDate(receipt?.time)}
          </div>
        </div>

        <div className='receiptModal_inner7' style={{height: "50px"}}>
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            NUMÉRO DE MAMAN:
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {receipt?.userNumber ? receipt?.userNumber : receipt?.momoNumber}
          </div>
        </div>

       {receipt?.userEmail && <div className='receiptModal_inner7' style={{height: "50px"}}>
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            E-MAIL DE L'UTILISATEUR:
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {" "}
            {receipt?.userEmail}
          </div>
        </div>} 
         {receipt?.email && <div className='receiptModal_inner7' style={{height: "50px"}}>
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            E-MAIL DE L'UTILISATEUR:
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >

            {receipt?.email}
          </div>
        </div>} 

        {receipt.status === "Pending" && (
          <div
            className='receiptModal_inner7'
            style={{
              height: "50px",
              justifyContent: "space-evenly",
              padding: "40px",
            }}
          >
            <div
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                background: "green",
                borderRadius: "4px",
                alignItems: "center",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px",
                maxWidth: "110px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                height: "40px",
                justifyContent: "center",
              }}
              onClick={() => handleSubmit("accept")}
            >
              {loading === "accept" && (
                <div
                  id='container-deposit'
                  style={{width: "15px", height: "15px"}}
                >
                  <div id='html-spinner-deposit'></div>
                </div>
              )}
              ACCEPT
            </div>
            <div
              style={{
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
                background: "red",
                color: "white",
                borderRadius: "4px",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px",
                maxWidth: "110px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                height: "40px",
                justifyContent: "center",
              }}
              onClick={() => handleSubmit("reject")}
            >
              {" "}
              {loading === "reject" && (
                <div
                  id='container-deposit'
                  style={{width: "15px", height: "15px"}}
                >
                  <div id='html-spinner-deposit'></div>
                </div>
              )}
              REJECT
            </div>
          </div>
        )}

        {receipt.status === "Successful" && (
          <div
            className='receiptModal_inner7'
            style={{
              height: "50px",
              justifyContent: "space-evenly",
              padding: "40px",
            }}
          >
            <div
              style={{
                color: "black",
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
                background: "gold",
                borderRadius: "4px",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px",
                maxWidth: "110px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                height: "40px",
              }}
              onClick={() => handleSubmit("pend")}
            >
              {loading === "pend" && (
                <div id='container-deposit'>
                  <div id='html-spinner-deposit'></div>
                </div>
              )}
              PEND
            </div>
            <div
              style={{
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
                background: "red",
                color: "white",
                borderRadius: "4px",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px",
                maxWidth: "110px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                height: "40px",
              }}
              onClick={() => handleSubmit("reject")}
            >
           
              {loading === "reject" && (
                <div id='container-deposit'>
                  <div id='html-spinner-deposit'></div>
                </div>
              )}
              REJECT
            </div>
          </div>
        )}

        {receipt.status === "Failed" && (
          <div
            className='receiptModal_inner7'
            style={{
              height: "50px",
              justifyContent: "space-evenly",
              padding: "40px",
            }}
          >
            <div
              style={{
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
                background: "green",
                color: "white",
                borderRadius: "4px",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px",
                maxWidth: "110px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                height: "40px",
              }}
              onClick={() => handleSubmit("accept")}
            >
              {" "}
              {loading === "accept"  && (
                <div id='container-deposit'>
                  <div id='html-spinner-deposit'></div>
                </div>
              )}
              ACCEPT
            </div>
            <div
              style={{
                justifyContent: "center",
                fontWeight: "bold",
                textAlign: "center",
                background: "gold",
                color: "black",
                borderRadius: "4px",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px",
                maxWidth: "110px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                height: "40px",
              }}
              onClick={() => handleSubmit("pend")}
            >

              {loading === "pend" && (
                <div id='container-deposit'>
                  <div id='html-spinner-deposit'></div>
                </div>
              )}
              PEND
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
