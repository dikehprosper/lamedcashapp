/* eslint-disable */
// @ts-nocheck
"use client";
import "../adminDashboard.css";
import DropdownContent from "@/components/(Utils)/(dropdown)/dropdownContent";
import React, {useState} from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import {AiOutlineCluster} from "react-icons/ai";
import {TbPigMoney} from "react-icons/tb";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";

export default function AdminDashboardDisplay2({data3}: any) {
      const {locale} = useParams<{locale: string}>();
       const router = useRouter();
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
  const completedWithdrawals = data3?.transactionHistory // Flatten the array of objects into an array of transactionHistory arrays
    .filter(
      (transaction: {status: string; registrationDateTime: string}) =>
        (state !== "All Time" &&
          transaction.status === "Successful" &&
          transaction.fundingType === "withdrawals" &&
          new Date(transaction.registrationDateTime) >=
            new Date(calculateStartTime())) ||
        (state === "All Time" &&
          transaction.status === "Successful" &&
          transaction.fundingType === "withdrawals")
    );

  const failedWithdrawals = data3?.transactionHistory // Flatten the array of objects into an array of transactionHistory arrays
    .filter(
      (transaction: {status: string; registrationDateTime: string}) =>
        (state !== "All Time" &&
          transaction.status === "Failed" &&
          transaction.fundingType === "withdrawals" &&
          new Date(transaction.registrationDateTime) >=
            new Date(calculateStartTime())) ||
        (state === "All Time" &&
          transaction.status === "Failed" &&
          transaction.fundingType === "withdrawals")
    );

  const pendingWithdrawals = data3?.transactionHistory // Flatten the array of objects into an array of transactionHistory arrays
    .filter(
      (transaction: {status: string}) =>
        transaction.status === "Pending" &&
        transaction.fundingType === "withdrawals"
    );

  const sum = pendingWithdrawals?.reduce(
    (acc: any, obj: any) => acc + obj.totalAmount,
    0
  );
  const sum2 = completedWithdrawals?.reduce(
    (acc: number, obj: {totalAmount: number}) => acc + Number(obj.totalAmount),
    0
  );

  const sum3 = failedWithdrawals?.reduce(
    (acc: number, obj: {totalAmount: number}) => acc + Number(obj.totalAmount),
    0
  );

   const handleClick = () => {
    router.push({
      pathname: `/${locale}/admin/dashboard/pendingtransaction`,
      query: { data: JSON.stringify(data3) }
    });
  };
  return (
    <div className='subadmin_dashboard_container-display_withdrawal_admin'>
      {data3 ? (
        <div
          className='subadmin_dashboard_container-display-children_withdrawal_admin animate-pop-in'
          style={{
            background: "rgba(128, 128, 128, 0.2)",
          }}
        >
          <div className='display-body-300_withdrawal_admin'>
            <div className='card-icon'>
              <TbPigMoney fontSize='20px' />
            </div>
                 <div className='dropdown-content-configure' onClick={() => router.push(`/${locale}/admin/dashboard/pendingtransaction`)}>
                  
                   See All 
            </div> 
          </div>
        
          <h3 className='admin-card-title'>Pending Withdrawals</h3>

          {loading ? (
            <div id='container_deposit_display_withdrawal_admin'>
              <div id='container_deposit_display_inner_withdrawal_admin'></div>
            </div>
          ) : (
            <>
              <h1 className='animate-pop-in'>{pendingWithdrawals?.length}</h1>
              <h4 className='animate-pop-in card-price'>
                XOF &nbsp;
                {formatNumberWithCommasAndDecimal(sum)}
              </h4>
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

      {data3 ? (
        <div
          className='subadmin_dashboard_container-display-children_withdrawal_admin animate-pop-in'
          style={{
            background: "rgba(128, 128, 128, 0.2)",
          }}
        >
          <div
            className='display-body-300_withdrawal_admin'
            style={{zIndex: "999"}}
          >
            <div className='card-icon'>
              <AiOutlineCluster fontSize='20px' />
            </div>
            <div>
              <DropdownContent
                state={state}
                select={select}
                setState={setState}
                setLoading={setLoading}
              />
            </div>
          </div>
          <h3 className='admin-card-title'>Completed Withdrawals</h3>
          {loading ? (
            <div id='container_deposit_display_withdrawal_admin'>
              <div id='container_deposit_display_inner_withdrawal_admin'></div>
            </div>
          ) : (
            <>
              <h1 className='animate-pop-in'>{completedWithdrawals?.length}</h1>

              <h4 className='animate-pop-in card-price'>
                XOF &nbsp;
                {formatNumberWithCommasAndDecimal(sum2)}
              </h4>
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
      {data3 ? (
        <div
          className='subadmin_dashboard_container-display-children_withdrawal_admin animate-pop-in'
          style={{
            background: "rgba(128, 128, 128, 0.2)",
            display: "flex",
          }}
        >
          <>
            <div
              className='display-body-300_withdrawal_admin'
              style={{zIndex: "7000000"}}
            >
              <div className='card-icon'>
                <AiOutlineCluster fontSize='20px' />
              </div>
              <div className='admin-drop'>
                <DropdownContent
                  state={state}
                  select={select}
                  setState={setState}
                  setLoading={setLoading}
                />
              </div>
            </div>
            <h3 className='admin-card-title'>Failed Withdrawals</h3>
            {loading ? (
              <div id='container_deposit_display_withdrawal_admin'>
                <div id='container_deposit_display_inner_withdrawal_admin'></div>
              </div>
            ) : (
              <>
                <h1 className='animate-pop-in'>{failedWithdrawals?.length}</h1>
                <h4 className='animate-pop-in card-price'>
                  XOF &nbsp;
                  {formatNumberWithCommasAndDecimal(sum3)}
                </h4>
              </>
            )}
          </>
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
