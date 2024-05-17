/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./subadminWithdrawalTransaction.css";
import SubadminHead from "@/components/(subadminhead)/subadminHead";
import { FaCheckCircle } from "react-icons/fa";
import SubadminDepositDashboardDisplay from "./(components)/SubadminDepositDashboardDisplay";
import { LuHistory } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "@/components/(Utils)/(modals)/receiptModalSubadminDeposit";
import SubadminTransactionTemplate from "@/components/(TransactionTemplateSubadmin)/transactionTemplateSubadminTransactions";


function SubadminWithdrawalDashboard() {
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
          toast.error(
            "Vous vous êtes connecté ailleurs. Vous devez vous reconnecter ici."
          );
          router.push("/signin"); // Replace '/login' with your actual login route
        } else if (error.response.status === 402) {
          toast.error(
            "Votre session a expiré. Redirection vers la connexion..."
          );
          router.push("/signin"); // Replace '/login' with your actual login route
        } else {
          // Handle other errors
          toast.error(
            "Une erreur s'est produite. Veuillez réessayer plus tard."
          );
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

  function showReceipt(
    time,
    amount,
    transactionId,
    identifierId,
    betId,
    status,
    type,
    momoName,
    momoNumber,
    withdrawalCode
  ) {
    setIsVisible(true);
    setReceipt({
      time,
      amount,
      transactionId,
      identifierId,
      betId,
      status,
       type,
      momoName,
      momoNumber,
      withdrawalCode
    });
  };

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
    <div className='subadmin_transaction_container'>
      {isVisible && (
        <Modal
          containerStyles='receiptModal'
          containerStylesInner='receiptModal_inner'
          handleClick={() => setIsVisible(false)}
          receipt={receipt}
          title='Montant du Retraits'
        />
      )}

      <SubadminHead
        title='Transactions'
        about='Gérez toutes les demandes d’ordres de retrait ici.'
        data={data}
      />
      <SubadminTransactionTemplate
        totalSuccessful={totalSuccessfulWithdrawal}
        totalFailed={totalFailedWithdrawal}
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
         getUserDetails={getUserDetails}
      />
    </div>
  );
}

export default SubadminWithdrawalDashboard;
