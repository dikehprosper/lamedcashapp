"use client";
import React, { useEffect, useState } from "react";
import "./subadminHead.css";
import { toast } from "react-toastify";
import axios from "axios";
const SubadminHead = ({ title, about, data }: any) => {
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
  },
    [data])

  useEffect(() => {
    setIsOutOfFunds(data?.isOutOfFunds);
  },
    [data?.isOutOfFunds])

  return (
    <>
      <div className='subadmin-head-container big'>
        <div className='subadmin-title-container'>
          <h2 className='subadmin-title-container-h2'>{title}</h2>
          <p className='subadmin-title-container-p'>{about}</p>
        </div>
        <div className='subadmin-tag'>
          <div className='subadmin-tag-container'>
            <span className='subadmin-tag-container-name'>
              {data?.fullname ? (
                data.fullname
              ) : (
                <div id='container_outoffunds'>
                  <div id='container_outoffunds_inner'></div>
                </div>
              )}
            </span>
            <span className='subadmin-tag-container-online-container'>
              En ligne{" "}
              <span className='subadmin-tag-container-online-logo'> </span>{" "}
            </span>
            <span
              className='subadmin-tag-container-id'
              onClick={outOfFundStatus}
            >
              {loading ? (
                <div id='container_outoffunds'>
                  <div id='container_outoffunds_inner'></div>
                </div>
              ) : !data ? (
                <div id='container_outoffunds'>
                  <div id='container_outoffunds_inner'></div>
                </div>
              ) : (
                <>{isOutOfFunds ? "Funded" : "Out Of Funds"} </>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className='subadmin-head-container small'>
        <div className='subadmin-tag'>
          <span className='subadmin-tag-container-id' onClick={outOfFundStatus}>
            {loading ? (
              <div id='container-result_subadmin_all'>
                <div id='container_outoffunds_inner'></div>
              </div>
            ) : !data ? (
              <div id='container_outoffunds'>
                <div id='container_outoffunds_inner'></div>
              </div>
            ) : (
              <>{isOutOfFunds ? "Funded" : "Out Of Funds"} </>
            )}
          </span>
        </div>
        <div className='subadmin-title-container'>
          <h2 className='subadmin-title-container-h2'>{title}</h2>
          <p className='subadmin-title-container-p'>{about}</p>
        </div>
      </div>
    </>
  );
};

export default SubadminHead;
