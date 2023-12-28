"use client";
import React, { useEffect, useState } from "react";
import UserNav from "@/components/(Navs)/UserNav";
import Head from "@/components/(userscomponent)/(head)/head";
import "./referrals.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { TbPigMoney } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Display from "@/components/(userscomponent)/(display)/display2";
import { usePathname } from "next/navigation";
import Referral from "@/components/(referral)/referral";
const Referrals = () => {
  const pathname = usePathname();
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

  const [active, setActive] = useState("user-referral-container2-inner5");

  return (
    <div className='user-referral-container'>
      <Head
        title='Références'
        about='Voir les parrainages gagnés ici'
        data={data}
      />

      <Referral />

      <div className='user-referral-container2'>
        <div className='user-referral-container2-inner1'>
          <div
            className='user-referral-container2-inner2'
            onClick={() => setActive("user-referral-container2-inner3")}
            style={{
              color:
                active === "user-referral-container2-inner3" ? "black" : "",
            }}
          >
            <div
              className={
                active === "user-referral-container2-inner4" ||
                active === "user-referral-container2-inner6"
                  ? "user-referral-container2-inner8"
                  : active
              }
            ></div>
            <span style={{ zIndex: "10" }}>Comment ça fonctionne</span>
          </div>
          <div
            className='user-referral-container2-inner2'
            onClick={() => setActive("user-referral-container2-inner4")}
            style={{
              color:
                active === "user-referral-container2-inner4" ? "black" : "",
            }}
          >
            <div
              className={
                active === "user-referral-container2-inner3" ||
                active === "user-referral-container2-inner5"
                  ? "user-referral-container2-inner7"
                  : active
              }
            ></div>
            <span style={{ zIndex: "10" }}>références</span>
          </div>
        </div>

        {active === "user-referral-container2-inner3" ||
        active === "user-referral-container2-inner5" ? (
          <div className='user-referral-container2-inner1-inner2'>
            <p
              style={{
                textTransform: "capitalize",
                color: "rgba(256, 256, 256, 0.7)",
              }}
            >
              <span style={{ color: "red" }}>*</span> copiez votre lien de
              parrainage et partagez-le avec vos amis
            </p>
            <p
              style={{
                textTransform: "capitalize",
                color: "rgba(256, 256, 256, 0.7)",
              }}
            >
              {" "}
              <span style={{ color: "red" }}>*</span> soyez payé jusqu'à 10 %
              sur les transactions de vos filleuls à vie
            </p>
            <p
              style={{
                textTransform: "capitalize",
                color: "rgba(256, 256, 256, 0.7)",
              }}
            >
              <span style={{ color: "red", textTransform: "capitalize" }}>
                *
              </span>{" "}
              une fois que vos gains dépassent 20000 XOF, ils sont versés sur
              votre compte de pari
            </p>
          </div>
        ) : null}

        {active === "user-referral-container2-inner4" ||
        active === "user-referral-container2-inner6" ? (
          <div className='user-referral-container2-inner1-inner'>
            <div className='user-referral-display'>
              <Display
                count={pendingDeposits?.length}
                title='Dépôt'
                term={1}
                amount={totalPendingDepositAmount}
                data={data?.transactionHistory}
                allData={data}
                style={{
                  color: "#658900",
                  background: "rgba(128, 128, 128, 0.2)",
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
                  background: "rgba(128, 128, 128, 0.2)",
                  icon: <RiMoneyDollarCircleLine />,
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Referrals;
