"use client";
import React, { useEffect, useState } from "react";
import Head from "@/components/(userscomponent)/(head)/head";
import Display from "@/components/(userscomponent)/(display)/display";
import "./dash.css";
import { TbPigMoney } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import TransactionTemplate from "@/components/(userscomponent)/(TransactionTemplateUsers)/TransactionTemplate";
import { LuHistory } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "@/components/(Utils)/(modals)/receiptModalWithdrawal";
import io from "socket.io-client"
const Dashboard = () => {
  const router = useRouter();
  const [data, setData] = useState<any>();
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
        } else  if (error.response.status === 402) {
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




  // Filter deposit transactions
  const allDeposits = data?.transactionHistory?.filter(
    (transaction: any) => transaction.fundingType === "deposits"
  );

  const totalDeposits = allDeposits
    ?.filter((data: { status: string }) => data.status === "Successful")
    .reduce((total: any, transaction: any) => {
      return (total += transaction.amount);
    }, 0);

  // Filter withdrawal transactions
  const allWithdrawals = data?.transactionHistory?.filter(
    (transaction: any) => transaction.fundingType === "withdrawals"
  );

  const totalWithdrawals = allWithdrawals
    ?.filter((data: { status: string }) => data.status === "Successful")
    .reduce((total: any, transaction: any) => {
      return (total += transaction.amount);
    }, 0);

  // Filter deposit transactions with status "pending"
  const pendingDeposits = data?.transactionHistory.filter(
    (transaction: any) =>
      transaction.fundingType === "deposits" && transaction.status === "Pending"
  );


  // Filter withdrawal transactions with status "pending"
  const pendingWithdrawals = data?.transactionHistory?.filter(
    (transaction: any) =>
      transaction.fundingType === "withdrawals" &&
      transaction.status === "Pending"
  );

  // Calculate total cost of pending deposits

  const totalPendingDepositAmount = pendingDeposits?.reduce(
    (total: any, transaction: any) => {
      return (total += transaction.amount);
    },
    0
  );

  // Calculate total cost of pending withdrawals
  const totalPendingWithdrawalAmount = pendingWithdrawals?.reduce(
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


  const socket = io("http://localhost:5001") 

    useEffect(() => {
      socket.on("connect", () => {
        console.log(socket.id)
      })
      return () => {
socket.disconnect()
      }
    }, [])
  



  return (
    <div className='user_dashboard_container'>
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
        title='Bienvenue'
        about="Faites l'expérience de dépôts et de retraits rapides"
         data={data}
      />
      <div className='user-dashboard-display'>
        <Display
          count={pendingDeposits?.length}
          title='Dépôt'
          term={1}
          amount={totalPendingDepositAmount}
          data={data?.transactionHistory}
          allData={data}
          style={{
            color: "#658900",
            background: "rgba(101, 137, 0, 0.4)",
            icon: <TbPigMoney />,
          }}
        />
        <Display
          count={pendingWithdrawals?.length}
          term={2}
          title='Retirer'
          amount={totalPendingWithdrawalAmount}
          data={data?.transactionHistory}
          allData={data}
          style={{
            color: "#0076B8",
            background: "rgba(0, 118, 184, .4)",
            icon: <RiMoneyDollarCircleLine />,
          }}
        />
      </div>
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

export default Dashboard;
