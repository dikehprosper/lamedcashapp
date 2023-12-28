import React from "react";
import { UserDashboardDisplayProps } from "@/types";
import Link from "next/link";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import "./display2.css";

const display = ({
  count,
  term,
  title,
  amount,
  style,
  data,
  allData,
}: UserDashboardDisplayProps) => {
  return !allData ? (
    // Render the loading spinner when loading is true
    <div
      className='user-dashboard-display-recent '
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div id='container-signin'>
        <div id='html-spinner-signin'></div>
      </div>
    </div>
  ) : (
    // Render your content when loading is false
    <div
      className='user-dashboard-display2-recent animate-pop-in'
      style={{ background: style?.background }}
    >
      {term === 1 && (
        <div className='display-recent-1'>
          <div className='display-recent-1-h1' style={{ whiteSpace: "nowrap" }}>
            Nombre de références {style?.icon}
          </div>
          <div className='display-recent-1-h2'>
            {count === undefined ? 0 : count}
          </div>
        </div>
      )}
      {term === 2 && (
        <div className='display-recent-1'>
          <div className='display-recent-1-h1' style={{ whiteSpace: "nowrap" }}>
            {" "}
            Gains de parrainage {style?.icon}
          </div>
          <div className='display-recent-1-h2'>
            XOF &nbsp;
            {formatNumberWithCommasAndDecimal(
              amount === undefined ? 0 : amount
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default display;
