import React from "react";
import "./cashdeskTransactionTemplate.css";
import {TransactionResultsProps} from "@/types";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import {FaDownload} from "react-icons/fa";
import Moment from "moment";
const PendingTransactionTemplate = ({
  time,
  receiptId,
  betId,
  status,
  fundingType,
  withdrawalCode,
  momoName,
  momoNumber,
  identifierId,
  userEmail,
  totalAmount,
  bonusBalance,
  showReceipt,
  updatedTheme
}: any) => {
  const handleClick = () => {
    showReceipt(
  time,
  receiptId,
  betId,
  status,
  fundingType,
  withdrawalCode,
  momoName,
  momoNumber,
  identifierId,
  userEmail,
  totalAmount,
  bonusBalance,
    );
  };

  console.log(bonusBalance, "bonusBalance")
  return (
    <>
      <div className='mobile-time-cashdesk' style={{color:  updatedTheme === "dark" ? "white" : "black"}}> {formatDate(time)}</div>
      <div className='transaction_result-cashdesk' onClick={handleClick}>
        <span
          className='first-span-cashdesk'
          style={{
            background: fundingType === "deposits"? "rgba(73, 166, 106, 1)": "rgba(120, 120, 120, 1)",
          }}
        ></span>
        <span style={{color:  updatedTheme === "dark" ? "white" : "black"}}>{formatDate(time)}</span>
        <span className='small_device_group-cashdesk' style={{color:  updatedTheme === "dark" ? "white" : "black"}}>
          <span> XOF {formatNumberWithCommasAndDecimal(totalAmount)}</span>
          <span style={{color:  updatedTheme === "dark" ? "white" : "black"}}>
            <b style={{color:  updatedTheme === "dark" ? "white" : "black"}}>SOURCE: &nbsp;</b>
            {bonusBalance === undefined ||
            bonusBalance === "" ||
            bonusBalance === null
              ? "FROM BET ACCOUNT"
              : "BONUS INCLUDED"}
          </span>
        </span>
        <span   style={{color:  updatedTheme === "dark" ? "white" : "black", overflow: "hidden"}}>
          <b  style={{color:  updatedTheme === "dark" ? "white" : "black"}}>REÇU: &nbsp;</b>{" "}
          {identifierId}
        </span>
        <span
          style={{
            color:
              status === "Pending"
                ? "rgba(120, 120, 120, 0.8)"
                : status === "Successful"
                ? "rgba(73, 166, 106, 1)"
                : "#FF0000",
          }}
          className='last-span-cashdesk'
        >
          <span>{status}</span>
        </span>
      </div>
    </>
  );
};

export default PendingTransactionTemplate;

const formatDate = (inputDate: any) => {
  const date = new Date(inputDate);
  Moment.locale("en");
  var dt = inputDate;

  const formattedDate = Moment(dt).format("DD - MM - YYYY hh:mm a");

  return formattedDate;
};
