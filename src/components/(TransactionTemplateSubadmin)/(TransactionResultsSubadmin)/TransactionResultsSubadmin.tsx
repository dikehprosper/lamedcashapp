/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import React, { useState, useEffect } from "react";
import "./transactionResultsSubadmin.css";
import { TransactionResultsSubadminProps } from "@/types";
import { FaDownload } from "react-icons/fa";
import formatNumberWithCommasAndDecimal from "../../(Utils)/formatNumber";
import Moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
const TransactionResultsSubadmin = ({
  time,
  amount,
  transactionId,
  identifierId,
  betId,
  status,
  type,
  userId,
  cashdeskId,
  isSubmitted,
  showReceipt,
  username,
  userNumber,
  momoName,
  momoNumber,
   getUserDetails,
    withdrawalCode
}: any) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isSubmittedStatus, setIsSubmittedStatus] = useState(isSubmitted);



   async function reject() {
     if (isSubmitting) {
       return;
     }
     setRejectLoading(true);
     setIsSubmitting(true);
     try {
       const info = {
         updatetype: "Failed",
         customerId: userId,
         identifierId: identifierId,
         cashdeskId: cashdeskId,
       };
       const response = await axios.post("/api/subadminTransactionUpdate", info);
       setCurrentStatus(response.data.currentTransactionSubadminStatus);
       setIsSubmittedStatus(
         response.data.currentTransactionSubadminIsSubmitted
       );
        getUserDetails()
       toast.success("Updated Successfully");
       setRejectLoading(false);
       setButtonDisabled(true);
       toggleDropdown();
     } catch (error: any) {
       toggleDropdown();
       setRejectLoading(false);
       return toast.error("Échec de mise à jour");
     } finally {
       setIsSubmitting(false);
     }
   }

 

  async function accept() {
    if (isSubmitting) {
      return;
    }
    setAcceptLoading(true);
    setIsSubmitting(true);
    try {
      const info = {
        updatetype: "Successful",
        customerId: userId,
        identifierId: identifierId,
        cashdeskId: cashdeskId,
      };
      // console.log(info)
      const response = await axios.post("/api/subadminTransactionUpdate", info);
      setCurrentStatus(response.data.currentTransactionSubadminStatus);
      setIsSubmittedStatus(response.data.currentTransactionSubadminIsSubmitted);
       getUserDetails()
      toast.success("Soumis avec succès");
      setAcceptLoading(false);
      setButtonDisabled(true);
      toggleDropdown();
    } catch (error: any) {
      toggleDropdown();
      setAcceptLoading(false);
      return toast.error("Échec de mise à jour");
    } finally {
      setIsSubmitting(false);
    }
  }



  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClick = () => {
    showReceipt(
      time,
      amount,
      transactionId,
      identifierId,
      betId,
      status,
      type,
      momoName,
      momoNumber,
      withdrawalCode
    );
  };

  return (
    <>
      <div className='mobile-time'> {formatDate(time)}</div>
      <div className='transaction_result-subadmin' >
        <span
          style={{ background: type === "deposits" ? "#658900" : "#0076B8" }}
        ></span>
        <span>{formatDate(time)}</span>
        <span className='small_device_group '>
          {" "}
          <span> XOF {formatNumberWithCommasAndDecimal(amount)}</span>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "start",
              width: "100% !important",
              flex: 1,
            }}
          >
            <span>
              <b style={{ color: "rgba(256, 256, 256, 0.4" }}>
                1xBet ID: &nbsp;
              </b>{" "}
              {betId}
            </span>
            <span className='transactionId'>
              <b style={{ color: "rgba(256, 256, 256, 0.4" }}>
               WithdrawalCode: &nbsp;
              </b>{" "}
              {withdrawalCode}
            </span>
          </span>
        </span>
        <span
          style={{
            color:
              currentStatus === "Pending"
                ? "rgba(256, 256, 256, 0.4)"
                : currentStatus === "Successful"
                ? "rgba(0, 200, 0, 1)"
                : "rgba(200, 0, 0, 1)",
          }}
        >
          {currentStatus === "Pending"
            ? "Pending"
            : currentStatus === "Successful"
            ? "Accepted"
            : "Rejected"}
        </span>
        <span>
          <span
            style={{
              background: isSubmittedStatus
                ? "rgba(128, 128, 128, 0.2)"
                : "rgba(0, 128, 0, .5)",
              pointerEvents: isSubmittedStatus ? "none" : "auto",
              color: isSubmittedStatus ? "rgba(128, 128, 128, 0.4)" : "white",
            }}
            onClick={accept}
          >
            {acceptLoading ? (
              <div id='container-result_subadmin_all'>
                <div id='html-spinner-result_subadmin_foraccept'></div>
              </div>
            ) : (
              "Accept"
            )}
          </span>
          <span
            style={{
              background: isSubmittedStatus
                ? "rgba(128, 128, 128, 0.2)"
                : "rgba(128, 0, 0, .5)",
              pointerEvents: isSubmittedStatus ? "none" : "auto",
              color: isSubmittedStatus ? "rgba(128, 128, 128, 0.4)" : "white",
            }}
        onClick={reject}
          >
            {rejectLoading ? (
              <div id='container-result_subadmin_all'>
                <div id='html-spinner-result_subadmin_forreject'></div>
              </div>
            ) : (
              "Reject"
            )}
          </span>
          <span className='download-button' onClick={handleClick}>
            <FaDownload />
          </span>
        </span>

        <span className='accepted'>
          <span
            style={{
              position: "relative",
              justifySelf: "flex-end",
              color:
                currentStatus === "Pending"
                  ? "rgba(256, 256, 256, 0.4)"
                  : currentStatus === "Successful"
                  ? "rgba(0, 200, 0, 1)"
                  : "rgba(200, 0, 0, 1)",
            }}
            onClick={toggleDropdown}
          >
            {currentStatus === "Pending"
              ? "Pending"
              : currentStatus === "Successful"
              ? "Accepted"
              : "Rejected"}
          </span>
          {isDropdownOpen && (
            <>
              <div className='displayModal1' onClick={toggleDropdown}>
                {" "}
              </div>
              <div className='displayModal2'>
                <span
                  style={{
                    background: isSubmittedStatus
                      ? "rgba(128, 128, 128, 0.2)"
                      : "rgba(0, 128, 0, .7)",
                    pointerEvents: isSubmittedStatus ? "none" : "auto",
                    color: isSubmittedStatus
                      ? "rgba(128, 128, 128, 0.4)"
                      : "white",
                  }}
                  onClick={accept}
                >
                  {acceptLoading ? (
                    <div id='container-result_subadmin_all'>
                      <div id='html-spinner-result_subadmin_foraccept'></div>
                    </div>
                  ) : (
                    "Accept"
                  )}
                </span>

                <span
                  style={{
                    background: isSubmittedStatus
                      ? "rgba(128, 128, 128, 0.2)"
                      : "rgba(128, 0, 0, .7)",
                    pointerEvents: isSubmittedStatus ? "none" : "auto",
                    color: isSubmittedStatus
                      ? "rgba(128, 128, 128, 0.4)"
                      : "white",
                  }}
                  onClick={reject}
                >
                  {rejectLoading ? (
                    <div id='container-result_subadmin_all'>
                      <div id='html-spinner-result_subadmin_forreject'></div>
                    </div>
                  ) : (
                    "Reject"
                  )}
                </span>
              </div>
            </>
          )}

          <span className='download-button2' onClick={handleClick}>
            <FaDownload />
          </span>
        </span>
      </div>
    </>
  );
};

export default TransactionResultsSubadmin;

const formatDate = (inputDate: any) => {
  const date = new Date(inputDate);
  Moment.locale("en");
  var dt = inputDate;

  const formattedDate = Moment(dt).format("DD - MM - YYYY hh:mm a");

  return formattedDate;
};
