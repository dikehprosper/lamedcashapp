import React from "react";
import "./transactionResults.css";
import { TransactionResultsProps } from "@/types";
import formatNumberWithCommasAndDecimal from "../../../(Utils)/formatNumber";
import { FaDownload } from "react-icons/fa";

const TransactionResults = ({
  date,
  time,
  amount,
  receipt,
  betId,
  status,
  type,
}: TransactionResultsProps) => {
  return (
    // <>
    //  <div className='mobile-time'> {date} {time}</div>
    <div className='transaction_result'>


      <span
        style={{ background: type === "deposits" ? "#658900" : "#0076B8" }}
      ></span>




      <span>
        {date} {time}
      </span>




     <span className="small_device_group"> <span> XOF {formatNumberWithCommasAndDecimal(amount)}
      </span>
       <span>
        <b style={{ color: "rgba(256, 256, 256, 0.4" }}>1xBet ID: &nbsp;</b>{" "}
        {betId}
      </span>
        </span>



      <span>
        <b style={{ color: "rgba(256, 256, 256, 0.4" }}>RECEIPT NO: &nbsp;</b>{" "}
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
 

  );
};

export default TransactionResults;
