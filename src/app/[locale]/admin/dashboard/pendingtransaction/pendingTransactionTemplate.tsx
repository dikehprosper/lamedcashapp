import React from "react";
import "./pendingTracsactionTemplate.css";
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
      <div className='mobile-time-cashdesk'> {formatDate(time)}</div>
      <div className='transaction_result-cashdesk' onClick={handleClick}>
        <span
          className='first-span-cashdesk'
          style={{
            background: "rgba(120, 120, 120, 1)",
          }}
        ></span>
        <span>{formatDate(time)}</span>
        <span className='small_device_group-cashdesk'>
          <span> XOF {formatNumberWithCommasAndDecimal(totalAmount)}</span>
          <span>
            <b style={{color: "rgba(256, 256, 256, 0.4"}}>SOURCE: &nbsp;</b>
   {bonusBalance === undefined ||
            bonusBalance === "" ||
            bonusBalance === null
              ? "FROM BET ACCOUNT"
              : "BONUS INCLUDED"}
          </span>
        </span>
        <span style={{overflow: "hidden"}}>
          <b style={{color: "rgba(256, 256, 256, 0.4"}}>REÇU: &nbsp;</b>{" "}
          {identifierId}
        </span>
        <span
          style={{
            color:
              status === "Pending"
                ? "rgba(256, 256, 256, 0.4)"
                : status === "Successful"
                ? "#BDFF00"
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
