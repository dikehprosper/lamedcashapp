import React from "react";
import { UserDashboardDisplayProps } from "@/types";
import Link from "next/link";

import "./display.css";
const display = ({
  count,
  title,
  amount,
  style,
}: UserDashboardDisplayProps) => {
  function formatNumberWithCommasAndDecimal(amount: number): string {
    // Use toFixed(2) to ensure two decimal places and convert to a string
    const formattedNumber = amount.toFixed(2);
    // Use toLocaleString() to add commas for proper indentation
    const formattedString = parseFloat(formattedNumber).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
    return formattedString;
  }

  return (
    <div
      className='user-dashboard-display-recent'
      style={{ background: style?.background }}
    >
      <div className='display-recent-1'>
        <h2 className='display-recent-1-h1'>Pending {style.icon}</h2>
        <h1 className='display-recent-1-h2'>

          {count}
        </h1>
      </div>
      <div className='display-recent-2'>
        <span>
          <p
            style={{
              fontWeight: "600",
              marginBottom: "5px",
              color: style?.color,
              paddingTop: "20px",
            }}
          >
            Deposit Amount Due:
          </p>
          <p>
            XOF &nbsp;
            {formatNumberWithCommasAndDecimal(amount)}
          </p>
        </span>
        <Link href={title === "deposit" ? "/deposit" : "withdraw"} style={{width:"100%", height: "100%",display: "flex", alignItems:"end"}}>
          <span
            style={{
              background: style?.color,
            }}
            className='display-recent-2-title'
          >
            {title}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default display;
