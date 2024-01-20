/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./users.css";
import AdminHead from "@/components/(adminHead)/adminHead";
import { toast } from "react-toastify";
import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
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
      setData(res.data.data.user4);
      setData3(res.data.data.user3);
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



  const [currentValue, setCurrentValue] = useState("")
const [referrals, setReferrals] = useState([]);
const [isSubmitting, setIsSubmitting] = useState(false);

async function getReferrals(id) {
  try {
    const res = await axios.post("/api/getSpecificUserReferral", {
      referrals: id,
    });
    setReferrals(res.data.usersSuccesfulCountusers);
  } catch (error: any) {
    console.error("Error fetching referrals:", error);
    toast.error("An error occurred while fetching referrals.");
  }
}

const amountsArray = referrals?.map((obj) => obj?.SuccesfulDepositCountusers);
const totalAmount = amountsArray?.reduce(
  (acc, SuccesfulDepositCountusers) => acc + SuccesfulDepositCountusers,
  0
);

const amountsArray2 = referrals?.map(
  (obj) => obj?.SuccesfulWithdrawalCountusers
);
const totalAmount2 = amountsArray2?.reduce(
  (acc, SuccesfulWithdrawalCountusers) => acc + SuccesfulWithdrawalCountusers,
  0
);

const result = totalAmount + totalAmount2;
const threePercent = (3 / 100) * result;
const total = (5 / 100) * threePercent;
const totalCount = referrals?.length;

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


const [loading, setLoading] = useState(false);
async function changeActivationStatus(id) {

  try {
  setLoading(true);
    const res = await axios.post("/api/changeActivationStatus", { id: id });
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
  }
}

return (
  <div className='subadmin_dashboard_container_admin_admin_admin'>
    <AdminHead
      title='Tableau de bord'
      about='Voir toutes les transactions ici'
      data={data3}
    />

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
          <h3>All Users</h3>
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

            if (index === index1) {
              getReferrals(data._id);
            }

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
                    <span style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
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
                      <span className='span2'>{successfulOrders?.length}</span>
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
                        Transaction History:
                      </span>
                      <span
                        className='span2'
                        style={{
                          padding: "1px 8px",
                          borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                          borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                          padding: "0px 9px",
                          borderRadius: "5px",
                          color: "black",
                          background: "grey",
                          cursor: "pointer",
                        }}
                        onClick={() => router.push(`/admin/users/${data._id}`)}
                      >
                        view
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
                        View Referrals:
                      </span>
                      <span
                        className='span2'
                        style={{
                          padding: "1px 8px",
                          borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                          borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                          padding: "0px 9px",
                          borderRadius: "5px",
                          color: "black",
                          background: "grey",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          router.push(`/admin/users/referral/${data._id}`)
                        }
                      >
                        view
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
                        Referral Bonuses:
                      </span>{" "}
                      <span className='span2'>
                        XOF &nbsp; {formatNumberWithCommasAndDecimal(total)}
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
                        Total Referrals:
                      </span>{" "}
                      <span className='span2'>{data.referrals.length}</span>
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
                        borderTop: "1px solid rgba(128, 128, 128, 0.1)",
                        borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
                        padding: "0px 9px",
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
                            display: "flex",
                             justifyContent: "center",
                            alignItems: "center",
                          padding: "1px 8px",
                            width: "100px",
                        height: "25px",
                          border: ".3px solid rgba(128, 128, 128, 0.5)",
                          borderRadius: "5px",
                          background: data.isActivated
                            ? "rgba(128, 0, 0, 0.6)"
                            : "rgba(0, 128, 0, 0.7)",
                          cursor: "pointer",
                        }}
                           onClick={(e) => changeActivationStatus(data._id)}
                      >
                           {loading? <div id="container-deposit-1">
                        <div id="html-spinner-deposit-1"></div>
                      </div> : data.isActivated? "Deactivate" : "Activate" } 
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


