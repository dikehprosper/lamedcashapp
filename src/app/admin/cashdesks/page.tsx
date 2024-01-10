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

  return (
    <div className='subadmin_dashboard_container_admin_admin_cashdesks'>
      <AdminHead
        title='Tableau de bord'
        about='Voir toutes les transactions ici'
        data={data3}
      />

      <div className='subadmin_dashboard_container_admin_admin_cashdesks1'>
        <div className='subadmin_dashboard_container_admin_admin_cashdesks2'>
          <h3>Deposit cashdesks</h3>

          {!data ? (
            <div className='tag-container2'>
              <div id='container_customerid'>
                <div id='container_customerid_inner'></div>
              </div>
            </div>
          ) : (
            data?.map((data, index) => {
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
                  {index === index2 && "hbjnknbnknbkgff"}
                </div>
              );
            })
          )}
        </div>
        <div className='subadmin_dashboard_container_admin_admin_cashdesks3'>
          <h3>Withdrawal cashdesks</h3>

          {!data2 ? (
            <div className='tag-container2'>
              <div id='container_customerid'>
                <div id='container_customerid_inner'></div>
              </div>
            </div>
          ) : (
            data2?.map((data, index) => {
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
