/* eslint-disable */
// @ts-nocheck
"use client";
import "../adminDashboard.css";
import DropdownContent from "@/components/(Utils)/(dropdown)/dropdownContent";
import {useRouter, usePathname, useParams} from "next/navigation";
import React, {useState} from "react";
import {AiOutlineCluster} from "react-icons/ai";
import {TbPigMoney} from "react-icons/tb";
import axios from "axios";
 import {toast} from "react-toastify";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import {FaPowerOff} from "react-icons/fa";
export default function AdminDashboardDisplay1({data3}: any) {
  const {locale} = useParams<{locale: string}>();
  const [loading, setLoading] = useState(false);
   const [loading2, setLoading2] = useState(false);
  const [deposit, setDeposit] = useState(null);
  const [withdrawal, setWithdrawal] = useState(null);

  const changeState = async (value) => {
    try {
        if (value === 1 ) {
            setLoading(true)
        } else {
            setLoading2(true)
        }
      const res = await axios.post("/api/switchPower", value);

      if (value === 1) {
       if(deposit === null && data3?.isDepositsOpen === true ) {
           toast.success("successful");
         setDeposit(false);
          setLoading(false)
       } else if(deposit === null && data3?.isDepositsOpen === false ) {
             toast.success("successful");
         setDeposit(true);
            setLoading(false)
       } else {
          toast.success("successful");
        setDeposit(prev => !prev);
           setLoading(false)
       }  
      }
    if (value === 2) {
       if(withdrawal === null && data3?.isWithdrawalsOpen === true ) {
          toast.success("successful");
         setWithdrawal(false);
          setLoading2(false)
       } else if(withdrawal === null && data3?.isWithdrawalsOpen === false ) {
        toast.success("successful");
         setWithdrawal(true);
          setLoading2(false)
       } else {
        toast.success("successful");
        setWithdrawal(prev => !prev);
         setLoading2(false)
       }  
      }
     
    } catch (error: any) {
      if (error.response) {
        // Handle token expiration
        if (error.response.status === 401) {
          toast.error("L'utilisateur n'existe pas");
          router.replace("/signin");
             setLoading(false)
           setLoading2(false)
        } else if (error.response.status === 403) {
          toast.error(
            "Votre session a expiré. Redirection vers la connexion..."
          );
             setLoading(false)
           setLoading2(false)
          router.replace("/signin");
        } else {
               setLoading(false)
           setLoading2(false)
          // Handle other errors
          toast.error(
            "Une erreur s'est produite. Veuillez réessayer plus tard."
          );
        }
      } else if (error.request) {
        // Handle network errors (no connection)
           setLoading(false)
           setLoading2(false)
        setIsOnline(false);
      }
    }
  };

  const depositColor =
    deposit === null
      ? data3?.isDepositsOpen === true
        ? "rgba(73, 166, 106, 1)"
        : "red"
      :  deposit === true ? "rgba(73, 166, 106, 1)": "red";
  const withdrawalColor =
    withdrawal === null
      ? data3?.isWithdrawalsOpen === true
        ? "rgba(73, 166, 106, 1)"
        : "red"
      : withdrawal === true ? "rgba(73, 166, 106, 1)": "red";

  return (
    <div className='subadmin_dashboard_container-display_withdrawal_admin_power'>
      {data3 ? (
        <div
          className='subadmin_dashboard_container-display-children_withdrawal_admin animate-pop-in'
          style={{
            height: "40px",
            justifyContent: "center",
            background: "rgba(128, 128, 128, 0.2)",
          }}
        >
          <div
            className='card-icon-power'
            style={{
              background: depositColor,
              justifyContent: "center",
              height: "40px",
              width: "40px",
              alignItems: "center",
              display: "flex",
              borderRadius: "25px",
              cursor: "pointer",
            }}
            onClick={() => changeState(1)}
          >
             {loading ?  <div id='container_deposit_display_withdrawal_admin'>
            <div id='container_deposit_display_inner_withdrawal_admin'></div>
          </div>:  <FaPowerOff size={20} color='white' />} 
            
          </div>
          <h3
            className='admin-card-title'
            style={{fontSize: "18px", fontWeight: "bold"}}
          >
            Deposit
          </h3>
        </div>
      ) : (
        <div className='subadmin_dashboard_container-display-children-loading_withdrawal_admin '>
          <div id='container_deposit_display_withdrawal_admin'>
            <div id='container_deposit_display_inner_withdrawal_admin'></div>
          </div>
        </div>
      )}

      {data3 ? (
        <div
          className='subadmin_dashboard_container-display-children_withdrawal_admin animate-pop-in'
          style={{
            background: "rgba(128, 128, 128, 0.2)",
            height: "40px",
            justifyContent: "center",
          }}
        >
          <div
            className='card-icon-power'
            style={{
              background: withdrawalColor,
              justifyContent: "center",
              height: "40px",
              width: "40px",
              alignItems: "center",
              display: "flex",
              borderRadius: "25px",
              cursor: "pointer",
            }}
            onClick={() => changeState(2)}
          >
           
           {loading2 ?  <div id='container_deposit_display_withdrawal_admin'>
            <div id='container_deposit_display_inner_withdrawal_admin'></div>
          </div>:  <FaPowerOff size={20} color='white' />} 
           
          </div>
          <h3
            className='admin-card-title'
            style={{fontSize: "18px", fontWeight: "bold"}}
          >
            Withdrawal
          </h3>
        </div>
      ) : (
        <div className='subadmin_dashboard_container-display-children-loading_withdrawal_admin'>
          <div id='container_deposit_display_withdrawal_admin'>
            <div id='container_deposit_display_inner_withdrawal_admin'></div>
          </div>
        </div>
      )}
    </div>
  );
}
