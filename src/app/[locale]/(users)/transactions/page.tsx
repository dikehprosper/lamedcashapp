"use client";
import React, { useState, useEffect } from "react";
import "./transactionPage.css";
import Head from "@/components/(userscomponent)/(head)/head";
import TransactionTemplate from "@/components/(userscomponent)/(TransactionTemplateUsers)/TransactionTemplate";
import { LuHistory } from "react-icons/lu";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Modal from "@/components/(Utils)/(modals)/receiptModalForUsers";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUser } from "@/lib/features/userSlice";
import langDataEn from "@/messages/en.json";
import langDataFr from "@/messages/fr.json";
import Cookies from "js-cookie";
const Transactions = () => {





  const router = useRouter();
  const data = useAppSelector((state: any) => state.user.value);
  const dispatch = useAppDispatch();
  // Filter deposit transactions
  const allDeposits = data?.transactionHistory?.filter(
    (transaction: any) => transaction.fundingType === "deposits"
  );

  const [isOnline, setIsOnline] = useState(true);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getUser");
      dispatch(setUser(res.data.data));
    } catch (error: any) {
      if (error.response) {
        // Handle token expiration
        if (error.response.status === 401) {
          toast.error(
            "Vous vous êtes connecté ailleurs. Vous devez vous reconnecter ici."
          );
          router.push(`${updatedLang}/signin`); // Replace '/login' with your actual login route
        } else if (error.response.status === 402) {
          toast.error(
            "Votre session a expiré. Redirection vers la connexion..."
          );
          router.push(`${updatedLang}/signin`); // Replace '/login' with your actual login route
        } else if (error.response.status === 404) {
          toast.error("Votre compte a été désactivé");
          router.push(`${updatedLang}/signin`);
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

  const updatedTheme = useAppSelector(
    (state: any) => (state.theme as any)?.theme
  );
        //Language settings
const getCurrentLangFromPath = (): string => {
  const currentPath = window.location.pathname; // Use window.location.pathname instead of router.asPath
  const currentLang = currentPath.split("/")[1]; // Extract the first part of the path
  return currentLang === "fr" || currentLang === "en" ? currentLang : "fr"; // Default to 'fr' if not 'en' or 'fr'
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



  return ( updatedTheme === "dark" || updatedTheme === "light" && updatedLang === "en" || updatedLang === "fr" ?
    <div className="transactionPage_container" style={{
          background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white",
        }}>
      {isVisible && (
        <Modal
          containerStyles="receiptModal"
          containerStylesInner="receiptModal_inner"
          handleClick={handleClick}
          receipt={receipt}
          title={t.transaction_page.deposit_amount}
          updatedTheme={updatedTheme}
           t={t.dashboard}
        />
      )}
      <Head
        title="Transactions"
        about={t.transaction_page.about}
        data={data}
        display={false} updatedTheme={updatedTheme}
        t={t.dashboard.copy} 
      />
      <TransactionTemplate
        title={{
          name: t.transaction_page.transaction_history,
          icon: <LuHistory />,
        }}
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
    </div>: null
  );
};

export default Transactions;
