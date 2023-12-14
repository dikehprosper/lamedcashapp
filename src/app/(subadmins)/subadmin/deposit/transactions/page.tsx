/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./subadminDepositTransaction.css";
import SubadminHead from "@/components/(subadminhead)/subadminHead";
import { FaCheckCircle } from "react-icons/fa";
import SubadminDepositDashboardDisplay from "./(components)/SubadminDepositDashboardDisplay";
import { LuHistory } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "@/components/(Utils)/(modals)/receiptModalSubadminDeposit";
import SubadminTransactionTemplate from "@/components/(TransactionTemplateSubadmin)/transactionTemplateSubadminTransactions";

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

  // Filter deposit transactions
  const allSuccessfulDeposit = data?.transactionHistory?.filter(
    (transaction: any) => transaction.status === "Successful"
  );

  const totalSuccessfulDeposit = allSuccessfulDeposit?.reduce(
    (total: any, transaction: any) => {
      return (total += transaction.amount);
    },
    0
  );

  // Filter withdrawal transactions
  const allFailedDeposits = data?.transactionHistory?.filter(
    (transaction: any) => transaction.status === "Failed"
  );

  const totalFailedDeposits = allFailedDeposits?.reduce(
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
    <div className='subadmin_transaction_container'>
      {isVisible && (
        <Modal
          containerStyles='receiptModal'
          containerStylesInner='receiptModal_inner'
          handleClick={() => setIsVisible(false)}
          receipt={receipt}
          title='Montant du dépôt'
        />
      )}

      <SubadminHead
        title='Transactions'
        about='Consultez, suivez et gérez les demandes d’ordre de dépôt ici'
        data={data}
      />
      <SubadminTransactionTemplate
        totalSuccessful={totalSuccessfulDeposit}
        totalFailed={totalFailedDeposits}
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
