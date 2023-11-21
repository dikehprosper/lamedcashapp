"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./deposit.css";
import Head from "@/components/(userscomponent)/(head)/head";
import { FaCircle } from "react-icons/fa";
import FooterMobile from "@/components/(Utils)/FooterMobile";

const Deposit = () => {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({
    betId: "",
    network: "",
    amount: "",
    ussdCode: "",
  });

  const handleChangeId = (event: any) => {
    setUser({
      ...user,
      betId: event.target.value,
    });
  };

  const handleChangeNetwork = (event: any) => {
    setUser({
      ...user,
      network: event.target.value,
    });
  };

  const handleChangeAmount = (event: any) => {
    setUser({
      ...user,
      amount: event.target.value,
    });
  };

  const handleUssdCode = (event: any) => {
    setUser({
      ...user,
      ussdCode: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    console.log(user);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    toast.success("Withdrawal request submitted!");
  };

  //check email and password state to determine ButtonDisabled state
  useEffect(() => {
    if (user.betId && user.ussdCode && user.amount && user.network) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const savedID = [267898789, 87678767];
  return (
    <div className='user_withdraw_container'>
      <Head title='Dépôts' about='Effectuez vos dépôts sur votre 1XBET ici' />

      <div className='user_deposit_container_001'>
        <form onSubmit={handleSubmit} className='deposit-form-container'>
          <label>1XBET ID</label>
          <div className='saved_id_container_outer'>
            <div
              style={{
                color: "rgba(256, 256, 256, 0.5)",
                width: "100%",
                display: "flex",
              }}
            >
              Enregistrez 2 identifiants 1XBET différents dans votre profil pour
              les afficher ici{" "}
            </div>
            <div className='saved_id_container'>
              {savedID.map((id, index) => (
                <div className='saved_id_container-inner' key={index}>
                  {id} <FaCircle color='white' />
                  <span
                    style={{
                      fontSize: "8px",
                      fontWeight: "light",
                      color: "rgba(256, 256, 256, 0.5)",
                    }}
                  ></span>
                </div>
              ))}
            </div>
          </div>
          <input
            type='text'
            className='deposit-form'
            placeholder="Entrez l'identifiant 1XBET"
          />
          <label>Amount</label>
          <input
            type='number'
            className='deposit-form'
            placeholder='Entrez le montant du dépôt'
          />
          <label>Network</label>
          <input
            type='text'
            className='deposit-form'
            placeholder='choisir le réseau'
          />
          <label className='laptop-version'>USSD CODE</label>
          <input
            type='number'
            className='deposit-form laptop-version'
            placeholder=''
          />
          <button
            type='submit'
            className='submit-button'
            style={{
              background: buttonDisabled
                ? "rgba(128, 128, 128, 0.2)"
                : "rgba(128, 128, 128, 1)",
              pointerEvents: buttonDisabled ? "none" : "auto",
            }}
          >
            {loading ? (
              <div id='container-signin'>
                <div id='html-spinner-signin'></div>
              </div>
            ) : (
              "Procéder"
            )}
          </button>
        </form>
      </div>
      <FooterMobile />
    </div>
  );
};

export default Deposit;
