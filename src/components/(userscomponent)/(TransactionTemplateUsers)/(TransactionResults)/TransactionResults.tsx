import React from "react";
import "./transactionResults.css";
import { TransactionResultsProps } from "@/types";
import formatNumberWithCommasAndDecimal from "../../../(Utils)/formatNumber";
import { FaDownload } from "react-icons/fa";
import Moment from 'moment';
const TransactionResults = ({  time,
  amount,
  receipt,
  betId,
  status,
  type,
}: TransactionResultsProps) => {
  return (
    <>
     <div className='mobile-time'> {formatDate(time)}</div>
    <div className='transaction_result'>
      <span
      className="first-span"
        style={{ background: type === "deposits" ? "#658900" : "#0076B8", width: "13px !important" }}
      ></span>
      <span>
       {formatDate(time)}
      </span>
     <span className="small_device_group"> <span> XOF {formatNumberWithCommasAndDecimal(amount)}
      </span>
       <span>
        <b style={{ color: "rgba(256, 256, 256, 0.4" }}>1xBet ID: &nbsp;</b>{" "}
        {betId}
      </span>
        </span>
      <span>
        <b style={{ color: "rgba(256, 256, 256, 0.4" }}>NON DE REÇU: &nbsp;</b>{" "}
        {receipt}
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
      >
        <span>{status}</span>
        <span className='download-button'>
          <FaDownload />
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