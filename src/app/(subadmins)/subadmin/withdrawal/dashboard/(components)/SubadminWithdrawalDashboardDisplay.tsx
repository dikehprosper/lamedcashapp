/* eslint-disable */
// @ts-nocheck
"use client";
import "../subadminWithdrawalDashboard.css";
import DropdownContent from "@/components/(Utils)/(dropdown)/dropdownContent";
import React, { useState } from "react";
import { AiOutlineCluster } from "react-icons/ai";
import { TbPigMoney } from "react-icons/tb";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";

export default function SubadminWithdrawDashboardDisplay({ data }: any) {
  const [state, setState] = useState("Today");
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
  const completedOrders = data?.transactionHistory.filter(
    (transaction: { status: string; registrationDateTime: string }) =>
      (state !== "All Time" &&
        transaction.status === "Successful" &&
        new Date(transaction.registrationDateTime) >=
          new Date(calculateStartTime())) ||
      (state === "All Time" && transaction.status === "Successful")
  );

  const openOrders = data?.transactionHistory.filter(
    (transaction: { status: string }) => transaction.status === "Pending"
  );

  const sum = openOrders?.reduce((acc: any, obj: any) => acc + obj.amount, 0);

  const sum2 = completedOrders?.reduce(
    (acc: any, obj: any) => acc + obj.amount,
    0
  );
  console.log(sum);

  return (
    <div className='subadmin_dashboard_container-display_withdrawal'>
      {data ? (
        <div className='subadmin_dashboard_container-display-children_withdrawal animate-pop-in'>
          <div className='display-body-300_withdrawal'>
            <div>
              <TbPigMoney fontSize='30px' />
            </div>{" "}
          </div>
          <h3>Open Orders</h3>
          <h1>{openOrders?.length}</h1>
          <h4>
            XOF &nbsp;
            {formatNumberWithCommasAndDecimal(sum)}
          </h4>
        </div>
      ) : (
        <div className='subadmin_dashboard_container-display-children-loading_withdrawal '>
          <div id='container_deposit_display_withdrawal'>
            <div id='container_deposit_display_inner_withdrawal'></div>
          </div>
        </div>
      )}

      {data ? (
        <div className='subadmin_dashboard_container-display-children_withdrawal animate-pop-in'>
          <div className='display-body-300_withdrawal'>
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
          <h3>Completed Orders</h3>
          {loading ? (
            <div id='container_deposit_display_withdrawal'>
              <div id='container_deposit_display_inner_withdrawal'></div>
            </div>
          ) : (
            <>
              {" "}
              <h1 className='animate-pop-in'>{completedOrders?.length}</h1>
              <h4 className='animate-pop-in'>
                XOF &nbsp;
                {formatNumberWithCommasAndDecimal(sum2)}
              </h4>
            </>
          )}
        </div>
      ) : (
        <div className='subadmin_dashboard_container-display-children-loading_withdrawal '>
          <div id='container_deposit_display_withdrawal'>
            <div id='container_deposit_display_inner_withdrawal'></div>
          </div>
        </div>
      )}
    </div>
  );
}
