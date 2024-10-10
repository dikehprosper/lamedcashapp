"use client";
import React, { useEffect, useState } from "react";
import "./adminHead.css";
import { toast } from "react-toastify";
import axios from "axios";
const SubadminHead = ({ title, about, data, updatedTheme }: any) => {
  const [isOutOfFunds, setIsOutOfFunds] = useState(data?.isOutOfFunds);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setIsLoading] = useState(false);

  async function outOfFundStatus() {
    if (isSubmitting) {
      return;
    }
    setIsLoading(true);
    setIsSubmitting(true);
    try {
      const response = await axios.get("/api/updateOutOfFundsStatus");
      setIsOutOfFunds(response.data.status);
      if (response.data.status === 401) {
        return toast.error("désolé, restreint par l'administrateur");
      }
      toast.success("Soumis avec succès");
    } catch (error: any) {
      return toast.error("Échec de mise à jour");
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    setIsOutOfFunds(data?.isOutOfFunds);
  }, [data?.isOutOfFunds]);

  return (
    <>
      <div className='subadmin-head-container big' >
        <div className='subadmin-title-container'>
          <h2 className='subadmin-title-container-h2' style={{color: updatedTheme === "dark"? "white": "black"}}>{title}</h2>
          <p className='subadmin-title-container-p' style={{color: updatedTheme === "dark"? "white": "black"}}>{about}</p>
        </div>
        <div className='subadmin-tag'   >
          <div className='subadmin-tag-container-admin'  style={{background: updatedTheme === "dark"? "" : "white", boxShadow: updatedTheme === "dark"? "" : "0px 4px 10px rgba(0, 0, 0, 0.3)"}}>
            <span className='subadmin-tag-container-name' style={{color: updatedTheme === "dark"? "white": "black"}}>
              {data?.fullname ? (
                data.fullname
              ) : (
                <div id='container_outoffunds'>
                  <div id='container_outoffunds_inner'></div>
                </div>
              )}
            </span>
            <span className='subadmin-tag-container-online-container-admin' style={{color: updatedTheme === "dark"? "white": "black"}}>
              En ligne{" "}
              <span className='subadmin-tag-container-online-logo-admin'> </span>{" "}
            </span>
          </div>
        </div>
      </div>

      <div className='subadmin-head-container small' >
        <div className='subadmin-tag' >
          <div className='subadmin-tag-container-admin' style={{background: updatedTheme === "dark"? "" : "white", boxShadow: updatedTheme === "dark"? "" : "0px 4px 10px rgba(0, 0, 0, 0.3)"}}>




            <span className='subadmin-tag-container-name-admin' style={{color: updatedTheme === "dark"? "white": "black"}}>
              {data?.fullname ? (
                data.fullname
              ) : (
                <div id='container_outoffunds'>
                  <div id='container_outoffunds_inner'></div>
                </div>
              )}
            
            </span>
            <span className='subadmin-tag-container-online-container-admin' style={{color: updatedTheme === "dark"? "white": "black"}}>
              En ligne{" "}
              <span className='subadmin-tag-container-online-logo-admin'> </span>{" "}
            </span>
          </div>
        </div>
        <div className='subadmin-title-container'>
          <h2 className='subadmin-title-container-h2' style={{color: updatedTheme === "dark"? "white": "black"}}>{title}</h2>
          <p className='subadmin-title-container-p' style={{color: updatedTheme === "dark"? "white": "black"}}>{about}</p>
        </div>
      </div>
    </>
  );
};

export default SubadminHead;
