/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./subadminWithdrawalDashboard.css";
import SubadminHead from "@/components/(subadminhead)/subadminHead";
import { FaCheckCircle } from "react-icons/fa";
import SubadminWithdrawDashboardDisplay from "./(components)/SubadminWithdrawalDashboardDisplay";
import { LuHistory } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "@/components/(Utils)/(modals)/receiptModalSubadminDeposit";
import SubadminTransactionTemplate from "@/components/(TransactionTemplateSubadmin)/transactionTemplateSubadmin";

type ShowReceiptFunction = (
  time: string,
  amount: number,
  transactionId: string,
  identifierId: string,
  betId: string,
  status: string,
  type: string,
  username: string,
  userNumber: number
) => void;

function SubadminDepositDashboard() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [isOnline, setIsOnline] = useState(true);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getSubAdminDetails");
      setData(res.data.data);
      console.log(res.data.data);
    } catch (error: any) {
      if (error.response) {
        // Handle token expiration
        if (error.response.status === 401) {
          toast.error("Your session has expired. Redirecting to signin...");
          router.push("/signin"); // Replace '/login' with your actual login route
        } else {
          // Handle other errors
          toast.error("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        // Handle network errors (no connection)
        setIsOnline(false);
      }
    }
  };

  // Filter withdrawal transactions
  const allSuccessfulWithdrawal = data?.transactionHistory?.filter(
    (transaction: any) => transaction.status === "Successful"
  );

  const totalSuccessfulWithdrawal = allSuccessfulWithdrawal?.reduce(
    (total: any, transaction: any) => {
      return (total += transaction.amount);
    },
    0
  );

  // Filter withdrawal transactions
  const allFailedWithdrawal = data?.transactionHistory?.filter(
    (transaction: any) => transaction.status === "Failed"
  );

  const totalFailedWithdrawal = allFailedWithdrawal?.reduce(
    (total: any, transaction: any) => {
      return (total += transaction.amount);
    },
    0
  );

  useEffect(() => {
    // Check network status before making the request
    if (isOnline) {
      getUserDetails();
    } else {
      toast.error(
        "No network connection. Please check your connection and try again."
      );
    }
  }, [isOnline]);

  const [receipt, setReceipt] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const showReceipt: ShowReceiptFunction = (
    time,
    amount,
    transactionId,
    identifierId,
    betId,
    status,
    type,
    username,
    userNumber
  ) => {
    setIsVisible(true);
    setReceipt({
      time,
      amount,
      transactionId,
      identifierId,
      betId,
      status,
      username,
      userNumber,
    });
  };

  useEffect(() => {
    console.log(receipt);
  }, [receipt]);

  useEffect(() => {
    // Check initial network status
    setIsOnline(window.navigator.onLine);

    // Add event listeners for online/offline changes
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className='subadmin_dashboard_container_withdrawal'>
      {isVisible && (
        <Modal
          containerStyles='receiptModal_withdrawal'
          containerStylesInner='receiptModal_inner_withdrawal'
          handleClick={() => setIsVisible(false)}
          receipt={receipt}
          title='Montant du Retraits'
        />
      )}

      <SubadminHead
        title='Retraits'
        about='Gérez toutes les demandes d’ordres de retrait ici.'
        data={data}
      />
      <SubadminWithdrawDashboardDisplay data={data} />
      <SubadminTransactionTemplate
        totalSuccessful={totalSuccessfulWithdrawal}
        totalFailed={totalFailedWithdrawal}
        name='Retraits'
        title={{ name: "Historique des transactions", icon: <LuHistory /> }}
        select={{
          firstSelect: { big: "Voir tout", small: "All" },
          secondSelect: {
            big: "Les ordres en attente",
            small: "Pending Orders",
          },
          thirdSelect: {
            big: "Commandes réussies",
            small: "Successful Orders",
          },
          fourthSelect: { big: "Commandes échouées", small: "Failed Orders" },
        }}
        data={data?.transactionHistory}
        allData={data}
        showReceipt={showReceipt}
      />
    </div>
  );
}

export default SubadminDepositDashboard;
