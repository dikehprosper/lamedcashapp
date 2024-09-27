import React from "react";
import "./transactionResults.css";
import { TransactionResultsProps } from "@/types";
import formatNumberWithCommasAndDecimal from "../../../(Utils)/formatNumber";
import { FaDownload } from "react-icons/fa";
import Moment from 'moment';
import {MdLogin} from "react-icons/md";
import {useTranslations} from "next-intl";
const TransactionResults = ({
  time,
  amount,
  receipt,
  betId,
  status,
  type,
  showReceipt,
  momoName,
  momoNumber,
  withdrawalCode,
  identifierId,
  updatedTheme
}: any) => {
  const t = useTranslations("dashboard");
  const handleClick = () => {
    showReceipt(
      time,
      amount,
      identifierId,
      betId,
      status,
      type,
      momoName,
      momoNumber,
      withdrawalCode
    );
  };


  return (
    <>

      <div className='transaction_result' onClick={handleClick}>
        <span
          className='first-span'
          style={{
            background:
              type === "deposits"
                ? "rgba(73, 166, 106, 0.3)"
                : "rgba(120, 120, 120,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MdLogin
            size={24}
            color={
              type === "deposits"
                ? "rgba(73, 166, 106, 1)"
                : "rgba(120, 120, 120,1)"
            }
          />
        </span>

        <span  style={{
            color:
              updatedTheme === "dark"
                ? "white"
                : updatedTheme === "light"
                ? "black"
                : "transparent",
          }}>{formatDate(time)}</span>
        <span
          className='small_device_group'
          style={{color: "rgba(256, 256, 256, 0.8"}}
        >
          {" "}
          <span  style={{
            color:
              updatedTheme === "dark"
                ? "white"
                : updatedTheme === "light"
                ? "black"
                : "transparent",
          }}>
            <b>
              {type === "deposits"
                ? `${t("deposit_text")}`
                : `${t("withdrawal_text")}`}{" "}
              ||
            </b>
            <b> {betId}</b>
          </span>
    
            <span>  {type === "deposits" ? (
            <span
              
     
       style={{
            color:
              updatedTheme === "dark"
                ? "white"
                : updatedTheme === "light"
                ? "black"
                : "transparent",
                justifyContent: "flex-end", alignItems: "center"
          }}
            >
              XOF {formatNumberWithCommasAndDecimal(amount)}
            </span>
          ) : (
            <span    style={{
            color:
              updatedTheme === "dark"
                ? "white"
                : updatedTheme === "light"
                ? "black"
                : "transparent",
                justifyContent: "flex-end", alignItems: "center"
          }} > {withdrawalCode}</span>
          )}</span>
       
        </span>
        <span   style={{
            color:
              updatedTheme === "dark"
                ? "white"
                : updatedTheme === "light"
                ? "black"
                : "transparent",
              overflow: "hidden"
          }}>
          <b style={{color: "rgba(256, 256, 256, 0.4"}}>REÇU: &nbsp;</b>{" "}
          {identifierId}
        </span>
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
          className='last-span'
        >
          {type === "deposits" ? (
            <span
              className='last-span-for-small'
  
      style={{
            color:
              updatedTheme === "dark"
                ? "white"
                : updatedTheme === "light"
                ? "black"
                : "transparent",
              fontWeight: "800", fontSize: "10px", justifyContent: "flex-end", alignItems: "center"
          }}
            >
              XOF {formatNumberWithCommasAndDecimal(amount)}
            </span>
          ) : (
            <span className='last-span-for-small'  style={{
            color:
              updatedTheme === "dark"
                ? "white"
                : updatedTheme === "light"
                ? "black"
                : "transparent",
              fontWeight: "800", fontSize: "10px", justifyContent: "flex-end", alignItems: "center"
          }} >{withdrawalCode}</span>
          )}
          <span
            style={{
              color:
                status === "Pending"
                  ? "rgba(256, 256, 256, 0.4)"
                  : status === "Successful"
                  ? "#BDFF00"
                  : "#FF0000",
              fontWeight: "800",
              justifyContent: "center",
              marginRight: "10px",
              fontSize: "13px",
                borderRadius: "4px",
               border: "0.3px solid rgba(0, 255, 0, 0.2)" ,
             
            }}
          >
            {status}
          </span>
        </span>
      </div>
    </>
  );
};

export default TransactionResults;

const formatDate = (inputDate: any) => {
  const date = new Date(inputDate);
  Moment.locale("en");
  var dt = inputDate;

  const formattedDate = Moment(dt).format("DD - MM - YYYY hh:mm a");

  return formattedDate;
};