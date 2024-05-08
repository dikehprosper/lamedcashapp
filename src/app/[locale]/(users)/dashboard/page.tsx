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
import io from "socket.io-client";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUser } from "@/lib/features/userSlice";

const Dashboard = () => {
  const data = useAppSelector((state: any) => state.user.value);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const [data, setData] = useState<any>();
  const [isOnline, setIsOnline] = useState(true);
  const t = useTranslations("dashboard");

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getUser");
      dispatch(setUser(res.data.data));
    } catch (error: any) {
      if (error.response) {
        // Handle token expiration
        if (error.response.status === 401) {
          toast.error(t("token_expired") as string);
          router.push("/signin"); // Replace '/login' with your actual login route
        } else if (error.response.status === 402) {
          toast.error(t("session_expired") as string);
          router.push("/signin"); // Replace '/login' with your actual login route
        } else if (error.response.status === 404) {
          toast.error(t("account_disabled") as string);
          router.push("/signin"); // Replace '/login' with your actual login route
        } else {
          // Handle other errors
          toast.error(t("unknown_error"));
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

  // useEffect(() => {
  //   // Check initial network status
  //   setIsOnline(window.navigator.onLine);

  //   // Add event listeners for online/offline changes
  //   const handleOnline = () => setIsOnline(true);
  //   const handleOffline = () => setIsOnline(false);

  //   window.addEventListener("online", handleOnline);
  //   window.addEventListener("offline", handleOffline);

  //   // Clean up event listeners on component unmount
  //   return () => {
  //     window.removeEventListener("online", handleOnline);
  //     window.removeEventListener("offline", handleOffline);
  //   };
  // }, []);

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
      withdrawalCode,
    });
  }
  const [button, setButton] = useState(false);

  // const socket = io();
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log(socket.id);
  //   });

  //   socket.on("responseEvent", (data) => {
  //     setButton(true);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const sendEvent = () => {
  //   socket.emit("myevent", "a", "b", (response) => {
  //     setButton(true)
  //   } );
  // };

  return (
    <div className="user_dashboard_container">
      {isVisible && (
        <Modal
          containerStyles="receiptModal"
          containerStylesInner="receiptModal_inner"
          handleClick={handleClick}
          receipt={receipt}
          title={t("deposit_amount")}
        />
      )}
      {/* <div onClick={sendEvent}>click</div>
    {button && (
      <div style={{ width: "40px", height: "40px" }}>clickiiiiiii</div>
    )} */}
      <Head title={t("welcome_title")} about={t("welcome_about")} data={data} />

      <div className="user-dashboard-display">
        <Display
          count={pendingDeposits?.length}
          title={t("deposit")}
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
          term={2}
          title={t("withdraw")}
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
        title={{ name: t("transaction_history"), icon: <LuHistory /> }}
        select={{
          firstSelect: { big: t("see_all"), small: "Tout" },
          secondSelect: { big: t("see_deposits"), small: t("deposit") },
          thirdSelect: { big: t("see_withdrawals"), small: t("withdraw") },
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
