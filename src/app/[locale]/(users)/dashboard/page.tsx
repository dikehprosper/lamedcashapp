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
import Modal from "@/components/(Utils)/(modals)/receiptModalForUsers";
import io from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUser } from "@/lib/features/userSlice";
import image from "../../../../../public/arrow-next-svgrepo-com.svg";
import image2 from "../../../../../public/arrow-prev-svgrepo-com.svg";
import Image from "next/image";
import langDataEn from "@/messages/en.json";
import langDataFr from "@/messages/fr.json";
import Cookies from "js-cookie";

const Dashboard = () => {
   const data = useAppSelector((state: any) => state.user.value);

  // const data = data1.user
    const transactions = useAppSelector((state: any) => state.user.pendingTransactions);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const [transactions , setTransactions] = useState<any>();
  const [isOnline, setIsOnline] = useState(true);



  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getUser");
      dispatch(setUser(res.data.data));
  
    } catch (error: any) {
      if (error.response) {
        // Handle token expiration
        if (error.response.status === 401) {
          // console.log("1")
          toast.error(t.dashboard.token_expired as string);
          router.push(`/${updatedLang}/signin`); // Replace '/login' with your actual login route
        } else if (error.response.status === 402) {
            //  console.log("2")
          toast.error(t.dashboard.session_expired as string);
          router.push(`/${updatedLang}/signin`); // Replace '/login' with your actual login route
        } else if (error.response.status === 404) {
            //  console.log("3")
          toast.error(t.dashboard.account_disabled as string);
          router.push(`/${updatedLang}/signin`); // Replace '/login' with your actual login route
        } else {
            //  console.log("4")
          // Handle other errors
          toast.error(t.dashboard.unknown_error);
        }
      } else if (error.request) {
          //  console.log("5")
        // Handle network errors (no connection)
        setIsOnline(false);
      }
    }
  }

  useEffect(() => {
    // Check network status before making the request
    if (isOnline) {
      getUserDetails();
    } else {
      toast.error(
        "No network connection. Please check your connection and try again."
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    ?.filter((data: {status: string}) => data.status === "Successful")
    .reduce((total: any, transaction: any) => {
      return (total += parseFloat(transaction.totalAmount));
    }, 0);

  // Filter withdrawal transactions
  const allWithdrawals = data?.transactionHistory?.filter(
    (transaction: any) => transaction.fundingType === "withdrawals"
  );

  const totalWithdrawals = allWithdrawals
    ?.filter((data: {status: string}) => data.status === "Successful")
    .reduce((total: any, transaction: any) => {
      return (total += parseFloat(transaction.totalAmount));
    }, 0);

 

  // Filter withdrawal transactions with status "pending"
  const pendingWithdrawals = data?.transactionHistory?.filter(
    (transaction: any) => transaction.fundingType === "withdrawals" && transaction.status === "Pending"
  );

   const pendingDeposits = data?.transactionHistory?.filter(
    (transaction: any) => transaction.fundingType === "deposits" && transaction.status === "Pending"
  );



// Calculate total cost of pending withdrawals
function parseAmount(amount: any): number {
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount)) {
    return 0;
  }
  return parsedAmount;
}

let totalPendingWithdrawalAmount = 0;
if (pendingWithdrawals) {
  for (const transaction of pendingWithdrawals) {
    // console.log(transaction.totalAmount);
    totalPendingWithdrawalAmount += parseAmount(transaction.totalAmount);
  }
}



// Calculate total cost of pending deposits


 let totalPendingDepositAmount = 0;
if (pendingDeposits) {
  for (const transaction of pendingDeposits) {
    // console.log(transaction.totalAmount);
    totalPendingDepositAmount += parseAmount(transaction.totalAmount);
  }
}

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
      withdrawalCode,
    });
  }
  const [button, setButton] = useState(false);


  const updatedTheme = useAppSelector(
    (state: any) => (state.theme as any)?.theme
  );
        //Language settings
const getCurrentLangFromPath = () => {
  if (typeof window !== "undefined") {
  const currentPath = window.location.pathname; // Use window.location.pathname instead of router.asPath
  const currentLang = currentPath.split("/")[1]; // Extract the first part of the path
  return currentLang === "fr" || currentLang === "en" ? currentLang : "fr"; }
};

useEffect(() => {
  const currentLang = getCurrentLangFromPath();

  // Check if the cookie is already set to the current language in the path
  const cookieLang = Cookies.get("locale");

  if (cookieLang !== currentLang) {
    // If the cookie is not set to the current language, update the cookie
    Cookies.set("locale", currentLang, { expires: 365 }); // Set cookie to last 1 year
  }
}, [window.location.pathname]); // Update dependency to window.location.pathname

const updatedLang = getCurrentLangFromPath(); 

   const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };

  const t = getLangData();
 


  
  return (updatedTheme === "dark" || updatedTheme === "light" && updatedLang === "en" || updatedLang === "fr" ?
    <div className="user_dashboard_container"  style={{
          background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white",
        }}>
      {isVisible && (
        <Modal
          containerStyles="receiptModal"
          containerStylesInner="receiptModal_inner"
          handleClick={handleClick}
          receipt={receipt}
          title={t.dashboard.deposit_amount}
          updatedTheme={updatedTheme}
          t={t.dashboard}
        />
      )}
      {/* <div onClick={sendEvent}>click</div>
    {button && (
      <div style={{ width: "40px", height: "40px" }}>clickiiiiiii</div>
    )} */}
      <Head title={t.dashboard.welcome_title}  data={data} display={true} updatedTheme={updatedTheme} t={t.dashboard.copy} />
      
  <div className="marquee">
      
      <div className="marqueeInner">
        <span className="marqueeText" style={{color: 
              updatedTheme === "dark"
              ? "white" : updatedTheme === "light"? "black"
              : "transparent"}}>{t.dashboard.marque_text}</span>
      </div>
      <Image
          src={image2}
          style={{ objectFit: "contain", borderRadius: 40, background:"rgba(73, 166, 106, 1)", position: 'absolute', left: 0 }}
          alt="background"
           width={30}
          height={50}
        />
          <Image
          src={image}
          style={{ objectFit: "contain", borderRadius: 40, background:"rgba(73, 166, 106, 1)", position: 'absolute', right: 0 }}
          alt="background"
           width={30}
          height={50}
        />
    </div>
      <div className="user-dashboard-display"  style={{boxShadow: 
              updatedTheme === "dark"
              ? "" : updatedTheme === "light"? " 0px 4px 10px rgba(0, 0, 0, .3)"
              : "transparent", background: 
              updatedTheme === "dark"
              ? "" : updatedTheme === "light"? "rgba(256, 256, 256, 1)"
              : "transparent"}}>
        <Display
             t={t}
             updatedLang={updatedLang}
          count={pendingDeposits?.length}
          title={t.dashboard.deposit}
          term={1}
          amount={totalPendingDepositAmount}
          data={data?.transactionHistory}
          allData={data}
          style={{
            color: "#ffffff",
            background: "rgba(73, 166, 106, 1)",
            icon: <TbPigMoney />,
          }}
        />
        <Display
          count={pendingWithdrawals?.length}
          t={t}
           updatedLang={updatedLang}
          term={2}
          title={t.dashboard.withdraw}
          amount={totalPendingWithdrawalAmount}
          data={data?.transactionHistory}
          allData={data}
          style={{
            color: "#C4C4C4",
            background: "rgba(120, 120, 120,1)",
            icon: <RiMoneyDollarCircleLine />,
          }}
        />
      </div>
  
      <TransactionTemplate
        title={{ name: t.dashboard.transaction_history, icon: <LuHistory /> }}
        select={{
          firstSelect: { big: t.dashboard.see_all, small: "Tout" },
          secondSelect: { big: t.dashboard.see_deposits, small: t.dashboard.deposit },
          thirdSelect: { big: t.dashboard.see_withdrawals, small: t.dashboard.withdraw },
        }}
        totalWithdrawals={totalWithdrawals}
        totalDeposits={totalDeposits}
        data={data?.transactionHistory}
        allData={data}
        showReceipt={showReceipt}
        updatedTheme={updatedTheme}
        t={t}
      />
    </div> : null
  )
};

export default Dashboard;
