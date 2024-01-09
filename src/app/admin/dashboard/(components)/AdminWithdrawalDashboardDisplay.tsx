/* eslint-disable */
// @ts-nocheck
"use client";
import "../adminDashboard.css";
import DropdownContent from "@/components/(Utils)/(dropdown)/dropdownContent";
import React, { useState } from "react";
import { AiOutlineCluster } from "react-icons/ai";
import { TbPigMoney } from "react-icons/tb";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";

export default function AdminDashboardDisplay({ data, type }: any) {
  const [state, setState] = useState("All Time");
  const select = ["Today", "7 days", "2 weeks", "1 month", "All Time"];
  const [loading, setLoading] = useState(false);

  // Function to calculate the start time based on the selected state
  const calculateStartTime = () => {
    if (state === "Today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today.toISOString();
    } else if (state === "7 days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0);
      return sevenDaysAgo.toISOString();
    } else if (state === "2 weeks") {
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      twoWeeksAgo.setHours(0, 0, 0, 0);
      return twoWeeksAgo.toISOString();
    } else if (state === "1 month") {
      const onemonthAgo = new Date();
      onemonthAgo.setDate(onemonthAgo.getDate() - 31);
      onemonthAgo.setHours(0, 0, 0, 0);
      return onemonthAgo.toISOString();
    } else if (state === "All Time") {
      return null;
    }
    // Default to today's start time if state is not recognized
    const defaultStartTime = new Date();
    defaultStartTime.setHours(0, 0, 0, 0);
    return defaultStartTime.toISOString();
  };

  // Filter transactions based on the calculated start time
  const completedOrders = data
    ?.flatMap((item) => item.transactionHistory) // Flatten the array of objects into an array of transactionHistory arrays
    .filter(
      (transaction: { status: string; registrationDateTime: string }) =>
        (state !== "All Time" &&
          transaction.status === "Successful" &&
          new Date(transaction.registrationDateTime) >=
            new Date(calculateStartTime())) ||
        (state === "All Time" && transaction.status === "Successful")
    );

  const failedOrders = data
    ?.flatMap((item) => item.transactionHistory) // Flatten the array of objects into an array of transactionHistory arrays
    .filter(
      (transaction: { status: string; registrationDateTime: string }) =>
        (state !== "All Time" &&
          transaction.status === "Failed" &&
          new Date(transaction.registrationDateTime) >=
            new Date(calculateStartTime())) ||
        (state === "All Time" && transaction.status === "Failed")
    );
  const openOrders = data
    ?.flatMap((item) => item.transactionHistory) // Flatten the array of objects into an array of transactionHistory arrays
    .filter(
      (transaction: { status: string }) => transaction.status === "Pending"
    );

  const totalUsers = data?.filter(
    (user: { isUser: boolean; registrationDateTime: string }) =>
      (state !== "All Time" &&
        user.isUser === true &&
        new Date(user.registrationDateTime) >=
          new Date(calculateStartTime())) ||
      (state === "All Time" && user.isUser === true)
  );

  const sum = openOrders?.reduce((acc: any, obj: any) => acc + obj.amount, 0);

  const sum2 = completedOrders?.reduce(
    (acc: any, obj: any) => acc + obj.amount,
    0
  );
  const sum3 = failedOrders?.reduce(
    (acc: any, obj: any) => acc + obj.amount,
    0
  );

  return (
    <div className='subadmin_dashboard_container-display_withdrawal_admin'>
      {data ? (
        <div className='subadmin_dashboard_container-display-children_withdrawal_admin animate-pop-in'>
          <div className='display-body-300_withdrawal_admin'>
            {type !== "4" && (
              <div>
                <TbPigMoney fontSize='30px' />
              </div>
            )}
          </div>
          <h3>
            {" "}
            {type === "1" && "Open Deposits"}
            {type === "2" && "Open Withdrawals"}
            {type === "4" && "Total Subadmins"}
          </h3>
          <h1>{openOrders?.length}</h1>
          {type !== "4" && (
            <h4>
              XOF &nbsp;
              {formatNumberWithCommasAndDecimal(sum)}
            </h4>
          )}
        </div>
      ) : (
        <div className='subadmin_dashboard_container-display-children-loading_withdrawal_admin '>
          <div id='container_deposit_display_withdrawal_admin'>
            <div id='container_deposit_display_inner_withdrawal_admin'></div>
          </div>
        </div>
      )}

      {data ? (
        <div
          className='subadmin_dashboard_container-display-children_withdrawal_admin animate-pop-in'
          style={{
            background:
              type === "1"
                ? "rgba(184, 184, 184, 0.3)"
                : "rgba(164, 184, 184, 0.3)",
          }}
        >
          <div
            className='display-body-300_withdrawal_admin'
            style={{ zIndex: "700000000" }}
          >
            <div>
              <AiOutlineCluster fontSize='30px' />
            </div>{" "}
            <div>
              <DropdownContent
                state={state}
                select={select}
                setState={setState}
                setLoading={setLoading}
              />
            </div>
          </div>
          <h3>
            {" "}
            {type === "1" && "Completed Deposits"}
            {type === "2" && "Completed Withdrawals"}{" "}
            {type === "4" && "Total Users"}
          </h3>
          {loading ? (
            <div id='container_deposit_display_withdrawal_admin'>
              <div id='container_deposit_display_inner_withdrawal_admin'></div>
            </div>
          ) : (
            <>
              {type !== "4" && (
                <h1 className='animate-pop-in'>{completedOrders?.length}</h1>
              )}
              {type === "4" && (
                <h1 className='animate-pop-in'>{totalUsers?.length}</h1>
              )}
              {type !== "4" && (
                <h4 className='animate-pop-in'>
                  XOF &nbsp;
                  {formatNumberWithCommasAndDecimal(sum2)}
                </h4>
              )}
            </>
          )}
        </div>
      ) : (
        <div className='subadmin_dashboard_container-display-children-loading_withdrawal_admin'>
          <div id='container_deposit_display_withdrawal_admin'>
            <div id='container_deposit_display_inner_withdrawal_admin'></div>
          </div>
        </div>
      )}
      {data ? (
        <div className='subadmin_dashboard_container-display-children_withdrawal_admin animate-pop-in'>
          {type !== "4" && (
            <>
              <div
                className='display-body-300_withdrawal_admin'
                style={{ zIndex: "7000000" }}
              >
                <div>
                  <AiOutlineCluster fontSize='30px' />
                </div>{" "}
                <div>
                  <DropdownContent
                    state={state}
                    select={select}
                    setState={setState}
                    setLoading={setLoading}
                  />
                </div>
              </div>
              <h3>{type == "1" ? "Failed Deposits" : "Failed Withdrawals"} </h3>
              {loading ? (
                <div id='container_deposit_display_withdrawal_admin'>
                  <div id='container_deposit_display_inner_withdrawal_admin'></div>
                </div>
              ) : (
                <>
                  {" "}
                  <h1 className='animate-pop-in'>{failedOrders?.length}</h1>
                  <h4 className='animate-pop-in'>
                    XOF &nbsp;
                    {formatNumberWithCommasAndDecimal(sum3)}
                  </h4>
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <div className='subadmin_dashboard_container-display-children-loading_withdrawal_admin '>
          <div id='container_deposit_display_withdrawal_admin'>
            <div id='container_deposit_display_inner_withdrawal_admin'></div>
          </div>
        </div>
      )}
    </div>
  );
}
