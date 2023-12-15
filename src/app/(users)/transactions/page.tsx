"use client";
import React, { useState, useEffect } from "react";
import "./transactionPage.css";
import Head from "@/components/(userscomponent)/(head)/head";
import TransactionTemplate from "@/components/(userscomponent)/(TransactionTemplateUsers)/TransactionTemplate";
import { LuHistory } from "react-icons/lu";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Modal from "@/components/(Utils)/(modals)/receiptModalWithdrawal";
const Transactions = () => {
    const router = useRouter();
  const [data, setData] = useState<any>();
  // Filter deposit transactions
  const allDeposits = data?.transactionHistory?.filter(
    (transaction: any) => transaction.fundingType === "deposits"
  );
  
    const [isOnline, setIsOnline] = useState(true);

    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/getUser");
        setData(res.data.data);
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
            toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.");
          }
        } else if (error.request) {
          // Handle network errors (no connection)
          setIsOnline(false);
        }
      }
    };

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

  const totalDeposits = allDeposits?.filter((data: { status: string; } )=> data.status === "Successful").reduce((total: any, transaction: any) => {
    return (total += transaction.amount);
  }, 0);

  // Filter withdrawal transactions
  const allWithdrawals = data?.transactionHistory?.filter(
    (transaction: any) => transaction.fundingType === "withdrawals"
  );

  const totalWithdrawals = allWithdrawals?.filter((data: { status: string; } )=> data.status === "Successful").reduce(
    (total: any, transaction: any) => {
      return (total += transaction.amount);
    },
    0
  );

    const [receipt, setReceipt] = useState({});
  const [isVisible, setIsVisible] = useState(false);


   const handleClick = () => {
    setIsVisible(false);
  };

     function showReceipt(
    time: any,
    amount: any,
    identifierId: any,
    betId: any,
    status: any,
    type: any,
    momoName: any,
    momoNumber: any,
    withdrawalCode: any
  ) {
    setIsVisible(true);
    setReceipt({
      time,
      amount,
      identifierId,
      betId,
      status,
       type,
      momoName,
      momoNumber,
      withdrawalCode
    });
  };

  return (
    <div className='transactionPage_container'>
        {isVisible && (
        <Modal
          containerStyles='receiptModal'
          containerStylesInner='receiptModal_inner'
          handleClick={handleClick}
          receipt={receipt}
          title='Montant du dépôt'
        />
      )}
      <Head
        title='Transactions'
        about="Afficher et suivre l'historique de vos transactions"
         data={data}
      />
      <TransactionTemplate
        title={{ name: "Historique des Transactions", icon: <LuHistory /> }}
        select={{
          firstSelect: { big: "Voir tout", small: "Tout" },
          secondSelect: { big: "Voir les Dépôts", small: "Dépôts" },
          thirdSelect: { big: "Afficher les Retraits", small: "Retraits" },
        }}
        totalWithdrawals={totalWithdrawals}
        totalDeposits={totalDeposits}
        data={data?.transactionHistory}
        allData={data}
          showReceipt={showReceipt}
      />
    </div>
  );
};

export default Transactions;
