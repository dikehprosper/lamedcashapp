/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./cashdesk.css";
import AdminHead from "@/components/(adminHead)/adminHead";
import { toast } from "react-toastify";
import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import { TiCancel } from "react-icons/ti";
function Page() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [data2, setData2] = useState<any>();
  const [data3, setData3] = useState<any>();
  const [data4, setData4] = useState<any>();
  const [isOnline, setIsOnline] = useState(true);
  const [height, setHeight] = useState(0);

  useEffect(() => {
      console.log(data2, "These are the data");
  }, [data2])

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getAllSubadminDetails");
      setData(res.data.data.user);
      console.log(res.data.data.user);
      setData2(res.data.data.user2);
      setData3(res.data.data.user3);
      setData4(res.data.data.user4);
      console.log(res.data.data.user4);
    } catch (error: any) {
      if (error.response) {
        // Handle token expiration
        if (error.response.status === 401) {
       
          toast.error("L'utilisateur n'existe pas");
          router.push("/signin");
        } else if (error.response.status === 402) {
          toast.error(
            "Votre session a expiré. Redirection vers la connexion..."
          );
          router.push("/signin");
        } else if (error.response.status === 403) {
          toast.error("Your current session has expired");
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

  function changeHeight2(index) {
    setIndex2((prev) => {
      if (index === prev) {
        return null;
      } else {
        return index;
      }
    });
  }



  const [state, setState] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  async function changeActivationStatus(id, index) {
    // Assuming index1 and index2 are defined somewhere in your code
    if (index === "index1") {
      setLoading(true);
    } else if (index === "index2") {
      setLoading1(true);
    }

    try {
      console.log(id);
      const res = await axios.post("/api/changeActivationStatus", { id: id });
      const updatedUser = res.data.updatedUser
      if(updatedUser.isActivated === true) {
  toast.success(`Successfully activated ${res.data.updatedUser.name}`);
      } else if (updatedUser.isActivated === false) {
      toast.success(`Successfully deactivated ${res.data.updatedUser.name}`);
      }
    await getUserDetails();
    } catch (error) {
      if (error.response && error.response.status === 402) {
        toast.error("User does not exist");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      // Set loading back to false, whether the request was successful or not
      setLoading(false);
      setLoading1(false);
    }
  }

  const [loading3, setLoading3] = useState();
  const [loading4, setLoading4] = useState(false);
  const [index3, setIndex3] = useState()

  async function changeAllActivationStatus(value) {
        setLoading3(value);
    try {
      const res = await axios.post("/api/changeAllActivationStatus", {
        value: value,
      });
      await getUserDetails();
      if (value === "activateAllCashdeskDeposit") {
    toast.success("Successfully activated all Cashdesk deposits")
      } else  if (value === "deactivateAllCashdeskDeposit") {
    toast.success("Successfully deactivated all Cashdesk deposits")
      }  else  if (value === "activateAllCashDeskWithdrawal") {
    toast.success("Successfully activated all Cashdesk Withdrawals")
      }  else if (value === "deactivateAllCashDeskWithdrawal") {
    toast.success("Successfully deactivated all Cashdesk Withdrawals")
      }
    } catch (error) {
      if (error.response && error.response.status === 402) {
        toast.error("User does not exist");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading3();
    }
  }

  function areActivated(data) {
    if (data?.every((item) => item.isActivated)) {
      return "true";
    } else if (data?.every((item) => !item.isActivated)) {
      return "false";
    } else {
      return "except";
    }
  }

  function areActivatedLength(data) {
     const activatedItems = data?.filter((item) => item.isActivated);
  const activatedCount = activatedItems?.length;
      return activatedCount
  }





  return (
    <div className='subadmin_dashboard_container_admin_admin_cashdesks'>
      <AdminHead
        title='Tableau de bord'
        about='Voir toutes les transactions ici'
        data={data3}
      />
      <div className='subadmin_dashboard_container_admin_admin_cashdesks1'>
       
        <div className='subadmin_dashboard_container_admin_admin_cashdesks2'>
   
 { !data ? (
            <div className='tag-container2'>
              <div id='container_customerid'>
                <div id='container_customerid_inner'></div>
              </div>
            </div>
          ) : ( 
    <>
          <div
           className="header-activate"
          >
        
            {" "}
            <h3 className='zzz1'>Deposit cashdesks</h3>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  background:
                    areActivated(data) === "false" ||
                    areActivated(data) === "except"
                      ? "rgba(0, 128, 0, 0.9)"
                      : "rgba(128, 128, 128, 0.2)",
                  pointerEvents:
                    areActivated(data) === "false" ||
                    areActivated(data) === "except"
                      ? "auto"
                      : "none",
                }}
                className='zzz3'
                onClick={() =>
                  changeAllActivationStatus("activateAllCashdeskDeposit")
                }
              >
                <span
                  style={{
                    zIndex: "10",
                    color:
                      areActivated(data) === "false" ||
                      areActivated(data) === "except"
                        ? "white"
                        : "rgba(128, 128, 128, 0.8)",
                  }}
                >

                  {loading3 === "activateAllCashdeskDeposit" ? (
                            <div id='container-deposit-1'>
                              <div id='html-spinner-deposit-1'></div>
                            </div>
                          ) :
                  "Activate All" }
                </span>
                
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    opacity: "0.6",
                    display:
                      areActivated(data) === "false" ||
                      areActivated(data) === "except"
                        ? "none"
                        : "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "10",
                  }}
                >
                  {" "}
                  <TiCancel fontSize='20px' />{" "}
                </div>
              </span>

              <span
                style={{
                  background:
                    areActivated(data) === "true" ||
                    areActivated(data) === "except"
                      ? "rgba(128, 0, 0, 0.9)"
                      : "rgba(128, 128, 128, 0.5)",
                  pointerEvents:
                    areActivated(data) === "true" ||
                    areActivated(data) === "except"
                      ? "auto"
                      : "none",
                }}
                className='zzz3'
                onClick={() =>
                  changeAllActivationStatus("deactivateAllCashdeskDeposit")
                }
              >
                <span
                  style={{
                    zIndex: "10",
                    color:
                      areActivated(data) === "true" ||
                      areActivated(data) === "except"
                        ? "white"
                        : "rgba(128, 128, 128, 0.8)",
                  }}
                >
                   {loading3 === "deactivateAllCashdeskDeposit" ? (
                            <div id='container-deposit-1'>
                              <div id='html-spinner-deposit-1'></div>
                            </div>
                          ) :
                  "Deactivate All" }
                </span>
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    opacity: "0.6",
                    display:
                      areActivated(data) === "true" ||
                      areActivated(data) === "except"
                        ? "none"
                        : "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "10",
                  }}
                >
                  {" "}
                  <TiCancel fontSize='20px' />{" "}
                </div>
              </span>
            </span>
          </div>

                    { areActivated(data) === "true" && <div className="activated" style={{ width: "97%", margin: "10px 0px", fontWeight: "bold", color: 'rgba(256, 256, 256, 0.6)', alignSelf: "center", height: "50px", border: "2px solid rgba(0, 128, 0, 0.8)", borderRadius: "5px", background: "rgba(0, 128, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center"}}> 
                    All Cashdesk Deposits are Activated</div>}

 { areActivated(data) === "except" && <div  className="activated" style={{ width: "97%", margin: "10px 0px", fontWeight: "bold", color: 'rgba(256, 256, 256, 0.6)', alignSelf: "center", height: "50px", border: "2px solid rgba(0, 128, 0, 0.8)", borderRadius: "5px", background: "rgba(0, 128, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center"}}> 
                   {areActivatedLength(data)} Cashdesk Deposits are Activated</div>}

           { areActivated(data) === "false" &&  <div  className="activated" style={{ width: "97%", margin: "10px 0px", fontWeight: "bold", color: 'rgba(256, 256, 256, 0.6)',alignSelf: "center", height: "50px", border: "2px solid rgba(128, 0, 0, 0.8)", borderRadius: "5px" , background: "rgba(128, 0, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center"}}>All Cashdesk Deposits are Deactivated</div>}


          {
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
              return (
                <div
                  className='subadmin_dashboard_container_admin_admin_cashdesks5-1'
                  key={index}
                  style={{
                    height: index === index2 ? "400px" : "40px",
                    transition: "height .5s ease-out",
                  }} // Adjust the height as needed
                >
                  <div className='subadmin_dashboard_container_admin_admin_cashdesks5'>
                    <div
                    className="activated2"
                      style={{
                        width: "155px",
                        gap: "10px",
                        height: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <span
                        style={{
                          minWidth: "8px",
                          maxWidth: "8px",
                          background: "rgba(0, 184, 128, 01)",
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
                      onClick={(e) => changeHeight2(index)}
                    >
                      View Activities
                      {index === index2 ? (
                        <IoMdArrowDropup className="view-activities1" />
                      ) : (
                        <IoMdArrowDropdown className="view-activities1" />
                      )}
                    </div>
                  </div>

                  {index === index2 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px 9px",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
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
                          border: "1px solid rgba(128, 128, 128, 0.1)",
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
                        <span className=' span2-email1 span2'>{data.email}</span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{ fontWeight: "bold", opacity: "0.65" }}
                        >
                          Funded:
                        </span>
                        <span
                          className='span2'
                          style={{ color: data.isOutOfFunds ? "rgba(128, 0, 0, 0.9)" : "rgba(0, 128, 0, 0.9)" }}
                        >
                          {data.isOutOfFunds ? "No" : "Yes"}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
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
                          style={{ color: data.isLoggedIn ? "rgba(0, 128, 0, 0.9)" : "rgba(128, 0, 0, 0.9)" }}
                        >
                          {data.isLoggedIn ? "Yes" : "No"}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
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
                          border: "1px solid rgba(128, 128, 128, 0.1)",
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
                          border: "1px solid rgba(128, 128, 128, 0.1)",
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
                          {formatNumberWithCommasAndDecimal(totalPendingAmount)}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
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
                        <span className='span2'> {openOrders?.length}</span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{ fontWeight: "bold", opacity: "0.65" }}
                        >
                          Transaction History:
                        </span>
                        <span
                          className='span2'
                          style={{
                            padding: "1px 8px",
                            border: ".3px solid rgba(128, 128, 128, 0.5)",
                            borderRadius: "5px",
                            color: "black",
                            background: "grey",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            router.push(`/admin/cashdesks/${data._id}`)
                          }
                        >
                          view
                        </span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{ fontWeight: "bold", opacity: "0.65" }}
                        >
                          Status:
                        </span>
                        <span className='span2'>
                            {data.isActivated ? "Active" : "Not Active"}
                        </span>
                      </div>

  <div
                        style={{
                          height: "33px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: "9px",
                        }}
                      >
                        <span
                          className='span2'
                          style={{
                            borderRadius: "5px",
                            color: data.isActivated
                              ? "rgba(0, 128, 0, 0.9)"
                              : "rgba(128, 0, 0, 0.9)",
                            cursor: "pointer",
                          }}
                        >
                          {data.isActivated ? "Activated" : "Deactivated"}
                        </span>{" "}
                        &nbsp; &nbsp;{" "}
                        <span
                          className='span2'
                          style={{
                            width: "100px",
                            height: "25px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "5px",
                            border: ".3px solid rgba(128, 128, 128, 0.5)",
                            cursor: "pointer",
                            background: data.isActivated
                              ? "rgba(128, 0, 0, 0.6)"
                              : "rgba(0, 128, 0, 0.7)",
                          }}
                          onClick={(e) =>
                            changeActivationStatus(data._id, "index2")
                          }
                        >
                          {loading1 ? (
                            <div id='container-deposit-1'>
                              <div id='html-spinner-deposit-1'></div>
                            </div>
                          ) : data.isActivated ? (
                            "Deactivate"
                          ) : (
                            "Activate"
                          )}
                        </span>
                      </div>







                    </div>
                  )}
                </div>
              );
            })
          }</>)}
        </div>
        <div className='subadmin_dashboard_container_admin_admin_cashdesks3'>
          {!data2 ? (
            <div className='tag-container2'>
              <div id='container_customerid'>
                <div id='container_customerid_inner'></div>
              </div>
            </div>
          ) : (
          <>
          <div
         className="header-activate"
          >
            {" "}
            <h3 className='zzz1'>Withdrawal cashdesks</h3>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  background:
                    areActivated(data2) === "false" ||
                    areActivated(data2) === "except"
                      ? "rgba(0, 128, 0, 0.9)"
                      : "rgba(128, 128, 128, 0.22)",
                  pointerEvents:
                    areActivated(data2) === "false" ||
                    areActivated(data2) === "except"
                      ? "auto"
                      : "none",
                }}
                className='zzz3'
                onClick={() =>
                  changeAllActivationStatus("activateAllCashDeskWithdrawal")
                }
              >
                <span
                  style={{
                    zIndex: "10",
                    color:
                      areActivated(data2) === "false" ||
                      areActivated(data2) === "except"
                        ? "white"
                        : "rgba(128, 128, 128, 0.5)",
                  }}
                >
                      {loading3 === "activateAllCashDeskWithdrawal" ? (
                            <div id='container-deposit-1'>
                              <div id='html-spinner-deposit-1'></div>
                            </div>
                          ) :
                  "Activate All" }

                </span>
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    opacity: "0.6",
                    display:
                      areActivated(data2) === "false" ||
                      areActivated(data2) === "except"
                        ? "none"
                        : "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "10",
                  }}
                >
                  {" "}
                  <TiCancel fontSize='20px' />{" "}
                </div>
              </span>
              <span
                style={{
                  background:
                    areActivated(data2) === "true" ||
                    areActivated(data2) === "except"
                      ? "rgba(128, 0, 0, 0.9)"
                      : "rgba(128, 128, 128, 0.22)",
                  pointerEvents:
                    areActivated(data2) === "true" ||
                    areActivated(data2) === "except"
                      ? "auto"
                      : "none",
                }}
                className='zzz3'
                onClick={() =>
                  changeAllActivationStatus("deactivateAllCashDeskWithdrawal")
                }
              >
                <span
                  style={{
                    zIndex: "10",
                    color:
                      areActivated(data2) === "true" ||
                      areActivated(data2) === "except"
                        ? "white"
                        : "rgba(128, 128, 128, 0.5)",
                  }}
                >
                   {loading3 === "deactivateAllCashDeskWithdrawal" ? (
                            <div id='container-deposit-1'>
                              <div id='html-spinner-deposit-1'></div>
                            </div>
                          ) :
                  "Deactivate All" }
                </span>
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    opacity: "0.6",
                    display:
                      areActivated(data2) === "true" ||
                      areActivated(data2) === "except"
                        ? "none"
                        : "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "10",
                  }}
                >
                  {" "}
                  <TiCancel fontSize='20px' />{" "}
                </div>
              </span>
            </span>
          </div>


                    { areActivated(data2) === "true" && <div  className="activated" style={{ width: "97%", margin: "10px 0px",  fontWeight: "bold", color: 'rgba(256, 256, 256, 0.6)', alignSelf: "center", height: "50px", border: "2px solid rgba(0, 128, 0, 0.8)", borderRadius: "5px", background: "rgba(0, 128, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center"}}> 
                    All Cashdesk Withdrawals are Activated</div>}

 { areActivated(data2) === "except" && <div className="activated" style={{ width: "97%", margin: "10px 0px", fontWeight: "bold", color: 'rgba(256, 256, 256, 0.6)', alignSelf: "center", height: "50px", border: "2px solid rgba(0, 128, 0, 0.8)", borderRadius: "5px", background: "rgba(0, 128, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center"}}> 
                   {areActivatedLength(data2)} Cashdesk Withdrawals are Activated</div>}

           { areActivated(data2) === "false" &&  <div className="activated" style={{ width: "97%", margin: "10px 0px", fontWeight: "bold", color: 'rgba(256, 256, 256, 0.6)',alignSelf: "center", height: "50px", border: "2px solid rgba(128, 0, 0, 0.8)", borderRadius: "5px" , background: "rgba(128, 0, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center"}}>All Cashdesk Withdrawals are Deactivated</div>}



          {
            data2?.map((data, index) => {
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
              return (
                <div
                  className='subadmin_dashboard_container_admin_admin_cashdesks5-1'
                  key={index}
                  style={{
                    height: index === index1 ? "400px" : "40px",
                    transition: "height .5s ease-out",
                  }} // Adjust the height as needed
                >
                  <div
                    className='subadmin_dashboard_container_admin_admin_cashdesks5'
                    key={index}
                  >
                    <div
                      className='activated2'
                      style={{
                        width: "155px",
                        gap: "10px",
                        height: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <span
                        style={{
                          minWidth: "8px",
                          maxWidth: "8px",
                          background: "rgba(0, 128, 184, 01)",
                          height: "100%",
                          borderRadius: "5px",
                        }}
                      ></span>
                      <span style={{whiteSpace: "nowrap", fontWeight: "bold"}}>
                        {data.fullname}
                      </span>
                    </div>
                    <div
                      className='view-activities'
                      onClick={(e) => changeHeight(index)}
                    >
                      View Activities &nbsp;
                      {index === index1 ? (
                        <IoMdArrowDropup className='view-activities1' />
                      ) : (
                        <IoMdArrowDropdown className='view-activities1' />
                      )}
                    </div>
                  </div>

                  {index === index1 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px 9px",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{fontWeight: "bold", opacity: "0.65"}}
                        >
                          Name:
                        </span>{" "}
                        <span className='span2'>{data.fullname}</span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{fontWeight: "bold", opacity: "0.65"}}
                          className='span1'
                        >
                          Email:
                        </span>{" "}
                        <span className='span2-email1 span2 '>
                          {data.email}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{fontWeight: "bold", opacity: "0.65"}}
                        >
                          Funded:
                        </span>
                        <span
                          className='span2'
                          style={{
                            color: data.isOutOfFunds
                              ? "rgba(128, 0, 0, 0.9)"
                              : "rgba(0, 128, 0, 0.9)",
                          }}
                        >
                          {data.isOutOfFunds ? "No" : "Yes"}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{fontWeight: "bold", opacity: "0.65"}}
                        >
                          Logged in:
                        </span>{" "}
                        <span
                          className='span2'
                          style={{
                            color: data.isLoggedIn
                              ? "rgba(0, 128, 0, 0.9)"
                              : "rgba(128, 0, 0, 0.9)",
                          }}
                        >
                          {data.isLoggedIn ? "Yes" : "No"}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{fontWeight: "bold", opacity: "0.65"}}
                          className='span1'
                        >
                          Successful Withdrawals:
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
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{fontWeight: "bold", opacity: "0.65"}}
                        >
                          S.W Count:
                        </span>{" "}
                        <span className='span2'>
                          {successfulOrders?.length}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{fontWeight: "bold", opacity: "0.65"}}
                        >
                          Pending Withdrawals:
                        </span>{" "}
                        <span className='span2'>
                          XOF &nbsp;{" "}
                          {formatNumberWithCommasAndDecimal(totalPendingAmount)}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{fontWeight: "bold", opacity: "0.65"}}
                        >
                          P.W Count:
                        </span>{" "}
                        <span className='span2'>{openOrders?.length}</span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{fontWeight: "bold", opacity: "0.65"}}
                        >
                          Transaction History:
                        </span>
                        <span
                          className='span2'
                          style={{
                            padding: "1px 8px",
                            border: ".3px solid rgba(128, 128, 128, 0.5)",
                            borderRadius: "5px",
                            color: "black",
                            background: "grey",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setState(true);
                            router.push(`/admin/cashdesks/${data._id}`);
                          }}
                        >
                          view
                        </span>
                      </div>

                      <div
                        style={{
                          height: "25px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className='span1'
                          style={{fontWeight: "bold", opacity: "0.65"}}
                        >
                          Status:
                        </span>
                        <span className='span2'>
                          {data.isActivated ? "Active" : "Not Active"}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "33px",
                          width: "100%",
                          border: "1px solid rgba(128, 128, 128, 0.1)",
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: "9px",
                        }}
                      >
                        <span
                          className='span2'
                          style={{
                            borderRadius: "5px",
                            color: data.isActivated
                              ? "rgba(0, 128, 0, 0.9)"
                              : "rgba(128, 0, 0, 0.9)",
                            cursor: "pointer",
                          }}
                        >
                          {data.isActivated ? "Activated" : "Deactivated"}
                        </span>{" "}
                        &nbsp; &nbsp;{" "}
                        <span
                          className='span2'
                          style={{
                            width: "100px",
                            height: "25px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "5px",
                            border: ".3px solid rgba(128, 128, 128, 0.5)",
                            cursor: "pointer",
                            background: data.isActivated
                              ? "rgba(128, 0, 0, 0.6)"
                              : "rgba(0, 128, 0, 0.7)",
                          }}
                          onClick={(e) =>
                            changeActivationStatus(data._id, "index1")
                          }
                        >
                          {loading ? (
                            <div id='container-deposit-1'>
                              <div id='html-spinner-deposit-1'></div>
                            </div>
                          ) : data.isActivated ? (
                            "Deactivate"
                          ) : (
                            "Activate"
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          }
          </>)}
        </div>

      </div>
    </div>
  );
}

export default Page;
