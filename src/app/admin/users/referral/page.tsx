/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import "./referral.css";
import AdminHead from "@/components/(adminHead)/adminHead";
import { toast } from "react-toastify";
import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
function Page() {
  const router = useRouter();
   const pathname = usePathname();
  const [data, setData] = useState<any>();
  const [data2, setData2] = useState<any>();
  const [data3, setData3] = useState<any>();
  const [data4, setData4] = useState<any>();
  const [isOnline, setIsOnline] = useState(true);
  const [height, setHeight] = useState(0);

  const [currentValue, setCurrentValue] = useState("");
  const [loading, setLoading] = useState(false);

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
  const [index1, setIndex1] = useState();
  const [index2, setIndex2] = useState();
  function changeHeight(index) {
    setIndex1((prev) => {
      if (index === prev) {
        return null;
      } else {
        return index;
      }
    });
  }


  async function search() {
    try {
      setData(null);
      setLoading(true);
      const res = await axios.get("/api/getAllSubadminDetails");
      console.log(res);
      res.data.data.user4.map((data: any) => {
        if (data.email === currentValue) {
          setData([data]);
          console.log(data);
        }
      });
      setLoading(false);
    } catch (error: any) {
      if (error.response.status === 401) {
        setLoading(false);
        toast.error("user does not exist");
      } else {
        setLoading(false);
        toast.error("An error has occur");
      }
    }
  }



 // Extract ID from the URL
  const extractIdFromUrl = () => {
    const parts = pathname.split("/"); // Use router.asPath to get the full URL
    const lastPart = parts[parts.length - 1];
    return lastPart;
  };


    const getUserDetails = async () => {
    try {
      setLoading(true);
      const idFromUrl = extractIdFromUrl();
      console.log(idFromUrl);
      const res = await axios.post("/api/getSpecificReferral", { id: idFromUrl });
      console.log(res);
      setData(res.data.result);
        setLoading(false);
    } catch (error: any) {
      if (error.response.status === 402) {
        setLoading(false);
        toast.error("user does not exist");
      } else {
        setLoading(false);
        toast.error("An error has occur");
      }
    }
  };

  


  return (
    <div className='subadmin_dashboard_container_admin_admin_admin'>
      <div className='subadmin_dashboard_container_admin_admin_admin1'>
        <div className='subadmin_dashboard_container_admin_admin_admin2'>
          <div
            style={{
              width: "100%",
              padding: "0px 10px 0px 10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <h3>
              {/* {data.fullname}  */}
              Referrals
            </h3>
          </div>
          <div
            style={{
              width: "100%",
              height: "40px",
              gap: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <input
              className='tablesearch'
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              placeholder='Input email to search for user'
            />

            <button
              style={{
                height: "100%",
                fontWeight: "bold",
                width: "70px",
                borderRadius: "5px",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={search}
            >
              Search
            </button>
          </div>
          {!data ? (
            <div className='tag-container2'>
              <div id='container_customerid'>
                <div id='container_customerid_inner'></div>
              </div>
            </div>
          ) : (
            data?.map((data, index) => {
              const openOrders = data.transactionHistory.filter(
                (transaction: { status: string }) =>
                  transaction.status === "Pending"
              );

              const totalPendingAmount = openOrders.reduce(
                (total: number, transaction: { amount: number }) =>
                  total + transaction.amount,
                0
              );

              const successfulOrders = data.transactionHistory.filter(
                (transaction: { status: string }) =>
                  transaction.status === "Successful"
              );

              const totalSuccessfulAmount = successfulOrders.reduce(
                (total: number, transaction: { amount: number }) =>
                  total + transaction.amount,
                0
              );

              const result = totalSuccessfulAmount;
              const threePercent = (3 / 100) * result;
              const total = (5 / 100) * threePercent;

              return (
                <div
                  className='subadmin_dashboard_container_admin_admin_admin5-1'
                  key={index}
                  style={{
                    height: index === index1 ? "400px" : "40px",
                    transition: "height .5s ease-out",
                  }} // Adjust the height as needed
                >
                  <div className='subadmin_dashboard_container_admin_admin_admin5'>
                    <div
                      style={{
                        width: "155px",
                        gap: "10px",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <span
                        style={{
                          minWidth: "8px",
                          maxWidth: "8px",
                          background: "rgba(128, 128, 128, 01)",
                          height: "100%",
                          borderRadius: "5px",
                        }}
                      ></span>
                      <span
                        style={{ whiteSpace: "nowrap", fontWeight: "bold" }}
                      >
                        {data.fullname}
                      </span>
                    </div>
                    <div
                      className='view-activities'
                      onClick={(e) => changeHeight(index)}
                    >
                      View Activities
                      {index === index1 ? (
                        <IoMdArrowDropup fontSize='18px' />
                      ) : (
                        <IoMdArrowDropdown fontSize='18px' />
                      )}
                    </div>
                  </div>

                  {index === index1 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px 0px",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                          borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                          padding: "0px 9px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{ fontWeight: "bold", opacity: "0.65" }}
                        >
                          Name:
                        </span>{" "}
                        <span className='span2'>{data.fullname}</span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                          borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                          padding: "0px 9px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{ fontWeight: "bold", opacity: "0.65" }}
                          className='span1'
                        >
                          Email:
                        </span>{" "}
                        <span className='span2'>{data.email}</span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                          borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                          padding: "0px 9px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{ fontWeight: "bold", opacity: "0.65" }}
                        >
                          Logged in:
                        </span>{" "}
                        <span
                          className='span2'
                          style={{ color: data.isLoggedIn ? "green" : "red" }}
                        >
                          {data.isLoggedIn ? "Yes" : "No"}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                          borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                          padding: "0px 9px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{ fontWeight: "bold", opacity: "0.65" }}
                          className='span1'
                        >
                          Successful Deposits:
                        </span>{" "}
                        <span className='span2'>
                          XOF &nbsp;{" "}
                          {formatNumberWithCommasAndDecimal(
                            totalSuccessfulAmount
                          )}
                        </span>
                      </div>
                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                          borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                          padding: "0px 9px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{ fontWeight: "bold", opacity: "0.65" }}
                        >
                          S.D Count:
                        </span>{" "}
                        <span className='span2'>
                          {successfulOrders?.length}
                        </span>
                      </div>
                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                          borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                          padding: "0px 9px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{ fontWeight: "bold", opacity: "0.65" }}
                        >
                          Pending Deposits:
                        </span>{" "}
                        <span className='span2'>
                          XOF &nbsp;{" "}
                          {formatNumberWithCommasAndDecimal(totalPendingAmount)}{" "}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                          borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                          padding: "0px 9px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{ fontWeight: "bold", opacity: "0.65" }}
                        >
                          P.D Count:
                        </span>{" "}
                        <span className='span2'>{openOrders?.length}</span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                          borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                          padding: "0px 9px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{ fontWeight: "bold", opacity: "0.65" }}
                        >
                          R.R:
                        </span>{" "}
                        <span className='span2'>
                          {" "}
                          XOF &nbsp;{formatNumberWithCommasAndDecimal(total)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
