/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import { UserDashboardDisplayProps } from "@/types";
import Link from "next/link";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import "./display.css";

const Display = ({
  count,
  term,
  title,
  amount,
  style,
  data,
  allData,
  t,
   updatedLang
}: any) => {

 
  return !allData ? (
    // Render the loading spinner when loading is true
    <div
      className="user-dashboard-display-recent "
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div id="container-signin">
        <div id="html-spinner-signin"></div>
      </div>
    </div>
  ) : (
    // Render your content when loading is false
    <div
      className="user-dashboard-display-recent animate-pop-in"
      style={{ background: style?.background, position: "relative" }}
    >
      <div className="display-recent-1">
        <h2 className="display-recent-1-h1">Pending {style?.icon}</h2>
        <h1 className="display-recent-1-h2">
          {count === undefined ? 0 : count}
        </h1>
      </div>
      <div className="display-recent-2">
        <span>
          <p
            style={{
              fontWeight: "600",
              marginBottom: "5px",
              color: style?.color,
              paddingTop: "20px",
            }}
          >
            {title} {t.dashboard.amount}:
          </p>
          <p>
             {title === "Dépôt" ?   `XOF 
            ${formatNumberWithCommasAndDecimal(
              amount === undefined ? 0 : amount
            )}`: ` XOF ${formatNumberWithCommasAndDecimal(
               amount === undefined ? 0 : amount
          )}` }
          
          </p>
        </span>
        <Link
          href={term === 1 ? `/${updatedLang}/deposit` : `/${updatedLang}/withdraw`}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <span
            style={{
              background: style?.color,
              color:
                title === t.dashboard.deposit ? "rgba(73, 166, 106, 1)" : "#ffffff",
            }}
            className="display-recent-2-title"
          >
            {title}
          </span>
        </Link>
      </div>
     
    </div>
  );
};

export default Display;
