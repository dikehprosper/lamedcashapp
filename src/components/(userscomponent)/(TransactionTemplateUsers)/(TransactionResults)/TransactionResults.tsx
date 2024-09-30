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
  updatedTheme,
  t
}: any) => {

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
                ? `${t.dashboard.deposit_text}`
                : `${t.dashboard.withdrawal_text}`}{" "}
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
             <div className="selection-type1">  XOF {formatNumberWithCommasAndDecimal(amount)} </div>
             <div className="selection-type2"> {formatDate(time)}</div>
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
          <b style={{ color:
              updatedTheme === "dark"
                ? "white"
                : updatedTheme === "light"
                ? "black"
                : "transparent"}}>       &nbsp;</b>{" "}
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
                  ? "rgba(120, 120, 120, 0.8)"
                  : status === "Successful"
                  ? "rgba(73, 166, 106, 1)"
                  : "#FF0000",
              fontWeight: "700",
              justifyContent: "center",
              marginRight: "10px",
              fontSize: "12px",
                borderRadius: "4px",
               border: "0.3px solid rgba(0, 255, 0, 0.2)" ,
             
            }}
          >
           {status === "Successful"? t.dashboard.Successful : status === "Pending"? t.dashboard.Pending : t.dashboard.Failed}
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