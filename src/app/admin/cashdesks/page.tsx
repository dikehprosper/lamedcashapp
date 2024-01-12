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
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber"
function Page() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [data2, setData2] = useState<any>();
  const [data3, setData3] = useState<any>();
  const [data4, setData4] = useState<any>();
  const [isOnline, setIsOnline] = useState(true);
  const [height, setHeight] = useState(0);

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

  useEffect(() => {
    console.log(data);
  }, [data]);

const [state, setState] = useState(false)






  return (
    <div className='subadmin_dashboard_container_admin_admin_cashdesks'>
      <AdminHead
        title='Tableau de bord'
        about='Voir toutes les transactions ici'
        data={data3}
      />

      <div className='subadmin_dashboard_container_admin_admin_cashdesks1'>
        <div className='subadmin_dashboard_container_admin_admin_cashdesks2'>
          <div
            style={{
              width: "100%",
              padding: "0px 10px 0px 10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <h3 className="zzz1">Deposit cashdesks</h3> 
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
                  padding: "4px",
                  borderRadius: "3px",
                  background: "rgba(128, 128, 128, 0.5)",
                }}
                className="zzz2"
              >
                Activate All
              </span>{" "}
              <span
                style={{
                  padding: "4px",
                  borderRadius: "3px",
                  background: "rgba(128, 128, 128, 0.5)",
                }}
                className="zzz3"
              >
                Deactivate All
              </span>
            </span>
          </div>

          {!data ? (
            <div className='tag-container2'>
              <div id='container_customerid'>
                <div id='container_customerid_inner'></div>
              </div>
            </div>
          ) : (
            data?.map((data, index) => {

const openOrders = data.transactionHistory.filter((transaction: { status: string }) => transaction.status === "Pending");

const totalPendingAmount = openOrders.reduce(
  (total: number, transaction: { amount: number }) => total + transaction.amount,
  0
);

const successfulOrders = data.transactionHistory.filter((transaction: { status: string }) => transaction.status === "Successful");

const totalSuccessfulAmount = successfulOrders.reduce(
  (total: number, transaction: { amount: number }) => total + transaction.amount,
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
                      style={{
                        width: "155px",
                        gap: "10px",
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-between",
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
                        <IoMdArrowDropup fontSize='18px' />
                      ) : (
                        <IoMdArrowDropdown fontSize='18px' />
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
                        <span className='span2'>{data.email}</span>
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
                          style={{ color: data.isOutOfFunds ? "red" : "green" }}
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
                          style={{ color: data.isLoggedIn ? "green" : "red" }}
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
                        <span className='span2'>XOF &nbsp; {formatNumberWithCommasAndDecimal(totalSuccessfulAmount)}

                 
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
                        <span className='span2'>{successfulOrders?.length}</span>
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
                        <span className='span2'>XOF &nbsp; {formatNumberWithCommasAndDecimal(totalPendingAmount)}</span>
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
                        <span className='span2'>Active</span>
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
                            padding: "1px 8px",
                            border: ".3px solid rgba(128, 128, 128, 0.5)",
                            borderRadius: "5px",
                            background: "rgba(0, 128, 0, 0.7)",
                            cursor: "pointer",
                          }}
                        >
                          Activate
                        </span>{" "}
                        &nbsp; &nbsp;{" "}
                        <span
                          className='span2'
                          style={{
                            padding: "1px 8px",
                            border: ".3px solid rgba(128, 128, 128, 0.5)",
                            borderRadius: "5px",
                            background: "rgba(128, 0, 0, 0.6)",
                            cursor: "pointer",
                          }}
                        >
                          Deactivate
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        <div className='subadmin_dashboard_container_admin_admin_cashdesks3'>
          <div
            style={{
              width: "100%",
              padding: "0px 10px 0px 10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <h3  className="zzz1">Withdrawal cashdesks</h3>
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
                  padding: "4px",
                  borderRadius: "3px",
                  background: "rgba(128, 128, 128, 0.5)",
                }}
                 className="zzz2"
              >
                Activate All
              </span>{" "}
              <span
                style={{
                  padding: "4px",
                  borderRadius: "3px",
                  background: "rgba(128, 128, 128, 0.5)",
                }}
                 className="zzz3"
              >
                Deactivate All
              </span>
            </span>
          </div>

          {!data2 ? (
            <div className='tag-container2'>
              <div id='container_customerid'>
                <div id='container_customerid_inner'></div>
              </div>
            </div>
          ) : (
            data2?.map((data, index) => {

const openOrders = data.transactionHistory.filter((transaction: { status: string }) => transaction.status === "Pending");

const totalPendingAmount = openOrders.reduce(
  (total: number, transaction: { amount: number }) => total + transaction.amount,
  0
);

const successfulOrders = data.transactionHistory.filter((transaction: { status: string }) => transaction.status === "Successful");

const totalSuccessfulAmount = successfulOrders.reduce(
  (total: number, transaction: { amount: number }) => total + transaction.amount,
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
                      style={{
                        width: "155px",
                        gap: "10px",
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-between",
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
                      View Activities &nbsp;
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
                        <span className='span2'>{data.email}</span>
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
                          style={{ color: data.isOutOfFunds ? "red" : "green" }}
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
                          style={{ color: data.isLoggedIn ? "green" : "red" }}
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
                          Successful Withdrawals:
                        </span>{" "}
                        <span className='span2'>XOF &nbsp; {formatNumberWithCommasAndDecimal(totalSuccessfulAmount)}</span>
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
                          S.W Count:
                        </span>{" "}
                        <span className='span2'>{successfulOrders?.length}</span>
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
                          Pending Withdrawals:
                        </span>{" "}
                        <span className='span2'>XOF &nbsp; {formatNumberWithCommasAndDecimal(totalPendingAmount)}</span>
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
                          style={{ fontWeight: "bold", opacity: "0.65" }}
                        >
                          Status:
                        </span>
                        <span className='span2'>Active</span>
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
                            padding: "1px 8px",
                            border: ".3px solid rgba(128, 128, 128, 0.5)",
                            borderRadius: "5px",
                            background: "rgba(0, 128, 0, 0.7)",
                            cursor: "pointer",
                          }}
                        >
                          Activate
                        </span>{" "}
                        &nbsp; &nbsp;{" "}
                        <span
                          className='span2'
                          style={{
                            padding: "1px 8px",
                            border: ".3px solid rgba(128, 128, 128, 0.5)",
                            cursor: "pointer",
                            borderRadius: "5px",
                            background: "rgba(128, 0, 0, 0.6)",
                          }}
                        >
                          Deactivate
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
