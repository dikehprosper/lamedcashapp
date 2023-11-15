import React from "react";
import { UserDashboardDisplayProps } from "@/types";
import Link from "next/link";

const display = ({ count, title, amount, style }: UserDashboardDisplayProps) => {
    //   function formatNumberWithCommasAndDecimal(amount:number) {
    //     // Use toFixed(2) to ensure two decimal places and convert to a string
    //     const formattedNumber = parseFloat(amount:number).toFixed(2).toString();
    //     // Use toLocaleString() to add commas for proper indentation
    //     const formattedString = parseFloat(formattedNumber).toLocaleString(
    //       undefined,
    //       {
    //         minimumFractionDigits: 2,
    //         maximumFractionDigits: 2,
    //       }
    //     );
    //     return formattedString;
    //   }
  return (
    <div className='user-dashboard-display-recent' style={{background: style?.background}}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "45%",
          alignItems: "center",
        }}
      >
        <h2>Pending</h2>
        <h1 style={{ fontSize: "60px" }}>{count}</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "15px 0px",
          width: "55%",
          alignItems: "center",
        }}
      >
        <span>
          <p
            style={{
              fontWeight: "700",
              marginBottom: "5px",
              color: style?.color,
              paddingTop: "28px",
            }}
          >
            Deposit Amount Due:
          </p>
          <p style={{ fontWeight: "700" }}>XOF 
          {/* {formatNumberWithCommasAndDecimal(amount)} */}
          </p>
        </span>
       <Link href={title === 'deposit'? "/deposit": "withdraw"}><span
          style={{
            fontWeight: "700",
            width: "200px",
            display: "flex",
            height: "40px",
            background: style?.color,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "3px",
          }}
        >
         {title}
        </span>
        </Link> 
      </div>
    </div>
  );
};

export default display;
