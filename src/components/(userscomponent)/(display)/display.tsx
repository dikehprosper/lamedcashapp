import React from "react";
import { UserDashboardDisplayProps } from "@/types";
import Link from "next/link";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import "./display.css";

const display = ({
  count,
  term,
  title,
  amount,
  style,
  data,
}: UserDashboardDisplayProps) => {
  return (
    <div
      className='user-dashboard-display-recent'
      style={{ background: style?.background }}
    >
      <div className='display-recent-1'>
        <h2 className='display-recent-1-h1'>Pending {style?.icon}</h2>
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
            {title} montant dû:
          </p>
          <p>
            XOF &nbsp;
            {formatNumberWithCommasAndDecimal(amount)}
          </p>
        </span>
        <Link
          href={term === 1 ? "/deposit" : "/withdraw"}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
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
