/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./adminDashboard.css";
import AdminHead from "@/components/(adminHead)/adminHead";
import { FaCheckCircle } from "react-icons/fa";
import AdminDashboardDisplay from "./(components)/adminDashboardDisplay";
import AdminDashboardDisplay1 from "./(components)/adminDashboardDisplay1";
import AdminDashboardDisplay2 from "./(components)/adminDashboardDisplay2";
import AdminDashboardDisplay3 from "./(components)/adminDashboardDisplay3";
import {LuHistory} from "react-icons/lu";
import {toast} from "react-toastify";
import axios from "axios";
import BarsDataset from "./(components)/chart";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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
    } catch (error: any) {
      if (error.response) {
        // Handle token expiration
        if (error.response.status === 401) {
          toast.error(
            "Vous vous êtes connecté ailleurs. Vous devez vous reconnecter ici."
          );
       router.replace("/signin");
        } else if (error.response.status === 403) {
          toast.error(
            "Votre session a expiré. Redirection vers la connexion..."
          );
          router.replace("/signin");
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

  const updatedTheme = useAppSelector((state) => state.theme.theme);


  return ( updatedTheme === "dark" || updatedTheme === "light" ?
    <div className='subadmin_dashboard_container_admin_admin'  style={{
        background: updatedTheme === "dark" ? "rgb(10, 20, 38)" : "white",
      }}>
      <AdminHead
        title='Tableau de bord'
        about='Voir toutes les transactions ici'
        data={data3}
        updatedTheme={updatedTheme}
      />

      <div className='dashboard-display_admin'>
        <AdminDashboardDisplay3 data3={data3} updatedTheme={updatedTheme} />
        <AdminDashboardDisplay1 data3={data3} updatedTheme={updatedTheme} />
        <AdminDashboardDisplay2 data3={data3}  updatedTheme={updatedTheme}/>
        <AdminDashboardDisplay
          data4={data4}
          data3={data3}
          updatedTheme={updatedTheme}
        />
  
          <div className='subadmin_dashboard_container-display_withdrawal_admin_chart' style={{
            justifyContent: "center", background: updatedTheme === "dark"? "rgba(128, 128, 128, 0.2" : "white", boxShadow: updatedTheme === "dark"? "" : "0px 4px 10px rgba(0, 0, 0, 0.3)", color: "red"}}>
            <BarsDataset data={data3} updatedTheme={updatedTheme}/>
          </div>
 
      </div>
    </div>: null
  );
}

export default Page;
