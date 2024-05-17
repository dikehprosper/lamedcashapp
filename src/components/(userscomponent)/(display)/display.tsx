"use client";
import React from "react";
import { UserDashboardDisplayProps } from "@/types";
import Link from "next/link";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import "./display.css";
import { useTranslations } from "next-intl";

const Display = ({
  count,
  term,
  title,
  amount,
  style,
  data,
  allData,
}: UserDashboardDisplayProps) => {
  const t = useTranslations("dashboard");
  console.log(allData);
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
            {title} {t("amount")}:
          </p>
          <p>
            XOF &nbsp;
            {formatNumberWithCommasAndDecimal(
              amount === undefined ? 0 : amount
            )}
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
              color:
                title === t("deposit") ? "rgba(73, 166, 106, 1)" : "#ffffff",
            }}
            className="display-recent-2-title"
          >
            {title}
          </span>
        </Link>
      </div>
      {allData.pendingDeposit.length >= 1 && title === t("deposit") && (
        <div
          style={{
            position: "absolute",
            background: "rgba(0, 0, 0, 0.7)",
            padding: "1px 5px",
            top: "3px",
            right: "14px",
            fontSize: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              fontSize: "12px",
              color: "rgba(101, 256, 0, 0.7)",
            }}
          >
            {allData.pendingDeposit.length}
          </span>{" "}
          &nbsp; &nbsp;Les transactions attendent l &apos; approbation
          &nbsp;&nbsp;
          <div className="ellipses-container">
            <div className="ellipses"></div>
            <div className="ellipses"></div>
            <div className="ellipses"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Display;
