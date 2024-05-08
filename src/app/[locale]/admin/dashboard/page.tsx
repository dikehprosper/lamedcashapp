/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./adminDashboard.css";
import AdminHead from "@/components/(adminHead)/adminHead";
import { FaCheckCircle } from "react-icons/fa";
import AdminDashboardDisplay from "./(components)/AdminWithdrawalDashboardDisplay";
import { LuHistory } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";
import BarsDataset from "./(components)/chart";
function Page() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [data2, setData2] = useState<any>();
  const [data3, setData3] = useState<any>();
  const [data4, setData4] = useState<any>();
  const [isOnline, setIsOnline] = useState(true);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getAllSubadminDetails");
      setData(res.data.data.user);
      setData2(res.data.data.user2);
      setData3(res.data.data.user3);
      setData4(res.data.data.user4);
      console.log(res.data.data.user4);
    } catch (error: any) {
      if (error.response) {
        // Handle token expiration
        if (error.response.status === 401) {
          toast.error(
            "Vous vous êtes connecté ailleurs. Vous devez vous reconnecter ici."
          );
          router.push("/signin");
        } else if (error.response.status === 402) {
          toast.error(
            "Votre session a expiré. Redirection vers la connexion..."
          );
          router.push("/signin");
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
    <div className='subadmin_dashboard_container_admin_admin'>
      <AdminHead
        title='Tableau de bord'
        about='Voir toutes les transactions ici'
        data={data3}
      />

      <div className='dashboard-display_admin'>
        <AdminDashboardDisplay data={data} type='1' />
        <AdminDashboardDisplay data={data2} type='2' />
        <AdminDashboardDisplay data={data4} data2={data2} data3={data} type='4' />
        <div className='subadmin_dashboard_container-display_withdrawal_admin_chart'>
          <BarsDataset data={data4} />
        </div>
      </div>
    </div>
  );
}

export default Page;
